import React, { useState } from 'react';
import NetworkGraph from './components/NetworkGraph';
import { RIJEKA_GRAPH_DATA } from './data';
import { motion } from 'motion/react';
import { Users, LayoutGrid, Search, Filter } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = {
    nodes: RIJEKA_GRAPH_DATA.nodes.filter(n => 
      n.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    links: RIJEKA_GRAPH_DATA.links.filter(l => {
      const sourceId = typeof l.source === 'string' ? l.source : (l.source as any).id;
      const targetId = typeof l.target === 'string' ? l.target : (l.target as any).id;
      
      const sourceNode = RIJEKA_GRAPH_DATA.nodes.find(n => n.id === sourceId);
      const targetNode = RIJEKA_GRAPH_DATA.nodes.find(n => n.id === targetId);
      
      return (
        sourceNode?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        targetNode?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  };

  return (
    <div className="w-full h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden flex flex-col relative">
      {/* Header Section */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm shadow-sm">GV</div>
          <h1 className="text-xl font-semibold tracking-tight font-display uppercase">
            Gradsko vijeće <span className="text-slate-400 font-normal">| Rijeka</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Pretraži vijećnike..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-1.5 bg-slate-100 rounded-full text-xs border-none focus:ring-2 focus:ring-blue-500/20 w-48 transition-all hover:bg-slate-200"
              id="search-input"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100/50">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span> 31 Vijećnik
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Info */}
        <aside className="w-80 bg-white border-r border-slate-200 p-6 flex flex-col gap-8 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] overflow-y-auto">
          <section>
            <h3 className="text-[11px] uppercase tracking-wider text-slate-400 font-black mb-5">Stranke i vijećnici</h3>
            <div className="space-y-6">
              {[
                { id: 'SDP', name: 'SDP', count: 3, color: 'bg-red-500' },
                { id: 'HDZ', name: 'HDZ', count: 4, color: 'bg-blue-700' },
                { id: 'Mozemo', name: 'Možemo!', count: 3, color: 'bg-green-500' },
                { id: 'PGS', name: 'PGS', count: 2, color: 'bg-amber-500' },
                { id: 'AM', name: 'Akcija mladih', count: 2, color: 'bg-violet-500' },
                { id: 'Most', name: 'Most', count: 1, color: 'bg-orange-500' },
                { id: 'Nezavisni', name: 'Nezavisni', count: 6, color: 'bg-slate-400' },
              ].map(p => (
                <div key={p.id} className="group cursor-default">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs flex items-center gap-2 text-slate-800 font-black uppercase tracking-tight">
                      <span className={`w-2 h-2 ${p.color} rounded-full`}></span> {p.name}
                    </span>
                  </div>
                  <div className="space-y-1 ml-4 border-l border-slate-100 pl-4">
                    {RIJEKA_GRAPH_DATA.links
                      .filter(l => l.target === p.id && (l.label === 'vijećnik' || l.label === 'vijećnica'))
                      .map(l => {
                        const personNode = RIJEKA_GRAPH_DATA.nodes.find(n => n.id === l.source);
                        return (
                          <div key={l.source} className="text-[11px] text-slate-500 hover:text-blue-600 transition-colors cursor-pointer">
                            {personNode?.name}
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-8 border-t border-slate-100">
            <h3 className="text-[11px] uppercase tracking-wider text-slate-400 font-black mb-5">Tipovi povezanosti</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-0.5">
                   <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
                   <div className="w-8 h-1 bg-blue-600 rounded-full opacity-30"></div>
                </div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">Koalicija (Čvrsto)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-blue-400 rounded-full border-t border-dashed"></div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">Suradnja (Trend)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-slate-200 rounded-full"></div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">Članovi / Vijećnici</span>
              </div>
            </div>
          </section>

          <section className="mt-auto">
            <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 blur-3xl -mr-12 -mt-12"></div>
              <p className="text-[11px] font-medium opacity-70 leading-relaxed mb-4 relative z-10">
                Povezanost i korelacije u gradskom vijeću Rijeka na temelju aktualnog sastava.
              </p>
            </div>
          </section>
        </aside>

        {/* Network Visualization Area */}
        <main className="flex-1 relative bg-[#f8fafc]">
          <NetworkGraph data={searchTerm ? filteredData : RIJEKA_GRAPH_DATA} />
          
          {/* Legend Overlay from Design */}
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md border border-slate-200 p-5 rounded-2xl shadow-2xl max-w-xs pointer-events-none">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analitika odnosa</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal font-medium">
              Veličina čvora predstavlja utjecaj (vijećnici). Isprekidane linije označavaju trendove suradnje na temelju zajedničkih inicijativa.
            </p>
          </div>
        </main>
      </div>

      {/* Footer / Status Bar */}
      <footer className="h-8 bg-slate-900 text-white flex items-center px-8 text-[9px] justify-between z-20 shrink-0 uppercase tracking-[0.2em] font-bold">
        <div className="flex gap-8 opacity-60">
          <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-green-400"></span> Sustav: v4.2.0-RI</span>
          <span>Zadnja sjednica: 28.04.2024</span>
        </div>
        <div className="opacity-60">Izvor: rijeka.hr / Registar Vijećnika Rijeka</div>
      </footer>
    </div>
  );
}
