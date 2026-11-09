import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Filter,
  Maximize2
} from 'lucide-react';
import { flagshipProjects } from '../../data/portfolioData';
import ProjectCard from './ProjectCard';
import AutoForecastSimulator from './AutoForecastSimulator';
import RagInspector from './RagInspector';
import SketchGanVisualizer from './SketchGanVisualizer';
import { soundFx } from '../../utils/audio';

export default function ProjectsSection({ onSelectProject, activeSimulator, setActiveSimulator, onOpenSimulator }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Time-Series & Econometrics',
    'LLM & RAG',
    'Deep Learning & Vision'
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? flagshipProjects 
    : flagshipProjects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-ember" />
              <span className="text-xs font-mono tracking-[0.18em] text-ember uppercase">
                Production Core
              </span>
            </div>
            <h2 className="text-3xl sm:text-[2.6rem] font-semibold text-white tracking-tight">
              Engineered AI Systems & Platforms
            </h2>
            <p className="text-sm font-sans text-slate-400 mt-2 max-w-xl">
              High-throughput architectures, multi-model time-series engines, and trilingual RAG pipelines built with verifiable evidence.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-void-900 border border-void-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedCategory === cat 
                    ? 'bg-ink-800 text-white border border-ink-700' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Flagship Interactive Simulators Anchor */}
        <div id="simulators" className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyber-cyan" />
              <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
                Live Interactive Architecture Simulators
              </span>
            </div>

            {/* Simulator Switcher Tabs */}
            <div className="flex items-center gap-2">
              {[
                { id: 'whatif', label: '1. What-If Scenario Copilot' },
                { id: 'rag', label: '2. Document Exact RAG' },
                { id: 'gan', label: '3. Sketch-to-Photo GAN' },
              ].map((sim) => (
                <button
                  key={sim.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveSimulator(sim.id);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                    activeSimulator === sim.id 
                      ? 'bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan font-semibold shadow-glow-cyan' 
                      : 'bg-void-900 border-void-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sim.label}
                </button>
              ))}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenSimulator(activeSimulator);
                }}
                className="px-3 py-1 rounded-lg text-xs font-mono border border-cyber-cyan/50 bg-void-900 text-cyber-cyan hover:bg-cyber-cyan hover:text-void-950 transition-all flex items-center gap-1.5"
                title="Open full-screen (Esc to close)"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Expand
              </button>
            </div>
          </div>

          {/* Render Active Simulator */}
          {activeSimulator === 'whatif' && <AutoForecastSimulator />}
          {activeSimulator === 'rag' && <RagInspector />}
          {activeSimulator === 'gan' && <SketchGanVisualizer />}
        </div>

        {/* Full Grid of Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              onTriggerSimulator={(simId) => onOpenSimulator(simId)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
