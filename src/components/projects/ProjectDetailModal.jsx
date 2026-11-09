import React from 'react';
import { 
  X, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Code2, 
  Activity,
  Zap,
  Terminal,
  Github
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-void-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="w-full max-w-4xl max-h-[90vh] bg-void-900 border border-cyber-cyan/40 rounded-2xl shadow-2xl glass-panel overflow-y-auto relative animate-fade-in text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-10 bg-void-900/95 backdrop-blur-md border-b border-void-800 p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30 font-semibold uppercase">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {project.company} • {project.period}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-void-800 text-slate-400 hover:text-white hover:bg-void-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Subtitle & Core Value */}
          <div className="p-4 rounded-xl bg-void-950 border border-void-800">
            <p className="text-sm font-sans text-slate-300 leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.stats.map((stat, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-void-950 border border-void-800 text-center font-mono">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="text-base sm:text-lg font-bold text-cyber-cyan">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture & Pipeline Breakdown if present */}
          {project.architecture && (
            <div className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-cyber-cyan font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Architectural Breakdown & Execution Ladder
              </h3>

              {project.architecture.stages && (
                <div className="p-4 rounded-xl bg-void-950 border border-void-800 space-y-2">
                  <div className="text-xs font-mono text-slate-400 mb-2 font-medium">
                    9-Stage Autonomous Pipeline Lifecycle:
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {project.architecture.stages.map((stage, i) => (
                      <div key={i} className="p-2 rounded-lg bg-void-900 border border-void-850 text-[11px] font-mono text-slate-300">
                        {stage}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.architecture.whatIfEngine && (
                <div className="p-4 rounded-xl bg-void-950 border border-void-800 space-y-3 font-mono text-xs">
                  <div className="text-cyber-violet font-semibold text-xs uppercase">
                    What-If Causal Engine Specifications:
                  </div>
                  <div className="space-y-2 text-[11px] text-slate-300">
                    <p><strong className="text-white">Driver Router:</strong> {project.architecture.whatIfEngine.driverRouter}</p>
                    <p><strong className="text-white">Goal-Seek Inversion:</strong> {project.architecture.whatIfEngine.goalSeek}</p>
                    <p><strong className="text-white">Contribution Cube:</strong> {project.architecture.whatIfEngine.structuralWhatIf}</p>
                    <p><strong className="text-cyber-emerald">Deterministic Guardrail:</strong> {project.architecture.whatIfEngine.guardrails}</p>
                  </div>
                </div>
              )}

              {project.architecture.ingestion && (
                <div className="p-4 rounded-xl bg-void-950 border border-void-800 space-y-2 font-mono text-xs text-slate-300">
                  <p><strong className="text-white">Ingestion & OCR:</strong> {project.architecture.ingestion}</p>
                  <p><strong className="text-white">Hybrid Retrieval:</strong> {project.architecture.retrieval}</p>
                  <p><strong className="text-white">Reranking Acceleration:</strong> {project.architecture.reranking}</p>
                  <p><strong className="text-cyber-emerald">Answer Guardrail:</strong> {project.architecture.guardrails}</p>
                </div>
              )}
            </div>
          )}

          {/* Deep Engineering Highlights */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-cyber-blue font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Engineering Highlights & Impact
            </h3>
            <ul className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-void-950/70 border border-void-850 text-xs sm:text-sm font-sans text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan mt-2 flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Chips */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Technology Stack & Frameworks
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono bg-void-950 border border-void-800 text-slate-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-void-900/95 backdrop-blur-md border-t border-void-800 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-3.5 py-1.5 rounded-lg border border-ink-700 bg-ink-850 hover:border-ember text-white text-xs font-mono flex items-center gap-2 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-ember" />
                <span>View Code Repository</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            ) : (
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-600" />
                <span>Repository: {project.repoStatus || 'Source available on request'}</span>
              </span>
            )}
            <span className="text-xs font-mono text-slate-600 hidden sm:inline">•</span>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              Esc to close
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-cyber-cyan text-void-950 font-mono font-bold text-xs uppercase hover:shadow-glow-cyan transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
