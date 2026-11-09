import React from 'react';
import { Film, Sparkles, PenTool, FileText } from 'lucide-react';
import { creativeWork } from '../../data/portfolioData';

export default function CreativeNarrative() {
  return (
    <section id="storytelling" className="py-20 relative bg-void-950/40 border-t border-void-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-ink-900 border border-void-800 p-8 sm:p-12 overflow-hidden glass-panel">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-violet/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-void-950 border border-cyber-violet/30 text-cyber-violet text-xs font-mono font-semibold uppercase">
                <Film className="w-3.5 h-3.5" />
                Beyond Code • {creativeWork.title}
              </div>

              <h2 className="text-3xl sm:text-[2.6rem] font-semibold text-white tracking-tight leading-tight">
                Content Writer for <br />
                <span className="em-serif text-ember">
                  Film Analysis Scripts
                </span>
              </h2>

              <p className="text-sm sm:text-base font-sans text-slate-300 leading-relaxed">
                {creativeWork.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {creativeWork.pillars.map((pillar, i) => (
                  <div key={i} className="p-4 rounded-xl bg-void-950/90 border border-void-800 space-y-1.5">
                    <div className="text-xs font-mono font-bold text-cyber-cyan flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {pillar.title}
                    </div>
                    <p className="text-[11px] font-sans text-slate-400 leading-snug">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Card (no external channel link) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-void-950/90 border border-void-700/80 p-6 shadow-2xl glass-panel space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyber-violet/10 border border-cyber-violet/40 flex items-center justify-center text-cyber-violet">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">{creativeWork.role}</h4>
                    <p className="text-xs font-mono text-slate-400">
                      {creativeWork.channel} • {creativeWork.platform} film channel
                    </p>
                  </div>
                </div>

                <div className="space-y-2 font-mono text-[11px]">
                  {[
                    'Researched films and wrote analytical video scripts',
                    'Structured narratives around theme, pacing & character',
                    'Wrote for a general audience: clear, engaging, concise',
                  ].map((line) => (
                    <div key={line} className="flex items-start gap-2 p-2.5 rounded-lg bg-void-900 border border-void-800 text-slate-300">
                      <FileText className="w-3.5 h-3.5 text-cyber-cyan flex-shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] font-mono text-slate-500">
                  Contributor role. Channel owned and operated by a third party.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
