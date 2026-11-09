import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Search, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Sparkles,
  Terminal
} from 'lucide-react';
import { skillsHierarchy } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export default function SkillsSection() {
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  const domainKeys = ['All', ...Object.keys(skillsHierarchy)];

  return (
    <section id="skills" className="py-20 relative bg-void-950/60 border-t border-void-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-ember" />
              <span className="text-xs font-mono tracking-[0.18em] text-ember uppercase">
                Capability Matrix
              </span>
            </div>
            <h2 className="text-3xl sm:text-[2.6rem] font-semibold text-white tracking-tight">
              Technical Arsenal & Specialized Domains
            </h2>
            <p className="text-sm font-sans text-slate-400 mt-2 max-w-xl">
              From foundational language model pre-training to high-frequency econometric forecasting and production MLOps pipelines.
            </p>
          </div>

          {/* Search bar inside skills */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-cyber-cyan absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skill, model, or tool..."
              className="w-full bg-void-900 border border-void-800 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-colors"
            />
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {domainKeys.map((domain) => (
            <button
              key={domain}
              onClick={() => {
                soundFx.playClick();
                setSelectedDomain(domain);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedDomain === domain
                  ? 'bg-ink-800 text-white border border-ink-700'
                  : 'bg-void-900 border border-void-800 text-slate-400 hover:text-white'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsHierarchy).map(([domainName, data]) => {
            if (selectedDomain !== 'All' && selectedDomain !== domainName) return null;

            const filteredSkills = data.skills.filter(s => 
              s.name.toLowerCase().includes(search.toLowerCase()) ||
              s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
            );

            if (filteredSkills.length === 0) return null;

            return (
              <div
                key={domainName}
                className="p-6 rounded-2xl bg-void-900/80 border border-void-800 hover:border-cyber-violet/50 transition-all duration-300 glass-panel"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-void-800">
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    {domainName}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-cyber-violet" />
                </div>

                <div className="space-y-4">
                  {filteredSkills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-slate-200 font-medium">{skill.name}</span>
                        <span className="text-cyber-cyan font-bold">{skill.level}%</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-void-950 rounded-full overflow-hidden border border-void-800">
                        <div
                          className="h-full bg-ember rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      {/* Micro Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {skill.tags.map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-void-950 border border-void-800 text-slate-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
