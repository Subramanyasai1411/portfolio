import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Cpu, 
  Sliders, 
  RefreshCw, 
  ShieldAlert, 
  CheckCircle2, 
  Bot, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function AutoForecastSimulator() {
  const [scenario, setScenario] = useState('price'); // 'price', 'societies', 'weather', 'goalseek'
  const [priceChange, setPriceChange] = useState(12); // -25% to +25%
  const [entityRetention, setEntityRetention] = useState(65); // 10% to 100%
  const [weatherShift, setWeatherShift] = useState(2.8); // -5 to +5 deg C
  const [activeModel, setActiveModel] = useState('LightGBM (Winning ML)');

  const scenarios = [
    { id: 'price', label: 'Store Price Elasticity', desc: 'Perturb driver price & evaluate lead-lag demand' },
    { id: 'societies', label: 'Structural Entity Cut', desc: 'Contribution cube under member drop' },
    { id: 'weather', label: 'Governed Weather Shock', desc: 'Exogenous Open-Meteo temperature shock' },
    { id: 'goalseek', label: 'Target Goal-Seek', desc: 'Invert driver needed to hit +15% target' }
  ];

  // Dynamically calculate forecast series points
  const forecastData = useMemo(() => {
    // Generate 12 historical points and 8 forecast points
    const historical = [42, 45, 48, 44, 52, 58, 62, 60, 65, 71, 74, 78];
    const baseline = [82, 85, 89, 93, 98, 102, 107, 112];

    // Compute perturbed curve based on scenario
    let elasticity = -0.74; // standard price elasticity
    let multiplier = 1;

    if (scenario === 'price') {
      // Delta price causes delta demand: delta % = elasticity * (priceChange / 100)
      multiplier = 1 + (elasticity * (priceChange / 100));
    } else if (scenario === 'societies') {
      // Historical count elasticity
      const retentionRatio = entityRetention / 100;
      multiplier = Math.pow(retentionRatio, 0.88);
    } else if (scenario === 'weather') {
      multiplier = 1 + (weatherShift * 0.035);
    } else if (scenario === 'goalseek') {
      multiplier = 1.15; // Target
    }

    const perturbed = baseline.map((val) => Math.round(val * multiplier));
    
    // Bounds for SVG
    const allValues = [...historical, ...baseline, ...perturbed];
    const minVal = Math.min(...allValues) - 5;
    const maxVal = Math.max(...allValues) + 10;
    const range = maxVal - minVal;

    return {
      historical,
      baseline,
      perturbed,
      minVal,
      maxVal,
      range,
      multiplier
    };
  }, [scenario, priceChange, entityRetention, weatherShift]);

  // Points to SVG coordinates
  const width = 640;
  const height = 220;
  const paddingX = 40;
  const paddingY = 25;
  const totalPoints = 20; // 12 hist + 8 forecast

  const getX = (index) => paddingX + (index / (totalPoints - 1)) * (width - 2 * paddingX);
  const getY = (val) => height - paddingY - ((val - forecastData.minVal) / forecastData.range) * (height - 2 * paddingY);

  // SVG paths
  const histPath = forecastData.historical.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(v)}`).join(' ');
  
  // Baseline path starts from last historical point
  const baseStart = `${getX(11)} ${getY(forecastData.historical[11])}`;
  const basePath = `M ${baseStart} ` + forecastData.baseline.map((v, i) => `L ${getX(12 + i)} ${getY(v)}`).join(' ');

  // Perturbed path starts from last historical point
  const pertPath = `M ${baseStart} ` + forecastData.perturbed.map((v, i) => `L ${getX(12 + i)} ${getY(v)}`).join(' ');

  // Confidence area path for perturbed
  const upperPert = forecastData.perturbed.map((v, i) => `${getX(12 + i)} ${getY(v * 1.06)}`);
  const lowerPert = [...forecastData.perturbed].reverse().map((v, i) => `${getX(19 - i)} ${getY(v * 0.94)}`);
  const ribbonPath = `M ${baseStart} ` + upperPert.map(p => `L ${p}`).join(' ') + ' ' + lowerPert.map(p => `L ${p}`).join(' ') + ' Z';

  return (
    <div className="rounded-2xl bg-void-900/90 border border-cyber-cyan/30 p-5 sm:p-7 shadow-2xl glass-panel relative overflow-hidden">
      
      {/* Background blueprint elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

      {/* Simulator Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-void-800 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30 font-semibold uppercase tracking-wider">
              Interactive System Simulator
            </span>
            <span className="text-xs font-mono text-slate-400">
              Module: AutoForecast.WhatIfCopilot
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            What-If Scenario & Causal Perturbation Engine
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono text-slate-400">Winning Model:</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-void-800 text-cyber-cyan border border-cyber-cyan/30 font-medium">
            {activeModel}
          </span>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {scenarios.map((s) => {
          const isActive = scenario === s.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                soundFx.playClick();
                setScenario(s.id);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive 
                  ? 'bg-cyber-cyan/15 border-cyber-cyan text-white shadow-glow-cyan' 
                  : 'bg-void-850/60 border-void-800 text-slate-400 hover:text-slate-200 hover:border-void-700'
              }`}
            >
              <div className="font-mono text-xs font-semibold text-white mb-0.5 flex items-center justify-between">
                <span>{s.label}</span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />}
              </div>
              <div className="text-[10px] font-mono text-slate-400 leading-tight">
                {s.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Simulation Viewport: Chart + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* SVG Multi-Line Forecast Curve Visualizer */}
        <div className="lg:col-span-7 bg-void-950/80 rounded-xl p-4 border border-void-800/80 shadow-inner relative">
          
          <div className="flex items-center justify-between mb-2 px-2 text-[11px] font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-0.5 bg-slate-400 inline-block" /> Historical
              </span>
              <span className="flex items-center gap-1.5 text-cobalt">
                <span className="w-2.5 h-0.5 bg-cobalt inline-block" /> Baseline
              </span>
              <span className="flex items-center gap-1.5 text-ember">
                <span className="w-2.5 h-0.5 bg-ember inline-block" /> What-if scenario
              </span>
            </div>
            <span className="text-slate-400">Newey-West 95% CI Ribbon</span>
          </div>

          <div className="w-full overflow-hidden">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
              {/* Grid Lines */}
              {[0, 1, 2, 3, 4].map((i) => {
                const y = paddingY + (i / 4) * (height - 2 * paddingY);
                return (
                  <line 
                    key={i} 
                    x1={paddingX} 
                    y1={y} 
                    x2={width - paddingX} 
                    y2={y} 
                    stroke="rgba(238, 242, 255, 0.05)" 
                    strokeDasharray="4 4" 
                  />
                );
              })}

              {/* Vertical line splitting Historical vs Forecast */}
              <line 
                x1={getX(11)} 
                y1={paddingY} 
                x2={getX(11)} 
                y2={height - paddingY} 
                stroke="rgba(124, 140, 255, 0.3)" 
                strokeDasharray="3 3" 
              />
              <text x={getX(11) - 6} y={paddingY + 10} fill="#8591B8" fontSize="9" fontFamily="monospace" textAnchor="end">
                PAST
              </text>
              <text x={getX(11) + 6} y={paddingY + 10} fill="#7C8CFF" fontSize="9" fontFamily="monospace" textAnchor="start">
                FORECAST HORIZON
              </text>

              {/* Confidence Band Ribbon */}
              <path d={ribbonPath} fill="rgba(61, 220, 255, 0.12)" />

              {/* Historical Line */}
              <path d={histPath} fill="none" stroke="#636F96" strokeWidth="2.5" strokeLinecap="round" />

              {/* Baseline Forecast Line */}
              <path d={basePath} fill="none" stroke="#7C8CFF" strokeWidth="2" strokeDasharray="5 3" />

              {/* Perturbed What-If Curve */}
              <path d={pertPath} fill="none" stroke="#3DDCFF" strokeWidth="3" strokeLinecap="round" />

              {/* Data points */}
              {forecastData.historical.map((v, i) => (
                <circle key={i} cx={getX(i)} cy={getY(v)} r="2" fill="#8591B8" />
              ))}
              {forecastData.perturbed.map((v, i) => (
                <circle key={i} cx={getX(12 + i)} cy={getY(v)} r="3" fill="#3DDCFF" stroke="#060914" strokeWidth="1" />
              ))}
            </svg>
          </div>

          <div className="flex items-center justify-between pt-2 px-2 text-[10px] font-mono text-slate-400 border-t border-void-850 mt-1">
            <span>T-12 ... T-1 (Historical Panel Data)</span>
            <span>T+1 ... T+8 (Autonomous Prediction Intervals)</span>
          </div>
        </div>

        {/* Real-time Slider Controls & Diagnostics */}
        <div className="lg:col-span-5 space-y-4">
          
          {scenario === 'price' && (
            <div className="p-4 rounded-xl bg-void-950/90 border border-void-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-medium">Store 5 Price Perturbation:</span>
                <span className={`font-bold px-2 py-0.5 rounded ${priceChange >= 0 ? 'text-cyber-cyan bg-cyber-cyan/10' : 'text-cyber-rose bg-rose-500/10'}`}>
                  {priceChange > 0 ? `+${priceChange}%` : `${priceChange}%`}
                </span>
              </div>
              <input
                type="range"
                min="-25"
                max="25"
                step="1"
                value={priceChange}
                onChange={(e) => {
                  soundFx.playClick();
                  setPriceChange(Number(e.target.value));
                }}
                className="w-full h-1.5 bg-void-800 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>-25% (Deep Discount)</span>
                <span>0% (Baseline)</span>
                <span>+25% (Hike)</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 bg-void-900 p-2 rounded border border-void-800">
                <span className="text-cyber-cyan">4-Tier Router:</span> Tier A (Lead-Lag ML Perturbation). Observed Elasticity: <strong className="text-white">-0.74</strong>.
              </div>
            </div>
          )}

          {scenario === 'societies' && (
            <div className="p-4 rounded-xl bg-void-950/90 border border-void-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-medium">Active Society Retention:</span>
                <span className="font-bold text-cyber-violet bg-cyber-violet/10 px-2 py-0.5 rounded">
                  {entityRetention}% Active
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={entityRetention}
                onChange={(e) => {
                  soundFx.playClick();
                  setEntityRetention(Number(e.target.value));
                }}
                className="w-full h-1.5 bg-void-800 rounded-lg appearance-none cursor-pointer accent-cyber-violet"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>20% (High Loss)</span>
                <span>60%</span>
                <span>100% (Full Network)</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 bg-void-900 p-2 rounded border border-void-800">
                <span className="text-cyber-violet">Contribution Cube:</span> Historical count-elasticity powered by Newey-West CIs with statistical power gate.
              </div>
            </div>
          )}

          {scenario === 'weather' && (
            <div className="p-4 rounded-xl bg-void-950/90 border border-void-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-medium">Open-Meteo Temperature Shift:</span>
                <span className="font-bold text-cyber-amber bg-amber-500/10 px-2 py-0.5 rounded">
                  {weatherShift > 0 ? `+${weatherShift}°C` : `${weatherShift}°C`}
                </span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.2"
                value={weatherShift}
                onChange={(e) => {
                  soundFx.playClick();
                  setWeatherShift(Number(e.target.value));
                }}
                className="w-full h-1.5 bg-void-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>-5.0°C (Cold Front)</span>
                <span>0.0°C</span>
                <span>+5.0°C (Heatwave)</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 bg-void-900 p-2 rounded border border-void-800">
                <span className="text-cyber-amber">Governed Exogenous Layer:</span> Audit-logged fetch with zero target leakage into rolling feature store.
              </div>
            </div>
          )}

          {scenario === 'goalseek' && (
            <div className="p-4 rounded-xl bg-void-950/90 border border-void-800 space-y-2">
              <div className="text-xs font-mono text-cyber-cyan font-semibold">
                Target: +15.0% Revenue Horizon
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Goal-Seek solver inverts the model's feature elasticity curve:
              </p>
              <div className="space-y-1 text-[11px] font-mono bg-void-900 p-2.5 rounded border border-void-800 text-slate-300">
                <div>• Required Store 5 Promo: <span className="text-cyber-cyan font-bold">-18.4% price discount</span></div>
                <div>• Alternative: Expand active societies by <span className="text-cyber-violet font-bold">+12 centers</span></div>
                <div>• Causality Test: Granger p-value = 0.003 (VAR order: 2)</div>
              </div>
            </div>
          )}

          {/* Causal Attribution Radar */}
          <div className="p-3.5 rounded-xl bg-void-950/90 border border-void-800 flex items-center justify-between text-xs font-mono">
            <div>
              <div className="text-slate-400 text-[10px] uppercase">SHAP Driver Attribution</div>
              <div className="text-white font-bold text-sm">
                {scenario === 'price' ? 'Price: 42.6%' : scenario === 'societies' ? 'Network Count: 58.1%' : 'Weather: 24.3%'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-[10px] uppercase">Fold Stability</div>
              <div className="text-cyber-emerald font-bold text-sm">0.96 / 1.0 (Stable)</div>
            </div>
          </div>

        </div>

      </div>

      {/* Deterministic LLM Guardrail Console */}
      <div className="mt-6 p-4 rounded-xl bg-void-950 border border-cyber-cyan/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20 flex-shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-semibold text-white">
                Deterministic What-If Copilot (Groq / Qwen / Ollama)
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/20 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3" /> Pydantic Guard Active
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono">
              "{scenario === 'price' 
                ? `Simulated query: If Store 5 changes price by ${priceChange}%, winning LightGBM model projects volume delta of ${((forecastData.multiplier - 1) * 100).toFixed(1)}% with zero mathematical fabrication.`
                : scenario === 'societies' 
                ? `Simulated query: Structural reduction to ${entityRetention}% active societies yields ${((forecastData.multiplier - 1) * 100).toFixed(1)}% volume impact across Newey-West confidence bands.`
                : scenario === 'weather'
                ? `Simulated query: A ${weatherShift}°C exogenous temperature perturbation alters baseline demand by ${((forecastData.multiplier - 1) * 100).toFixed(1)}% through audited Open-Meteo features.`
                : 'Goal-seek solver actively inverted required driver perturbations to achieve target without hallucinations.'
              }"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 self-end md:self-auto flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-cyber-emerald" />
          <span>ZERO NUMERICAL HALLUCINATION</span>
        </div>
      </div>

    </div>
  );
}
