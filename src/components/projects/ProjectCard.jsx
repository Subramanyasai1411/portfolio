import React from 'react';
import { 
  Terminal, 
  Layers, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Activity 
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function ProjectCard({ project, onSelect, onTriggerSimulator }) {
  const hasSimulator = ['auto-forecast', 'document-exact-rag', 'face-sketch-gan'].includes(project.id);

  const getSimulatorId = () => {
    if (project.id === 'auto-forecast') return 'whatif';
    if (project.id === 'document-exact-rag') return 'rag';
    if (project.id === 'face-sketch-gan') return 'gan';
    return null;
  };

  return (
    <div 
      onMouseEnter={() => soundFx.playClick()}
      className="group relative rounded-2xl bg-void-900/80 border border-void-800 hover:border-cyber-cyan/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl glass-panel-hover"
    >
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-void-950 text-cyber-cyan border border-cyber-cyan/30 uppercase font-semibold">
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            {project.period}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-cyber-cyan transition-colors mb-2 tracking-tight">
          {project.title}
        </h3>

        <p className="text-xs font-sans text-slate-300 leading-relaxed mb-4">
          {project.subtitle}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {project.stats.slice(0, 4).map((stat, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-void-950 border border-void-850 font-mono">
              <div className="text-[9px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
              <div className="text-xs sm:text-sm font-bold text-white group-hover:text-cyber-cyan transition-colors truncate">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.slice(0, 5).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-void-950/80 border border-void-800 text-slate-400">
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500">
              +{project.tech.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-void-800 flex items-center justify-between gap-2">
        <button
          onClick={() => {
            soundFx.playClick();
            onSelect(project);
          }}
          className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors group/btn"
        >
          <span>Architecture Spec</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-cyber-cyan" />
        </button>

        {hasSimulator && (
          <button
            onClick={() => {
              soundFx.playClick();
              onTriggerSimulator(getSimulatorId());
            }}
            className="px-3 py-1.5 rounded-lg bg-cyber-cyan/15 hover:bg-cyber-cyan border border-cyber-cyan/40 hover:border-cyber-cyan text-cyber-cyan hover:text-void-950 font-mono text-[11px] font-bold tracking-wider uppercase transition-all shadow-sm"
          >
            Live Simulator
          </button>
        )}
      </div>

    </div>
  );
}
