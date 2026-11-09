import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Copy, 
  Check, 
  Send, 
  Terminal, 
  FileDown, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Github,
  Linkedin
} from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [dispatchStatus, setDispatchStatus] = useState('idle'); // 'idle', 'dispatching', 'sent'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    soundFx.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDispatch = (e) => {
    e.preventDefault();
    if (!form.message) return;
    soundFx.playClick();
    setDispatchStatus('dispatching');

    setTimeout(() => {
      soundFx.playSuccess();
      setDispatchStatus('sent');
      // Create pre-filled mailto
      const mailtoUrl = `mailto:${personalInfo.email}?subject=Inquiry from ${encodeURIComponent(form.name || 'Hiring Manager')}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.email || 'Contact')}`;
      window.location.href = mailtoUrl;
    }, 900);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-px bg-ember" />
            <span className="text-xs font-mono tracking-[0.18em] text-ember uppercase">
              Contact
            </span>
          </div>
          <h2 className="text-3xl sm:text-[2.6rem] font-semibold text-white tracking-tight">
            Let's Build Production AI Systems
          </h2>
          <p className="text-sm font-sans text-slate-400 mt-2 max-w-xl">
            Open to senior AI/ML engineering roles, frontier LLM R&D, and quantitative time-series challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Connect Dock & Resume */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 1-Click Email Card */}
            <div className="p-6 rounded-2xl bg-void-900/80 border border-void-800 hover:border-cyber-cyan/40 transition-all glass-panel">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  Primary Email
                </span>
                <Mail className="w-4 h-4 text-cyber-cyan" />
              </div>
              <div className="font-mono text-base font-semibold text-white mb-4 break-all">
                {personalInfo.email}
              </div>
              <button
                onClick={handleCopyEmail}
                className="w-full py-2.5 px-4 rounded-xl bg-void-950 border border-void-800 hover:border-cyber-cyan/50 text-xs font-mono font-medium text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-cyber-emerald" />
                    <span className="text-cyber-emerald">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-cyber-cyan" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 gap-4">
              <div className="p-5 rounded-2xl bg-void-900/80 border border-void-800 glass-panel">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
                  <span>Location</span>
                  <MapPin className="w-3.5 h-3.5 text-cyber-cyan" />
                </div>
                <div className="text-sm font-mono font-semibold text-white">
                  {personalInfo.location}
                </div>
              </div>
            </div>

            {/* GitHub & LinkedIn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'GitHub', href: personalInfo.social.github, handle: `@${personalInfo.social.githubHandle}`, Icon: Github },
                { label: 'LinkedIn', href: personalInfo.social.linkedin, handle: personalInfo.social.linkedinHandle, Icon: Linkedin },
              ].map(({ label, href, handle, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="p-5 rounded-2xl bg-void-900/80 border border-void-800 hover:border-cyber-cyan/40 transition-all glass-panel block group"
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
                    <span>{label}</span>
                    <Icon className="w-3.5 h-3.5 text-cyber-cyan group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-sm font-mono font-semibold text-white group-hover:text-cyber-cyan transition-colors truncate flex items-center gap-1.5">
                    {handle}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </div>
                </a>
              ))}
            </div>

            {/* Official Resume Download Box */}
            <div className="p-6 rounded-2xl bg-ink-900 border border-cyber-cyan/30 glass-panel">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                  <FileDown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-mono">
                    Subramanyasai_Resume_Updated.pdf
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400">
                    Comprehensive technical specifications & metrics
                  </p>
                </div>
              </div>

              <a
                href="./Subramanyasai_Resume_Updated.pdf"
                download="Subramanyasai_Gundamraju_Resume.pdf"
                onClick={() => soundFx.playSuccess()}
                className="w-full py-2.5 rounded-xl bg-cyber-cyan hover:bg-cyber-cyan/90 text-void-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-glow-cyan"
              >
                <FileDown className="w-4 h-4" />
                Download Official Resume
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Terminal Message Console */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-void-900/95 border border-void-800 shadow-2xl p-6 sm:p-8 glass-panel scanline relative">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-void-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyber-cyan" />
                  <span className="text-white font-semibold">Send a message</span>
                </div>
                <span className="text-[10px] text-cyber-emerald flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Opens your email client
                </span>
              </div>

              <form onSubmit={handleDispatch} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Sarah Miller (VP of AI)"
                      className="w-full bg-void-950 border border-void-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyber-cyan transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. s.miller@frontier-ai.com"
                      className="w-full bg-void-950 border border-void-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyber-cyan transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe role, system architecture challenge, or project collaboration..."
                    required
                    className="w-full bg-void-950 border border-void-800 rounded-xl p-3.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyber-cyan transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={dispatchStatus === 'dispatching'}
                  className="w-full py-3 rounded-xl bg-ember hover:bg-ember-soft text-ink-950 font-mono font-bold text-xs uppercase tracking-wider hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {dispatchStatus === 'dispatching' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-void-950 border-t-transparent rounded-full animate-spin" />
                      <span>Opening your mail app…</span>
                    </>
                  ) : dispatchStatus === 'sent' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Draft ready in your mail app</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send message</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] font-mono text-slate-500 text-center">
                  Goes straight to sai.gundamraj14@gmail.com
                </p>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
