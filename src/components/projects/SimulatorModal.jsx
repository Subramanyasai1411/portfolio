import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu } from 'lucide-react';
import AutoForecastSimulator from './AutoForecastSimulator';
import RagInspector from './RagInspector';
import SketchGanVisualizer from './SketchGanVisualizer';
import { soundFx } from '../../utils/audio';

export const SIMULATORS = [
  { id: 'whatif', label: 'What-If Scenario Copilot' },
  { id: 'rag', label: 'Document Exact RAG' },
  { id: 'gan', label: 'Sketch-to-Photo GAN' },
];

/**
 * Full-screen "zoomed-in" simulator overlay.
 * Opens in place over the current scroll position (no page navigation).
 * Closes on Esc, backdrop click, or the close button.
 */
export default function SimulatorModal({ simulatorId, onClose, onSwitch }) {
  const isOpen = !!simulatorId;

  // Esc to close + lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="sim-backdrop"
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-void-950/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            key="sim-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Interactive simulator"
            className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-2xl border border-cyber-cyan/40 bg-void-900/95 shadow-[0_0_80px_-20px_rgba(0,245,212,0.45)] overflow-hidden"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: tabs + close */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-void-800 bg-void-950/80">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyber-cyan" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold hidden sm:inline">
                  Live Simulator
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-void-900 p-1 rounded-xl border border-void-800 order-3 sm:order-none w-full sm:w-auto overflow-x-auto">
                {SIMULATORS.map((sim) => (
                  <button
                    key={sim.id}
                    onClick={() => {
                      soundFx.playClick();
                      onSwitch(sim.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                      simulatorId === sim.id
                        ? 'bg-cyber-cyan/15 border border-cyber-cyan/60 text-cyber-cyan font-semibold'
                        : 'border border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    {sim.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline px-2 py-0.5 text-[10px] font-mono bg-void-800 text-slate-400 rounded border border-void-700">
                  ESC
                </kbd>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onClose();
                  }}
                  className="p-2 rounded-lg bg-void-800 text-slate-300 hover:text-white hover:bg-void-700 transition-colors"
                  aria-label="Close simulator"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-3 sm:p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={simulatorId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  {simulatorId === 'whatif' && <AutoForecastSimulator />}
                  {simulatorId === 'rag' && <RagInspector />}
                  {simulatorId === 'gan' && <SketchGanVisualizer />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
