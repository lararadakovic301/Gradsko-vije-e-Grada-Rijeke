import React, { useState } from 'react';
import { BookOpen, HelpCircle, FileText, CheckCircle, ArrowRight, ShieldAlert, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface SeminarUvodProps {
  onHighlightTerm: (term: string) => void;
  activeHighlight: string;
}

export default function SeminarUvod({ onHighlightTerm, activeHighlight }: SeminarUvodProps) {
  const [activeTab, setActiveTab] = useState<'uvod' | 'metodologija' | 'struktura' | 'zakljucak'>('uvod');

  const chapters = {
    uvod: {
      title: '1. Društveno-politički kontekst Rijeke',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
          <p>
            Grad Rijeka u suvremenoj povijesti Republike Hrvatske zauzima specifično mjesto kao izrazito stabilno biračko tijelo lijevog centra. 
            Od uvođenja višestranačkih demokratskih lokalnih izbora, poluge izvršne i većinske predstavničke vlasti tradicionalno drži 
            <span 
              onClick={() => onHighlightTerm('SDP')}
              className={`font-semibold cursor-pointer px-1 rounded transition-colors ${
                activeHighlight === 'SDP' ? 'bg-red-100 text-red-700 border border-red-200' : 'text-red-600 hover:bg-slate-100'
              }`}
            >
              Socijaldemokratska partija (SDP)
            </span> u savezu s regionalnim i socijalno usmjerenim strankama.
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl my-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Osnovna teza seminara</h4>
            <p className="text-xs text-slate-600 italic">
              "Fragmentacija lokalnog parlamenta i pojava nezavisnih aktera ne predstavlja nužno slabljenje institucije vladajuće većine, već potiče razvoj 'ad-hoc' ili projektne demokracije, gdje stabilnost ovisi o stalnom, dinamičkom re-evaluiranju programskih suradnji."
            </p>
          </div>
          <p>
            Međutim, razdoblje od 2024. do 2026. godine obilježeno je rastućom političkom fragmentacijom. Sjednice Gradskog vijeća postale su platforma za redefiniranje dugogodišnjih savezništava. Pojava novih, progresivno ekoloških opcija poput 
            <span 
              onClick={() => onHighlightTerm('Mozemo')}
              className={`font-semibold cursor-pointer px-1 rounded transition-colors ${
                activeHighlight === 'Mozemo' ? 'bg-green-100 text-green-700 border border-green-200' : 'text-green-600 hover:bg-slate-100'
              }`}
            >
              Možemo!
            </span> te rebrendiranje 
            <span 
              onClick={() => onHighlightTerm('Nezavisni')}
              className={`font-semibold cursor-pointer px-1 rounded transition-colors ${
                activeHighlight === 'Nezavisni' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'text-indigo-600 hover:bg-slate-100'
              }`}
            >
              Nezavisnih vijećnika
            </span> stvorili su situaciju u kojoj se donošenje važnih odluka, prvenstveno gradskog Proračuna, mora dogovarati kroz precizne, mjerljive programske korelacije.
          </p>
          <div className="border-l-4 border-amber-500 pl-4 bg-amber-50/50 py-2 pr-2 rounded-r-xl">
            <p className="text-xs text-amber-900 font-medium">
              <strong>Zanimljivost:</strong> Iako je gradonačelnik iz redova SDP-a, donošenje odluka u vijeću zahtijeva barem 16 ruku od ukupno 31 vijećnika, što znači da je koalicijska sinergija ključ opstanka vlasti.
            </p>
          </div>
        </div>
      )
    },
    metodologija: {
      title: '2. Mrežna teorija i Analiza Socijalnih Mreža (SNA)',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
          <p>
            Za potrebe ovog istraživanja lokalne samouprave u Rijeci, koristili smo **SNA metodu (Social Network Analysis)**. Mrežni grafovi nam omogućuju da tradicionalne, na papiru definirane, političke odnose pretvorimo u trodimenzionalni, dinamički model suodnosa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
            <div className="p-3 border border-slate-100 bg-white rounded-lg shadow-sm">
              <span className="font-semibold text-blue-600 block text-xs uppercase tracking-wider mb-1">1. Entiteti (Čvorovi / Nodes)</span>
              <p className="text-xs text-slate-500">
                Dijele se na tri korelativna sloja: Instituciju (Gradsko vijeće), Političke stranke (SDP, HDZ, PGS) i pojedinačne Vijećnike/Osobe.
              </p>
            </div>
            <div className="p-3 border border-slate-100 bg-white rounded-lg shadow-sm">
              <span className="font-semibold text-blue-600 block text-xs uppercase tracking-wider mb-1">2. Odnosi (Veze / Edges)</span>
              <p className="text-xs text-slate-500">
                Svaka veza posjeduje **faktor snage** (od 1 do 4). Članstvo je standardne snage 2, dok se programska koalicija označava jačinom 4 (debeli, uočljivi spojevi).
              </p>
            </div>
          </div>
          <p>
            Kroz analizu gustoće mreže (density) možemo uočiti razinu "prohodnosti" pojedinih zakonskih rješenja. Političke grupacije s većim brojem veza imaju veću ulogu posrednika (betweenness centrality), što im daje veću pregovaračku moć pri kreiranju politika u gradu Rijeci.
          </p>
        </div>
      )
    },
    struktura: {
      title: '3. Struktura savezništva i oporbenog djelovanja',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
          <p>
            Analizirajući političke korelacije u Gradskom vijeću, jasno se izdvajaju tri temeljna bloka moći:
          </p>
          <ul className="space-y-3 pl-2">
            <li className="flex gap-2 items-start">
              <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Vladajući sporazum (Vladajući blok):</strong>
                <p className="text-xs text-slate-500">
                  Konsolidiran vezom između <span onClick={() => onHighlightTerm('SDP')} className="underline cursor-pointer text-red-600">SDP-a</span>, <span onClick={() => onHighlightTerm('PGS')} className="underline cursor-pointer text-amber-600">PGS-a</span> i <span onClick={() => onHighlightTerm('HSU')} className="underline cursor-pointer text-indigo-600">HSU-a</span>. Oni tvore stabilnu ideološku osovinu koja se redovito nadopunjuje glasovima progresivnih stranaka ili određenih nezavisnih aktera.
                </p>
              </div>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Konzervativno-desna oporba:</strong>
                <p className="text-xs text-slate-500">
                  Formirana oko čvorova <span onClick={() => onHighlightTerm('HDZ')} className="underline cursor-pointer text-blue-600">HDZ</span> i <span onClick={() => onHighlightTerm('Most')} className="underline cursor-pointer text-orange-600">Most</span>. Ova suradnja se najčešće očituje u zajedničkim oporbenim glasovanjima o proračunu i amandmanima usmjerenim na kritiku aktualnog gradskog rukovodstva.
                </p>
              </div>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Nezavisne i regionalne platforme (Balanceri):</strong>
                <p className="text-xs text-slate-500">
                  Klubovi poput <span onClick={() => onHighlightTerm('AM')} className="underline cursor-pointer text-violet-600">Akcije mladih</span>, Unije Kvarnera, Centra i Nezavisnih sudjeluju u dinamičkim pregovorima od projekta do projekta, donoseći ključnu ravnotežu snaga.
                </p>
              </div>
            </li>
          </ul>
        </div>
      )
    },
    zakljucak: {
      title: '4. Zaključci i političke implikacije',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
          <p>
            Mrežna analiza pokazuje da Gradsko vijeće Rijeke nije cementirana struktura, nego visokofluidna mreža savezništava. Niti jedna stranka u ovom trenutku nema apsolutnu dominaciju bez otvaranja kanala dijaloga sa širim spektrom opcija.
          </p>
          <div className="p-3 bg-red-50 text-red-800 border border-red-100 rounded-xl flex gap-3 my-2">
            <ShieldAlert className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-xs">Politički rizik fragmentacije</span>
              <p className="text-[11px] opacity-90 leading-normal">
                Visok broj nezavisnih članova i "ad-hoc" suradnji donosi fleksibilnost, ali istovremeno nosi rizik nestabilnosti pri dugoročnom donošenju razvojnih odluka koje zahtijevaju višegodišnji politički konsenzus.
              </p>
            </div>
          </div>
          <p>
            U zaključku, ova mrežna vizualizacija i akademska analiza prikazuju transformacijske trendove u riječkom lokalnom predstavničkom tijelu, naglašavajući da se suvremeno političko pregovaranje odvija u mrežnim, a ne isključivo bilateralnim, obrisima.
          </p>
        </div>
      )
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-slate-200">
      {/* Seminar Header bar */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Akademski rad / Seminar</span>
        </div>
        <h2 className="text-base font-bold text-slate-800 leading-snug">
          Politička dinamika lokalne samouprave: Analiza Gradskog vijeća Rijeke
        </h2>
        <span className="text-[10px] font-mono text-slate-400 block mt-1 uppercase tracking-tight">Kolegij: Institucije lokalne uprave 2024-2026</span>
      </div>

      {/* Chapters Navigation Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50/20 text-xs text-slate-500 overflow-x-auto shrink-0 scrollbar-none">
        {(Object.keys(chapters) as Array<keyof typeof chapters>).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-3 px-4 border-b-2 font-bold uppercase text-[10px] tracking-wider shrink-0 transition-all ${
              activeTab === key
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Chapter Contents Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 font-mono">
            {chapters[activeTab].title}
          </h3>
          {chapters[activeTab].content}
        </motion.div>
      </div>

      {/* Seminar Interactivity Footer Guide */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-blue-500" />
          <span>Klikom na podcrtane stranke filtrirate mrežni graf</span>
        </div>
        {activeHighlight && (
          <button 
            onClick={() => onHighlightTerm('')}
            className="text-red-500 font-bold hover:underline"
          >
            Resetiraj prikaz
          </button>
        )}
      </div>
    </div>
  );
}
