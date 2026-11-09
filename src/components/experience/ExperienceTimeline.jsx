import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { careerTimeline } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-px bg-ember" />
            <span className="text-xs font-mono tracking-[0.18em] text-ember uppercase">
              Trajectory & Pedigree
            </span>
          </div>
          <h2 className="text-3xl sm:text-[2.6rem] font-semibold text-white tracking-tight">
            Engineering Experience & Research
          </h2>
          <p className="text-sm font-sans text-slate-400 mt-2 max-w-xl">
            Track record of shipping production ML systems, advancing academic computer vision research, and distinguished scholarship.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-void-800 ml-4 md:ml-6 space-y-12">
          {careerTimeline.map((item, index) => {
            const isEducation = item.role.includes('B.Tech');
            const Icon = isEducation ? GraduationCap : Briefcase;

            return (
              <div 
                key={index} 
                className="relative pl-8 md:pl-10 group"
                onMouseEnter={() => soundFx.playClick()}
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-xl bg-void-950 border-2 border-void-700 group-hover:border-cyber-cyan flex items-center justify-center text-slate-400 group-hover:text-cyber-cyan group-hover:shadow-glow-cyan transition-all">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Card Container */}
                <div className="p-6 rounded-2xl bg-void-900/80 border border-void-800 hover:border-cyber-cyan/40 transition-all duration-300 glass-panel">
                  
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-void-950 text-cyber-cyan border border-cyber-cyan/30 font-semibold uppercase">
                        {item.type}
                      </span>
                      <span className="text-xs font-mono text-slate-400 font-semibold">
                        {item.company}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyber-cyan/70" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Role Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-cyber-cyan transition-colors">
                    {item.role}
                  </h3>

                  {/* Highlight pill */}
                  <div className="mb-4 p-2.5 rounded-lg bg-void-950/90 border border-void-800 text-xs font-mono text-cyber-emerald flex items-center gap-2">
                    <Award className="w-4 h-4 flex-shrink-0" />
                    <span>{item.highlight}</span>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2">
                    {item.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-slate-300 leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-cyber-cyan flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
