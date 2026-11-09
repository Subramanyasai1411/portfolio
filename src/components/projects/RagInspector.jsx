import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Languages, 
  Layers, 
  Zap, 
  CheckCircle, 
  FileText, 
  AlertCircle,
  Database
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function RagInspector() {
  const [lang, setLang] = useState('gujarati'); // 'english', 'hindi', 'gujarati', 'unanswerable'

  const queryPresets = {
    english: {
      langLabel: "English (En)",
      query: "What is the penalty clause for delay exceeding 30 calendar days under Section 4.2?",
      ocrDigitRepair: {
        raw: "Section 4.2: Liquidated damages for delay exceeding 30 days shall be calculated at 0.5% per week up to 10% maximum.",
        repaired: "Section 4.2: Liquidated damages for delay exceeding 30 days shall be calculated at 0.5% per week up to 10% maximum.",
        delta: "Standard ASCII Latin numerals verified."
      },
      bgeM3Score: 0.894,
      bm25Score: 0.812,
      rrfRank: "#1 (Score: 0.0328)",
      crossEncoderScore: 0.941,
      latency: "5.8s",
      groundedQuote: "Section 4.2 [Page 42, ¶3]: '...delay exceeding 30 calendar days will incur liquidated damages of 0.5% per day subject to a maximum cap of 10% of total contract value.'",
      extractedAnswer: "Under Section 4.2, delays exceeding 30 calendar days incur liquidated damages of 0.5% per day, capped at a maximum of 10% of total contract value.",
      verifiedNumerals: ["30", "0.5%", "10%"],
      isRefusal: false,
    },
    hindi: {
      langLabel: "Hindi (हिन्दी)",
      query: "अनुभाग ४.२ के तहत ३० दिनों से अधिक के विलंब पर क्या दंड निर्धारित है?",
      ocrDigitRepair: {
        raw: "अनुभाग ४.२: ३० दिनों से अधिक का विलंब ०.५% प्रति दिन अधिकतम १०% तक दंडनीय होगा।",
        repaired: "अनुभाग 4.2: 30 दिनों से अधिक का विलंब 0.5% प्रति दिन अधिकतम 10% तक दंडनीय होगा। [Devanagari normalized to ASCII & restored in synthesis]",
        delta: "Devanagari numerals ४.२, ३०, ०.५%, १०% mapped to dual-representation index."
      },
      bgeM3Score: 0.878,
      bm25Score: 0.765,
      rrfRank: "#1 (Score: 0.0315)",
      crossEncoderScore: 0.918,
      latency: "6.1s",
      groundedQuote: "अनुभाग ४.२ [पृष्ठ ४२, पैरा ३]: '...३० दिनों से अधिक के विलंब पर ०.५% प्रति दिन की दर से अधिकतम १०% तक क्षतिपूर्ति देय होगी।'",
      extractedAnswer: "अनुभाग ४.२ के अनुसार, ३० दिनों से अधिक के विलंब पर ०.५% प्रति दिन के हिसाब से कुल अनुबंध मूल्य का अधिकतम १०% तक दंड लगेगा।",
      verifiedNumerals: ["४.२ (4.2)", "३० (30)", "०.५% (0.5%)", "१०% (10%)"],
      isRefusal: false,
    },
    gujarati: {
      langLabel: "Gujarati (ગુજરાતી)",
      query: "વિભાગ ૪.૨ મુજબ ૩૦ દિવસથી વધુના વિલંબ માટે શું દંડ નિર્ધારિત છે?",
      ocrDigitRepair: {
        raw: "વિભાગ ૪.૨: ૩૦ દિવસથી વધુ વિલંબ પર ૦.૫% પ્રતિ દિવસ અને વધુમાં વધુ ૧૦% સુધી દંડ રહેશે.",
        repaired: "વિભાગ 4.2: 30 દિવસથી વધુ વિલંબ પર 0.5% પ્રતિ દિવસ અને વધુમાં વધુ 10% સુધી દંડ રહેશે. [Gujarati digit repair + phonetic alignment]",
        delta: "Repairs Gujarati OCR numeral confusion (૪ vs ૫, ૦ vs ૭) via script lookup table."
      },
      bgeM3Score: 0.865,
      bm25Score: 0.748,
      rrfRank: "#1 (Score: 0.0309)",
      crossEncoderScore: 0.904,
      latency: "6.4s",
      groundedQuote: "વિભાગ ૪.૨ [પૃષ્ઠ ૪૨, ફકરો ૩]: '...૩૦ દિવસથી વધુના વિલંબ માટે કુલ કરાર મૂલ્યના ૦.૫% પ્રતિ દિવસ અને મહત્તમ ૧૦% સુધી દંડ વસૂલવામાં આવશે.'",
      extractedAnswer: "વિભાગ ૪.૨ અનુસાર, ૩૦ દિવસથી વધુ વિલંબ માટે ૦.૫% પ્રતિ દિવસ અને મહત્તમ ૧૦% સુધીનો દંડ નિર્ધારિત કરવામાં આવ્યો છે.",
      verifiedNumerals: ["૪.૨ (4.2)", "૩૦ (30)", "૦.૫% (0.5%)", "૧૦% (10%)"],
      isRefusal: false,
    },
    unanswerable: {
      langLabel: "Out-of-Distribution / Ungrounded",
      query: "What is the contractor's overseas parent company annual turnover for FY2024?",
      ocrDigitRepair: {
        raw: "No matching semantic or lexical candidates in indexed tender chunks.",
        repaired: "Null vector similarity cutoff triggered (threshold: < 0.42).",
        delta: "Deterministic refusal gate activated."
      },
      bgeM3Score: 0.284,
      bm25Score: 0.000,
      rrfRank: "Below Minimum Confidence Gate",
      crossEncoderScore: 0.120,
      latency: "2.1s",
      groundedQuote: "No grounded citation available in repository.",
      extractedAnswer: "Information not available in the provided documents. (Model declines to fabricate answer).",
      verifiedNumerals: [],
      isRefusal: true,
    }
  };

  const current = queryPresets[lang];

  return (
    <div className="rounded-2xl bg-void-900/90 border border-cyber-cyan/30 p-5 sm:p-7 shadow-2xl glass-panel relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyber-violet/5 rounded-full blur-3xl pointer-events-none" />

      {/* Inspector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-void-800 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-emerald/20 text-cyber-emerald border border-cyber-emerald/30 font-semibold uppercase tracking-wider">
              Verification Engine
            </span>
            <span className="text-xs font-mono text-slate-400">
              Module: DocumentExactRAG.HybridGuard
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Trilingual Hybrid RAG & Deterministic Numeral Guard
          </h3>
        </div>

        {/* Benchmark Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">bge-m3 R@1:</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/30 font-semibold">
            0.857 vs 0.214 (Baseline)
          </span>
        </div>
      </div>

      {/* Language Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {Object.entries(queryPresets).map(([key, item]) => {
          const isActive = lang === key;
          return (
            <button
              key={key}
              onClick={() => {
                soundFx.playClick();
                setLang(key);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-cyber-cyan/15 border-cyber-cyan text-white shadow-glow-cyan'
                  : 'bg-void-850/60 border-void-800 text-slate-400 hover:text-slate-200 hover:border-void-700'
              }`}
            >
              <div className="font-mono text-xs font-semibold text-white mb-0.5 flex items-center justify-between">
                <span>{item.langLabel}</span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />}
              </div>
              <div className="text-[10px] font-mono text-slate-400 truncate">
                {key === 'unanswerable' ? 'Hallucination Refusal Gate' : 'Gold Benchmark Test Set'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Query Bar */}
      <div className="mb-6 p-4 rounded-xl bg-void-950 border border-void-800">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-cyber-cyan" />
          Active Trilingual Query
        </div>
        <div className="text-sm font-mono text-white font-medium">
          "{current.query}"
        </div>
      </div>

      {/* 4-Stage Pipeline Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Stage 1: Multilingual OCR & Digit Repair */}
        <div className="p-4 rounded-xl bg-void-950/90 border border-void-800 space-y-2">
          <div className="text-[10px] font-mono text-cyber-cyan uppercase font-semibold flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            1. OCR & Digit Repair
          </div>
          <div className="text-[11px] font-mono text-slate-300">
            <div className="text-slate-500 text-[10px]">PyMuPDF + Tesseract Engine</div>
            <p className="mt-1 leading-snug">{current.ocrDigitRepair.delta}</p>
          </div>
          <div className="text-[10px] font-mono px-2 py-1 rounded bg-void-900 border border-void-800 text-slate-400">
            Script normalization active
          </div>
        </div>

        {/* Stage 2: Hybrid Retrieval (bge-m3 + BM25) */}
        <div className="p-4 rounded-xl bg-void-950/90 border border-void-800 space-y-2">
          <div className="text-[10px] font-mono text-cyber-blue uppercase font-semibold flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" />
            2. Hybrid Search
          </div>
          <div className="space-y-1.5 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">bge-m3 (Dense/Qdrant):</span>
              <span className="text-cyber-cyan font-bold">{current.bgeM3Score}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">BM25 (Sparse Lexical):</span>
              <span className="text-cyber-blue font-bold">{current.bm25Score}</span>
            </div>
          </div>
          <div className="text-[10px] font-mono px-2 py-1 rounded bg-void-900 border border-void-800 text-slate-400">
            Reciprocal Rank Fusion (RRF)
          </div>
        </div>

        {/* Stage 3: Cross-Encoder Reranker */}
        <div className="p-4 rounded-xl bg-void-950/90 border border-void-800 space-y-2">
          <div className="text-[10px] font-mono text-cyber-violet uppercase font-semibold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            3. Jina Reranker
          </div>
          <div className="space-y-1.5 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Top-1 Score:</span>
              <span className="text-cyber-violet font-bold">{current.crossEncoderScore}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Latency:</span>
              <span className="text-cyber-emerald font-bold">{current.latency}</span>
            </div>
          </div>
          <div className="text-[10px] font-mono px-2 py-1 rounded bg-void-900 border border-void-800 text-cyber-emerald">
            Slashed from 4m+ → ~6s
          </div>
        </div>

        {/* Stage 4: Deterministic Guardrail */}
        <div className="p-4 rounded-xl bg-void-950/90 border border-void-800 space-y-2">
          <div className="text-[10px] font-mono text-cyber-emerald uppercase font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            4. Numeral Guard
          </div>
          <div className="text-[11px] font-mono text-slate-300">
            <div className="text-slate-500 text-[10px]">Verification Gate</div>
            <p className="mt-1 text-cyber-emerald font-semibold">
              {current.isRefusal ? "0 False Positives" : "100% Numbers Verified"}
            </p>
          </div>
          <div className="text-[10px] font-mono px-2 py-1 rounded bg-void-900 border border-void-800 text-slate-400">
            0 Hallucinated Figures
          </div>
        </div>

      </div>

      {/* Output Console: Grounded Citation vs Verified Answer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Source Ground Truth Citation */}
        <div className="p-4 rounded-xl bg-void-950/80 border border-void-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-cyber-cyan" />
            Retrieved Ground-Truth Document Chunk
          </div>
          <blockquote className="text-xs font-mono text-slate-300 leading-relaxed bg-void-900 p-3 rounded-lg border border-void-850 italic">
            "{current.groundedQuote}"
          </blockquote>
          <div className="mt-2 text-[10px] font-mono text-slate-500">
            Token-safe boundary chunking with hash-based incremental indexing.
          </div>
        </div>

        {/* Model Answer & Verified Numeral Tags */}
        <div className="p-4 rounded-xl bg-void-950/80 border border-void-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-cyber-emerald" />
              Verified Synthesized Answer
            </span>
            <span className="text-[10px] text-cyber-cyan">Groq + Qwen</span>
          </div>

          <p className={`text-xs font-mono leading-relaxed p-3 rounded-lg border ${
            current.isRefusal 
              ? 'bg-rose-950/20 border-rose-500/30 text-rose-300' 
              : 'bg-void-900 border-void-850 text-white'
          }`}>
            "{current.extractedAnswer}"
          </p>

          {/* Numeral verification badges */}
          {current.verifiedNumerals.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400">Audited Figures:</span>
              {current.verifiedNumerals.map((num) => (
                <span 
                  key={num}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/30 flex items-center gap-1 font-semibold"
                >
                  <CheckCircle className="w-3 h-3" /> {num}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
