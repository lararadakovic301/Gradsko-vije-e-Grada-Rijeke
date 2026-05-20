import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GraphData, Node, Link } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Info, X } from 'lucide-react';

interface Props {
  data: GraphData;
}

// Extend D3's types for our simulation
interface SimNode extends Node, d3.SimulationNodeDatum {}
interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  label: string;
  strength?: number;
}

const NetworkGraph: React.FC<Props> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Deep copy data to avoid mutation issues during simulation
    const nodes: SimNode[] = data.nodes.map(d => ({ ...d }));
    const links: SimLink[] = data.links.map(d => ({ 
      source: d.source, 
      target: d.target, 
      label: d.label,
      strength: d.strength 
    }));

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g");

    // Zoom setup
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const simulation = d3.forceSimulation<SimNode>(nodes)
      .force("link", d3.forceLink<SimNode, SimLink>(links)
        .id(d => d.id)
        .distance(link => {
           const sId = typeof link.source === 'string' ? link.source : (link.source as any).id;
           const tId = typeof link.target === 'string' ? link.target : (link.target as any).id;
           if (sId === 'GV' || tId === 'GV') return 220;
           return 120;
        })
      )
      .force("charge", d3.forceManyBody().strength(-800))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1));

    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", d => {
        const lbl = (d as any).label;
        if (lbl === 'vijećnik' || lbl === 'vijećnica') return "#e2e8f0";
        if ((d as any).strength >= 4) return "#2563eb"; // Strong blue for coalitions
        return "#3b82f6";
      })
      .attr("stroke-opacity", d => {
        const strength = (d as any).strength || 1;
        return 0.2 + (strength * 0.15);
      })
      .attr("stroke-width", d => {
        const strength = (d as any).strength || 1;
        return strength * 0.75;
      })
      .style("stroke-dasharray", d => {
        const lbl = (d as any).label;
        if (lbl === 'koalicija' || lbl === 'povezani' || lbl === 'suradnja') return "4,4";
        return "0";
      });

    const edgeLabels = g.append("g")
      .selectAll("text")
      .data(links)
      .join("text")
      .attr("font-size", 7)
      .attr("fill", "#94a3b8")
      .attr("text-anchor", "middle")
      .attr("class", "font-sans font-bold uppercase tracking-tighter")
      .text(d => d.label);

    const node = g.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .style("cursor", "pointer")
      .attr("class", "node-group")
      .on("mouseenter", (event, d) => {
        const connectedNodes = new Set();
        connectedNodes.add(d.id);
        
        links.forEach(l => {
          if ((l.source as any).id === d.id) connectedNodes.add((l.target as any).id);
          if ((l.target as any).id === d.id) connectedNodes.add((l.source as any).id);
        });

        node.transition().duration(200)
          .style("opacity", n => connectedNodes.has(n.id) ? 1 : 0.15);
        
        link.transition().duration(200)
          .style("opacity", l => (l.source as any).id === d.id || (l.target as any).id === d.id ? 1 : 0.05)
          .attr("stroke-width", l => ((l.source as any).id === d.id || (l.target as any).id === d.id) ? ((l as any).strength || 1) * 2 : (l as any).strength || 1);
      })
      .on("mouseleave", () => {
        node.transition().duration(200).style("opacity", 1);
        link.transition().duration(200)
          .style("opacity", l => {
            const strength = (l as any).strength || 1;
            return 0.2 + (strength * 0.15);
          })
          .attr("stroke-width", l => ((l as any).strength || 1) * 0.75);
      })
      .on("click", (_event, d) => {
        setSelectedNode(d);
        d3.select(_event.currentTarget).select("circle")
          .transition().duration(200)
          .attr("r", r => Number(r) * 1.5)
          .transition().duration(200)
          .attr("r", r => Number(r) / 1.5);
      })
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    const getColor = (type: string) => {
      switch (type) {
        case 'Institution': return '#2563eb'; // blue-600
        case 'Bloc': return '#d97706'; // amber-600
        case 'Party': return '#dc2626'; // red-600
        case 'Person': return '#334155'; // slate-700
        case 'Project': return '#059669'; // emerald-600
        default: return '#64748b';
      }
    };

    node.append("circle")
      .attr("r", d => {
        if ((d as any).id === 'GV') return 40;
        return ((d as any).val || 10) + 8;
      })
      .attr("fill", d => (d as any).id === 'GV' ? "white" : getColor((d as any).type))
      .attr("stroke", d => (d as any).id === 'GV' ? "#2563eb" : "white")
      .attr("stroke-width", d => (d as any).id === 'GV' ? 4 : 2)
      .attr("class", "node-circle shadow-sm");

    node.append("text")
      .attr("dy", d => {
        if ((d as any).id === 'GV') return 5;
        return ((d as any).val || 10) + 24;
      })
      .attr("text-anchor", "middle")
      .attr("font-size", d => (d as any).id === 'GV' ? 10 : 9)
      .attr("font-weight", "bold")
      .attr("fill", d => (d as any).id === 'GV' ? "#1e293b" : "#475569")
      .attr("class", "font-display uppercase tracking-tight")
      .text(d => (d as any).name)
      .each(function(d) {
        if ((d as any).id === 'GV') {
           d3.select(this).style("font-weight", 900);
        }
      })
      .clone(true).lower()
      .attr("fill", "none")
      .attr("stroke", "#f8fafc")
      .attr("stroke-width", 4);

    // Force "GV" to stay in center and update positions
    simulation.on("tick", () => {
      nodes.forEach(node => {
        if (node.id === 'GV') {
          node.x = width / 2;
          node.y = height / 2;
        }
      });

      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      node
        .attr("transform", d => `translate(${(d as any).x},${(d as any).y})`);
      
      edgeLabels
         .attr("x", d => ((d.source as any).x + (d.target as any).x) / 2)
         .attr("y", d => ((d.source as any).y + (d.target as any).y) / 2);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      if (event.subject.id !== 'GV') {
        event.subject.fx = null;
        event.subject.fy = null;
      }
    }

    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden bg-slate-50/90 bg-cover bg-center"
      style={{ backgroundImage: "url('/council_bg.png')", backgroundBlendMode: "overlay" }}
    >
      <svg ref={svgRef} className="w-full h-full relative z-10" />
      
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="absolute top-0 right-0 w-80 h-full bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] border-l border-slate-200 z-50 flex flex-col"
          >
            <div className="p-8 overflow-y-auto flex-1">
              <div className="flex justify-between items-start mb-10">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-slate-800" />
                </div>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors border border-transparent hover:border-slate-100"
                  id="close-details-btn"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="mb-8">
                <span className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-100/50">
                  {selectedNode.type}
                </span>
                <h2 className="text-2xl font-black text-slate-900 leading-tight font-display tracking-tight uppercase">{selectedNode.name}</h2>
              </div>

              <div className="space-y-6 text-slate-500 text-xs leading-relaxed font-medium">
                <p>
                  Registar odnosa prikazuje povezanost entiteta unutar gradskog vijeća. 
                  Ovdje možete vidjeti kako se političke stranke i vijećnici pozicioniraju prema ključnim temama.
                </p>
              </div>

              <div className="mt-12">
                <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-6 border-b border-slate-100 pb-3">Povezane Interakcije</h4>
                <div className="space-y-4">
                  {data.links
                    .filter(l => l.source === selectedNode.id || l.target === selectedNode.id)
                    .map((l, i) => {
                      const isSource = l.source === selectedNode.id;
                      const otherId = isSource ? l.target : l.source;
                      const otherNode = data.nodes.find(n => n.id === otherId);
                      return (
                        <div key={i} className="flex flex-col gap-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-colors">
                          <span className="text-[9px] uppercase font-black text-blue-500 tracking-wider flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-blue-500"></span> {l.label}
                          </span>
                          <span className="text-sm font-bold text-slate-800 ">{otherNode?.name}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            
            <div className="p-8 pt-0 mt-auto">
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black tracking-widest uppercase shadow-xl shadow-slate-200 hover:scale-[1.02] transition-transform active:scale-95">
                Vidi kompletan profil
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 text-[10px] text-slate-400 max-w-[200px]">
        * Podaci su temeljeni na javno dostupnim informacijama i primjeru političkih odnosa.
        Povucite čvorove ili zumirajte za bolji pregled.
      </div>
    </div>
  );
};

export default NetworkGraph;
