import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Eye, 
  Sliders, 
  Cpu, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

// Pixel : contextual weightings compared in the training notebooks
const LOSS_MIXES = [
  { px: 1, cx: 0, note: 'Pixel loss only (baseline)' },
  { px: 0.8, cx: 0.2, note: 'Mostly pixel, light contextual' },
  { px: 0.5, cx: 0.5, note: 'Balanced' },
  { px: 0.2, cx: 0.8, note: 'Mostly contextual (default in training notebook)' },
];

export default function SketchGanVisualizer() {
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100
  const [viewMode, setViewMode] = useState('split'); // 'split', 'sketch', 'photo', 'heatmap'
  const [mix, setMix] = useState(3); // index into LOSS_MIXES

  return (
    <div className="rounded-2xl bg-void-900/90 border border-cyber-cyan/30 p-5 sm:p-7 shadow-2xl glass-panel relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-void-800 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-violet/20 text-cyber-violet border border-cyber-violet/30 font-semibold uppercase tracking-wider">
              Research & Vision Synthesis
            </span>
            <span className="text-xs font-mono text-slate-400">
              Centre for AI and ML, Osmania University
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Face Sketch-to-Photo Synthesis (Conditional UNet GAN)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Architecture:</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-void-800 text-cyber-violet border border-cyber-violet/30 font-semibold">
            UNet + PatchGAN · Keras
          </span>
        </div>
      </div>

      {/* Controls & Mode Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-1.5 bg-void-950 p-1 rounded-xl border border-void-800">
          {[
            { id: 'split', label: 'Interactive Split Slider' },
            { id: 'sketch', label: 'Forensic Sketch' },
            { id: 'photo', label: 'Synthesized Photo' },
            { id: 'heatmap', label: 'PatchGAN Score Map' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                soundFx.playClick();
                setViewMode(mode.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === mode.id 
                  ? 'bg-cyber-violet/20 border border-cyber-violet/50 text-white font-semibold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-mono text-slate-400">
          Skip Connections + Instance Norm
        </span>
      </div>

      {/* Visual Canvas Comparison Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Interactive Image Split Viewport */}
        <div className="lg:col-span-7 bg-void-950 rounded-2xl p-4 border border-void-800 relative select-none">
          
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-void-700 bg-void-900 shadow-2xl">
            
            {/* Layer 1: Forensic Sketch (Left Side) */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#0A0F22] p-6">
              {/* Synthetic SVG representing forensic sketch face */}
              <svg viewBox="0 0 300 300" className="w-full h-full stroke-slate-300 fill-none stroke-[2]">
                <ellipse cx="150" cy="150" rx="90" ry="120" strokeDasharray="3 2" />
                <path d="M 80 130 Q 110 115 135 125" />
                <path d="M 165 125 Q 190 115 220 130" />
                {/* Eyes */}
                <ellipse cx="110" cy="140" rx="14" ry="7" />
                <ellipse cx="190" cy="140" rx="14" ry="7" />
                <circle cx="110" cy="140" r="3" fill="#A9B4D6" />
                <circle cx="190" cy="140" r="3" fill="#A9B4D6" />
                {/* Nose */}
                <path d="M 150 135 L 146 175 L 158 178" />
                {/* Lips */}
                <path d="M 125 210 Q 150 202 175 210" />
                <path d="M 125 210 Q 150 220 175 210" />
                {/* Contours */}
                <path d="M 100 80 Q 150 60 200 80" strokeDasharray="2 4" />
                <text x="20" y="35" fill="#8591B8" fontSize="12" fontFamily="monospace">INPUT: FORENSIC SKETCH</text>
              </svg>
            </div>

            {/* Layer 2: Synthesized Photo (Right Side, clipped by slider) */}
            <div 
              className="absolute inset-0 flex items-center justify-center bg-ink-900 p-6 overflow-hidden transition-all duration-75"
              style={{
                clipPath: viewMode === 'sketch' 
                  ? 'inset(0 100% 0 0)' 
                  : viewMode === 'photo' 
                  ? 'inset(0 0 0 0)' 
                  : viewMode === 'heatmap'
                  ? 'inset(0 0 0 0)'
                  : `inset(0 0 0 ${sliderPos}%)`
              }}
            >
              {viewMode === 'heatmap' ? (
                /* Illustrative PatchGAN patch-score map */
                <div className="w-full h-full relative flex items-center justify-center">
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-4 opacity-75">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`rounded border border-cyber-cyan/40 flex items-center justify-center text-[9px] font-mono ${
                          i % 5 === 0 ? 'bg-cyber-cyan/30 text-cyber-cyan' : i % 3 === 0 ? 'bg-cyber-violet/30 text-cyber-violet' : 'bg-void-800/40 text-slate-500'
                        }`}
                      >
                        {(0.85 + (i * 0.003)).toFixed(2)}
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-4 left-4 text-xs font-mono text-cyber-cyan bg-void-950/80 px-2 py-1 rounded border border-cyber-cyan/40">
                    Illustrative patch-wise real/fake score map
                  </div>
                </div>
              ) : (
                /* High-fidelity synthesized facial portrait SVG */
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  <defs>
                    <radialGradient id="skinGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#d4a373" />
                      <stop offset="70%" stopColor="#bc6c25" />
                      <stop offset="100%" stopColor="#283618" />
                    </radialGradient>
                    <linearGradient id="lighting" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3DDCFF" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Face Base */}
                  <ellipse cx="150" cy="150" rx="90" ry="120" fill="url(#skinGrad)" opacity="0.9" />
                  <ellipse cx="150" cy="150" rx="90" ry="120" fill="url(#lighting)" />
                  
                  {/* Eyes with specular highlights */}
                  <ellipse cx="110" cy="140" rx="14" ry="8" fill="#0F1630" />
                  <ellipse cx="190" cy="140" rx="14" ry="8" fill="#0F1630" />
                  <circle cx="108" cy="138" r="4" fill="#7C8CFF" />
                  <circle cx="188" cy="138" r="4" fill="#7C8CFF" />
                  <circle cx="106" cy="136" r="1.5" fill="#ffffff" />
                  <circle cx="186" cy="136" r="1.5" fill="#ffffff" />
                  
                  {/* Nose with depth */}
                  <path d="M 150 135 L 144 175 L 158 178" stroke="#7f4f24" strokeWidth="2.5" fill="none" />
                  
                  {/* Lips with volume */}
                  <path d="M 122 210 Q 150 198 178 210 Q 150 224 122 210 Z" fill="#9d0208" opacity="0.8" />
                  <line x1="124" y1="210" x2="176" y2="210" stroke="#370617" strokeWidth="1.5" />
                  
                  <text x="140" y="35" fill="#3DDCFF" fontSize="12" fontFamily="monospace" textAnchor="end">SYNTHESIS: UNET PHOTO</text>
                </svg>
              )}
            </div>

            {/* Split Slider Divider Line */}
            {viewMode === 'split' && (
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-cyber-cyan shadow-glow-cyan z-20 cursor-ew-resize"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-void-950 border-2 border-cyber-cyan flex items-center justify-center text-cyber-cyan shadow-glow-cyan">
                  <Sliders className="w-3 h-3" />
                </div>
              </div>
            )}

          </div>

          {/* Slider drag control */}
          {viewMode === 'split' && (
            <div className="mt-3 px-2">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => {
                  soundFx.playClick();
                  setSliderPos(Number(e.target.value));
                }}
                className="w-full h-1.5 bg-void-800 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>← Forensic Sketch</span>
                <span>Drag to Morph</span>
                <span>Synthesized Photo →</span>
              </div>
            </div>
          )}

        </div>

        {/* Technical Architecture Specs */}
        <div className="lg:col-span-5 space-y-3 font-mono text-xs">
          
          <div className="p-4 rounded-xl bg-void-950 border border-void-800 space-y-2">
            <div className="text-cyber-cyan font-bold uppercase text-[11px] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Generator Architecture (UNet)
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
              7-level encoder-decoder at 256×256 with skip connections that carry edge detail from sketch to photo. 
              Uses <strong className="text-white">Instance Normalization</strong>, LeakyReLU downsampling and an upsample + conv decoder with dropout.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-void-950 border border-void-800 space-y-2">
            <div className="text-cyber-violet font-bold uppercase text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Discriminator (Conditional PatchGAN)
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
              Sees the sketch and the photo together and scores local patches instead of the whole frame, 
              pushing realistic micro-texture and reducing the blur of pure L1/L2 regression.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-void-950 border border-void-800 space-y-2.5">
            <div className="text-cyber-emerald font-bold uppercase text-[11px]">Loss mix ablation</div>
            <div className="flex flex-wrap gap-1.5">
              {LOSS_MIXES.map((m, i) => (
                <button
                  key={i}
                  onClick={() => { soundFx.playClick(); setMix(i); }}
                  className={`px-2.5 py-1 rounded-md text-[11px] border transition-all ${
                    mix === i ? 'bg-cyber-cyan/15 border-cyber-cyan/50 text-white' : 'border-void-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {m.px * 10}:{m.cx * 10}
                </button>
              ))}
            </div>
            <div className="text-cyber-cyan font-bold text-[11px] break-words">
              L = L_GAN + 100 · ({LOSS_MIXES[mix].px} · L_pixel + {LOSS_MIXES[mix].cx} · L_contextual)
            </div>
            <p className="text-slate-400 text-[11px] font-sans">{LOSS_MIXES[mix].note}. Contextual loss is a KL divergence between grayscale intensity distributions.</p>
          </div>

        </div>

      </div>

    </div>
  );
}
