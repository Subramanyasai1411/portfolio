import React from 'react';
import { 
  Terminal, 
  ArrowUp, 
  Github, 
  Linkedin, 
  Mail, 
  Heart,
  Activity
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

export default function Footer() {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-void-850 bg-void-950 text-slate-400 font-mono text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-void-900">
          
          {/* Brand & Status */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-void-900 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan font-bold">
              SG
            </div>
            <div>
              <div className="text-white font-semibold">Subramanyasai Gundamraju</div>
              <div className="text-[11px] text-slate-500">
                AI/ML Engineer • Autonomous Systems & Multilingual RAG
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:sai.gundamraj14@gmail.com"
              onClick={() => soundFx.playClick()}
              className="p-2.5 rounded-xl bg-void-900 border border-void-800 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-2.5 rounded-xl bg-void-900 border border-void-800 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-2.5 rounded-xl bg-void-900 border border-void-800 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-void-900 border border-void-800 hover:border-cyber-cyan text-slate-300 hover:text-white transition-all group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyber-cyan group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>

        {/* Telemetry metadata footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald" />
            <span>Built with React, Tailwind & Framer Motion</span>
          </div>
          <div>
            © 2026 Subramanyasai Gundamraju. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
