import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Github, Linkedin, Play } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] } }),
};

export default function Hero({ onOpenCommandPalette, onLaunchSimulator }) {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

          {/* Left: positioning */}
          <motion.div className="lg:col-span-7" initial="hidden" animate="show">
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
              </span>
              <span className="text-sm text-slate-400">
                Open to AI/ML engineering roles · {personalInfo.location.split(',')[0]}, India
              </span>
            </motion.div>

            <motion.p variants={fadeUp} custom={1} className="font-mono text-xs uppercase tracking-[0.18em] text-ember mb-5">
              Subramanyasai Gundamraju — AI / ML Engineer
            </motion.p>

            <motion.h1 variants={fadeUp} custom={2} className="text-[2.6rem] sm:text-6xl md:text-[4.25rem] font-semibold text-white leading-[1.04]">
              I build forecasting engines and RAG systems that{' '}
              <span className="em-serif text-ember">don't make numbers up.</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={3} className="mt-7 text-lg text-slate-400 leading-relaxed max-w-2xl">
              Production ML where the math is deterministic and the LLM only explains it.
              A <span className="text-slate-200">14-model autonomous forecaster</span> running across 1,115 stores,
              and a <span className="text-slate-200">trilingual RAG</span> (English, Hindi, Gujarati) with zero unverified figures.
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap items-center gap-3 mt-10">
              <button
                onClick={() => { soundFx.playClick(); onLaunchSimulator(); }}
                className="group px-5 py-3 rounded-xl bg-ember text-ink-950 font-semibold text-sm hover:bg-ember-soft transition-colors flex items-center gap-2 shadow-glow-cyan"
              >
                <Play className="w-4 h-4 fill-current" />
                Try the live simulators
              </button>

              <a
                href="#projects"
                onClick={() => soundFx.playClick()}
                className="group px-5 py-3 rounded-xl border border-ink-700 text-slate-200 hover:text-white hover:border-slate-500 text-sm font-medium transition-colors flex items-center gap-2"
              >
                See the work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <div className="flex items-center gap-1 ml-1">
                {[
                  { href: personalInfo.social.github, Icon: Github, label: 'GitHub' },
                  { href: personalInfo.social.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-ink-850 transition-colors"
                    title={label}
                    aria-label={label}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                ))}
                <button
                  onClick={() => { soundFx.playClick(); onOpenCommandPalette(); }}
                  className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-ink-850 transition-colors"
                  title="Search (Ctrl/⌘ K)"
                  aria-label="Search"
                >
                  <Search className="w-[18px] h-[18px]" />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: architecture card */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-2xl glass-panel overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-ink-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-ink-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-ink-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-ink-700" />
                  <span className="ml-3 font-mono text-xs text-slate-500">pipeline.py</span>
                </div>
                <span className="font-mono text-xs text-sage">776 tests passing</span>
              </div>

              <pre className="px-5 py-5 font-mono text-[12.5px] leading-[1.75] text-slate-400 overflow-x-auto">
<span className="text-slate-600"># forecasting: rule-ladder model selection</span>{'\n'}
<span className="text-brass">engine</span> = AutoForecast({'\n'}
{'    '}catalog=[<span className="text-ember-soft">"AutoETS"</span>, <span className="text-ember-soft">"MSTL"</span>, <span className="text-ember-soft">"LightGBM"</span>,{'\n'}
{'             '}<span className="text-ember-soft">"PatchTST"</span>, <span className="text-ember-soft">"Chronos"</span>],{'\n'}
{'    '}metric=<span className="text-ember-soft">"MASE_walk_forward"</span>,{'\n'}
{'    '}series=<span className="text-cobalt">1115</span>,{'\n'}
){'\n'}
{'\n'}
<span className="text-slate-600"># RAG: hybrid retrieval + numeral guard</span>{'\n'}
<span className="text-brass">hits</span> = rrf(bge_m3(q), bm25(q)){'\n'}
<span className="text-brass">top</span>  = jina_rerank(hits, k=<span className="text-cobalt">5</span>){'\n'}
<span className="text-brass">ans</span>  = numeral_guard(llm(q, top))
              </pre>

              <div className="grid grid-cols-3 border-t border-ink-800 divide-x divide-ink-800">
                {[
                  ['0.857', 'R@1 (vs 0.214)'],
                  ['~6s', 'rerank, was 4m+'],
                  ['0', 'unverified numbers'],
                ].map(([v, l]) => (
                  <div key={l} className="px-4 py-3.5">
                    <div className="font-display text-lg font-semibold text-white">{v}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
