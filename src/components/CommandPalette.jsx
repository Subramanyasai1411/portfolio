import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Terminal, 
  ExternalLink, 
  Layers, 
  Cpu, 
  BrainCircuit, 
  Mail, 
  FileDown, 
  Volume2, 
  Check, 
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { flagshipProjects, skillsHierarchy, personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

export default function CommandPalette({ isOpen, onClose, onSelectProject, onTriggerSimulator }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Build searchable items
  const actions = [
    {
      id: 'sim-whatif',
      category: 'Simulators',
      title: 'Launch What-If Scenario Copilot Simulator',
      desc: 'Interactive 4-tier router, price elasticity & Granger causality test',
      icon: Cpu,
      action: () => {
        onTriggerSimulator('whatif');
        onClose();
      }
    },
    {
      id: 'sim-rag',
      category: 'Simulators',
      title: 'Inspect Trilingual Document Exact RAG',
      desc: 'bge-m3 + BM25 RRF, Jina cross-encoder & numeral verification guard',
      icon: Layers,
      action: () => {
        onTriggerSimulator('rag');
        onClose();
      }
    },
    {
      id: 'sim-gan',
      category: 'Simulators',
      title: 'Inspect Sketch-to-Photo GAN Visualizer',
      desc: 'UNet generator + PatchGAN discriminator feature map slider',
      icon: Sparkles,
      action: () => {
        onTriggerSimulator('gan');
        onClose();
      }
    },
    {
      id: 'copy-email',
      category: 'Contact',
      title: `Copy Email (${personalInfo.email})`,
      desc: 'Direct copy with clipboard confirmation',
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(personalInfo.email);
        soundFx.playSuccess();
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          onClose();
        }, 1200);
      }
    },
    {
      id: 'download-resume',
      category: 'Document',
      title: 'Download Official Resume PDF',
      desc: 'Updated technical resume with full project specifications',
      icon: FileDown,
      action: () => {
        const link = document.createElement('a');
        link.href = './Subramanyasai_Resume_Updated.pdf';
        link.download = 'Subramanyasai_Gundamraju_Resume.pdf';
        link.click();
        soundFx.playSuccess();
        onClose();
      }
    },
    {
      id: 'open-github',
      category: 'Contact',
      title: 'Open GitHub Profile',
      desc: personalInfo.social.github.replace('https://', ''),
      icon: ExternalLink,
      action: () => {
        window.open(personalInfo.social.github, '_blank', 'noopener');
        onClose();
      }
    },
    {
      id: 'open-linkedin',
      category: 'Contact',
      title: 'Open LinkedIn Profile',
      desc: personalInfo.social.linkedin.replace('https://', ''),
      icon: ExternalLink,
      action: () => {
        window.open(personalInfo.social.linkedin, '_blank', 'noopener');
        onClose();
      }
    },
    {
      id: 'toggle-sound',
      category: 'Preferences',
      title: 'Toggle Audio FX Synthesizer',
      desc: 'Web Audio API feedback toggle',
      icon: Volume2,
      action: () => {
        soundFx.toggle();
        onClose();
      }
    }
  ];

  // Project navigation items
  const projectItems = flagshipProjects.map((p) => ({
    id: `project-${p.id}`,
    category: 'Flagship Systems',
    title: p.title,
    desc: p.subtitle,
    icon: Terminal,
    action: () => {
      onSelectProject(p);
      onClose();
    }
  }));

  const allItems = [...actions, ...projectItems];

  const filteredItems = allItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item) => {
    soundFx.playClick();
    item.action();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-void-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-void-900 border border-void-700/80 rounded-2xl shadow-2xl overflow-hidden glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-void-800 bg-void-950/60">
          <Search className="w-5 h-5 text-cyber-cyan mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, project, or skill (e.g. 'RAG', 'What-If', 'Resume')..."
            className="w-full bg-transparent text-sm font-mono text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-void-800 text-slate-400 rounded border border-void-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-void-800/40">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm font-mono text-slate-500">
              No matching systems or commands found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected ? 'bg-void-800/90 border border-cyber-cyan/30 text-white shadow-sm' : 'text-slate-300 hover:bg-void-850'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyber-cyan/20 text-cyber-cyan' : 'bg-void-800 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-medium truncate text-white">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-void-950 text-slate-400 border border-void-800">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-400 truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isSelected ? 'text-cyber-cyan translate-x-1' : 'opacity-0'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Terminal Footer Info */}
        <div className="px-4 py-2.5 bg-void-950 border-t border-void-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          {copied ? (
            <span className="text-cyber-emerald flex items-center gap-1 font-semibold">
              <Check className="w-3.5 h-3.5" /> Email copied to clipboard!
            </span>
          ) : (
            <span className="text-cyber-cyan/70">
              Ctrl / ⌘ K anytime
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
