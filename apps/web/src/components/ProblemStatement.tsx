import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export const ProblemStatement = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="absolute top-4 right-4 w-[340px] z-10">
      <div className="glass-panel rounded-2xl overflow-hidden transition-all duration-300">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/30">
              <span className="text-brand-400 font-bold text-sm">01</span>
            </div>
            <div className="text-left">
              <h2 className="text-sm font-bold text-white leading-tight">URL Shortener</h2>
              <span className="text-[10px] uppercase tracking-widest text-green-400 font-bold">Easy Mode</span>
            </div>
          </div>
          {isOpen ? <ChevronUp size={18} className="text-zinc-400" /> : <ChevronDown size={18} className="text-zinc-400" />}
        </button>
        
        <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 border-t border-[var(--color-panel-border)]' : 'max-h-0 opacity-0'}`}>
          <div className="p-5 text-sm">
            <p className="text-zinc-400 mb-5 leading-relaxed">
              Design a system like bit.ly that takes a long URL and generates a short alias. Redirect users to the original link.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {['Generate short aliases', 'Redirect short links', 'Links expire after timespan', 'High availability crucial'].map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-400 text-xs">
                      <CheckCircle2 size={14} className="text-brand-500 mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Scale</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/5 rounded p-2 text-center border border-white/5">
                    <div className="text-lg font-black text-white">100M</div>
                    <div className="text-[9px] uppercase tracking-widest text-zinc-500">URLs/Day</div>
                  </div>
                  <div className="bg-white/5 rounded p-2 text-center border border-white/5">
                    <div className="text-lg font-black text-white">1B</div>
                    <div className="text-[9px] uppercase tracking-widest text-zinc-500">Visits/Day</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
