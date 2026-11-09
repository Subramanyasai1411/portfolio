import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Search, 
  Volume2, 
  VolumeX, 
  FileDown, 
  Cpu, 
  Layers, 
  BrainCircuit, 
  Send,
  Menu,
  X
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Navbar({ onOpenCommandPalette }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = soundFx.toggle();
    setSoundEnabled(newState);
  };

  const navLinks = [
    { label: "Work", href: "#projects", icon: Layers },
    { label: "Simulators", href: "#simulators", icon: Cpu },
    { label: "Skills", href: "#skills", icon: BrainCircuit },
    { label: "Experience", href: "#experience", icon: Terminal },
    { label: "Writing", href: "#storytelling", icon: Terminal },
    { label: "Contact", href: "#contact", icon: Send },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3 bg-ink-950/85 backdrop-blur-xl border-b border-ink-800' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand */}
          <a 
            href="#" 
            onClick={() => soundFx.playClick()}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-ink-850 border border-ink-700 flex items-center justify-center group-hover:border-ember/50 transition-colors">
              <span className="em-serif text-ember text-xl leading-none -mt-0.5">sg</span>
            </div>
            <div className="leading-tight">
              <div className="font-display font-semibold text-[15px] text-white">Subramanyasai Gundamraju</div>
              <div className="text-xs text-slate-500">AI/ML Engineer</div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => soundFx.playClick()}
                className="px-3 py-1.5 text-sm text-slate-400 hover:text-white rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Controls & Command Palette Trigger */}
          <div className="flex items-center gap-2.5">
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenCommandPalette();
              }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-void-900/80 border border-void-700/80 text-xs font-mono text-slate-300 hover:border-cyber-cyan/50 hover:text-white transition-all shadow-sm group"
              title="Quick Search & Commands (Ctrl+K or Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyber-cyan group-hover:scale-110 transition-transform" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-void-800 text-slate-400 rounded border border-void-700 group-hover:text-cyber-cyan">
                ⌘K
              </kbd>
            </button>

            {/* Audio Feedback Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-lg border transition-all ${
                soundEnabled 
                  ? 'bg-cyber-cyan/10 border-cyber-cyan/40 text-cyber-cyan shadow-glow-cyan' 
                  : 'bg-void-900/80 border-void-800 text-slate-400 hover:text-slate-200'
              }`}
              title={soundEnabled ? "Audio FX Enabled (Click to Mute)" : "Audio FX Muted (Click to Enable)"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Resume Button */}
            <a
              href="./Subramanyasai_Resume_Updated.pdf"
              download="Subramanyasai_Gundamraju_Resume.pdf"
              onClick={() => soundFx.playSuccess()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-ember/10 border border-cyber-cyan/40 hover:border-cyber-cyan text-xs font-mono font-medium text-cyber-cyan hover:shadow-glow-cyan transition-all"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resume</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-lg bg-void-900 border border-void-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-void-900/95 border border-void-800 backdrop-blur-2xl shadow-2xl space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-void-850 border border-void-700 text-xs font-mono text-slate-300"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-cyber-cyan" />
                Quick Search & Commands
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-void-800 rounded">⌘K</kbd>
            </button>
            <div className="h-px bg-void-800 my-2" />
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-cyber-cyan rounded-lg hover:bg-white/5 transition-colors font-mono"
              >
                <link.icon className="w-4 h-4 text-cyber-cyan/70" />
                {link.label}
              </a>
            ))}
          </div>
        )}

      </div>
    </header>
  );
}
