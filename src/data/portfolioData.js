export const personalInfo = {
  name: "Subramanyasai Gundamraju",
  shortName: "Sai",
  title: "AI/ML Engineer",
  badge: "Open to AI/ML roles",
  tagline: "Architecting Autonomous Forecasting Engines, Hallucination-Resistant Multilingual RAG, and Frontier Deep Learning Systems.",
  location: "Hyderabad, Telangana, India",
  email: "sai.gundamraj14@gmail.com",
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Osmania University",
    gradDate: "May 2025",
    cgpa: "9.18 / 10",
    percentage: "86.34%",
    honors: "First Class with Distinction",
  },
  social: {
    github: "https://github.com/Subramanyasai1411",
    githubHandle: "Subramanyasai1411",
    linkedin: "https://www.linkedin.com/in/subramanyasai-gundamraju-53107327",
    linkedinHandle: "subramanyasai-gundamraju",
    email: "mailto:sai.gundamraj14@gmail.com",
  },
  summary: `AI/ML Engineer specialized in architecting end-to-end machine learning platforms, time-series forecasting systems, and enterprise LLM solutions. Proven track record in designing 9-stage autonomous forecasting pipelines handling 1,115+ panel series, trilingual grounded RAG with 0 unverified numerical claims, and UNet/PatchGAN architectures for facial synthesis. Bridging deep mathematical rigor with production software engineering.`
};

export const telemetryMetrics = [
  {
    id: "stores",
    label: "Panel Series Evaluated",
    value: "1,115+",
    subtext: "Auto-Forecast multi-season panels",
    icon: "TrendingUp",
    accent: "cyan",
  },
  {
    id: "models",
    label: "Forecasting Catalog Models",
    value: "14",
    subtext: "Classical, Trees & Deep Chronos/PatchTST",
    icon: "Cpu",
    accent: "purple",
  },
  {
    id: "rag",
    label: "Trilingual Retrieval hit@3",
    value: "95.0%",
    subtext: "0 wrong refusals, 0 unverified nums",
    icon: "ShieldCheck",
    accent: "emerald",
  },
  {
    id: "latency",
    label: "Rerank Latency Cut",
    value: "4m → 6s",
    subtext: "40x speedup with Jina cross-encoder",
    icon: "Zap",
    accent: "cyan",
  },
  {
    id: "tests",
    label: "Automated Test Suite",
    value: "776+",
    subtext: "700+ Auto-Forecast + 76 RAG tests",
    icon: "CheckCircle2",
    accent: "emerald",
  },
  {
    id: "cgpa",
    label: "Undergraduate CGPA",
    value: "9.18/10",
    subtext: "Top tier @ Osmania University",
    icon: "Award",
    accent: "amber",
  },
];

export const flagshipProjects = [
  {
    id: "auto-forecast",
    title: "Auto-Forecast: Autonomous Forecasting & What-If Scenario Platform",
    subtitle: "Enterprise-grade 9-stage autonomous time-series engine with LLM What-If Copilot",
    company: "Vivid Minds Technologies Ltd",
    period: "Apr 2025 – Present",
    category: "Time-Series & Econometrics",
    featured: true,
    badge: "Production Platform",
    repoUrl: null, // User will provide repository URL in future work
    repoStatus: "Source available on request",
    stats: [
      { label: "Panel Scale", value: "1,115 Stores" },
      { label: "Model Catalog", value: "14 Families" },
      { label: "Pipeline Stages", value: "9 Stages" },
      { label: "Unit & E2E Tests", value: "700+" }
    ],
    tech: [
      "Python", "FastAPI", "Dash", "LightGBM", "statsmodels", "PyTorch", 
      "SHAP", "Pydantic", "Docker", "Chronos", "PatchTST", "NHITS"
    ],
    architecture: {
      stages: [
        "1. Ingest (Multi-million row CSV/Parquet/DB)",
        "2. Automated EDA & Profiling",
        "3. Imputation & Seasonality Cleaning",
        "4. Strict Leakage-Free Validation Gate",
        "5. 14-Model Selection Ladder",
        "6. Feature Generation (Lags, Exogenous, Weather)",
        "7. Walk-Forward Backtesting (MASE)",
        "8. Convex-Weight Ensembling",
        "9. Evidence-Grounded Executive Report"
      ],
      whatIfEngine: {
        driverRouter: "4-tier router (Tier A–D): perturbs lead-lag features on winning ML model, uses residual shadow model for classical winners, or correlation-elasticity fallback.",
        goalSeek: "Solves driver change needed to reach specified target. Attribution: SHAP + Granger causality + fold-stability.",
        structuralWhatIf: "Add/remove entities (stores, societies, plants) via contribution cube with Newey-West confidence intervals and power gate.",
        guardrails: "Open-weight LLM (Groq/Ollama) only classifies & narrates; all numbers computed by deterministic engines with zero fabrication tolerance."
      }
    },
    highlights: [
      "Architected a no-code forecasting platform: give it a CSV/Excel file or database table and it executes a 9-stage pipeline with a single user confirmation.",
      "Handles cancellable asynchronous subprocesses, resumable runs, and multi-million-row panel datasets (tested on 1,115 store networks).",
      "Built a 14-model catalog spanning classical methods (AutoETS, ARIMA, Theta, MSTL, Croston/TSB), gradient boosters (LightGBM, XGBoost, CatBoost), and deep architectures (NHITS, PatchTST, Chronos) chosen by an automated rule-engine ladder on seasonality, intermittency, and structural breaks.",
      "Engineered an LLM What-If Scenario Copilot answering plain-English questions like 'What if Store 5 raises prices by 12%?' or 'What if we lose half the societies?' without ever hallucinating numbers.",
      "Implemented governed external data integration (Open-Meteo weather, geocoding, public holidays) with license gating and audit log."
    ]
  },
  {
    id: "document-exact-rag",
    title: "Document Exact RAG: Multilingual Grounded Q&A Platform",
    subtitle: "Hallucination-resistant hybrid RAG pipeline for English, Hindi, and Gujarati",
    company: "Vivid Minds Technologies Ltd",
    period: "Apr 2025 – Present",
    category: "LLM & RAG",
    featured: true,
    badge: "0 Hallucinated Figures",
    repoUrl: null,
    repoStatus: "Source available on request",
    stats: [
      { label: "Trilingual Gold hit@3", value: "95%" },
      { label: "Wrong Refusals", value: "0" },
      { label: "Unverified Numbers", value: "0" },
      { label: "bge-m3 R@1", value: "0.857 vs 0.214" }
    ],
    tech: [
      "Python", "Qdrant", "BM25", "bge-m3", "Jina Reranker", 
      "Tesseract OCR", "Groq (Qwen)", "Flask", "PyMuPDF"
    ],
    architecture: {
      ingestion: "PyMuPDF + Tesseract OCR (eng+hin+guj) with Gujarati digit repair, token-aware chunking, and hash-based incremental indexing.",
      retrieval: "Hybrid retrieval combining dense embeddings via bge-m3 (Qdrant) and sparse keyword search via BM25, merged via Reciprocal Rank Fusion (RRF).",
      reranking: "Cross-encoder (Jina) reranking reducing latency from 4+ min to ~6 s (~10 s per answer).",
      guardrails: "Deterministic answer guard removes spelled-out numbers, restores source numeral scripts, and verifies every figure against retrieved contexts with fixed refusal when grounded text is absent."
    },
    highlights: [
      "Built a production hallucination-resistant hybrid RAG answering complex queries with exact page/paragraph citations in English, Hindi, and Gujarati.",
      "Pioneered a deterministic answer guard that verifies every numerical claim against the ground-truth text chunks, completely eliminating numerical hallucinations.",
      "Engineered specialized OCR digit repairs for Gujarati and Devanagari numerals, normalizing scripts for exact keyword and semantic alignment.",
      "Benchmarked on a real 283-page government tender: bge-m3 hit 0.857 R@1 compared to 0.214 for previous default; 42-question gold test set achieved 95% hit@3 with 0 wrong refusals and 76 automated test verifications."
    ]
  },
  {
    id: "face-sketch-gan",
    title: "Face Sketch-to-Photo Synthesis (Conditional UNet GAN)",
    subtitle: "pix2pix-style sketch-to-photo generator with a contextual + pixel loss, trained on CUHK and Google sketch data",
    company: "Centre for AI and ML, Osmania University",
    period: "May 2024 – July 2024",
    category: "Deep Learning & Vision",
    featured: true,
    badge: "Research & Synthesis",
    repoUrl: null,
    repoStatus: "Source available on request",
    stats: [
      { label: "Architecture", value: "UNet + PatchGAN" },
      { label: "Loss", value: "Contextual + Pixel" },
      { label: "Input Size", value: "256 x 256 RGB" },
      { label: "Metrics", value: "SSIM + L2 Verification" }
    ],
    tech: ["Python", "TensorFlow", "Keras", "GANs", "UNet", "PatchGAN", "Instance Norm", "OpenCV", "SSIM"],
    highlights: [
      "Built a conditional GAN that turns face sketches into photos: a 7-level UNet generator with skip connections, LeakyReLU, Instance Normalization and dropout in the decoder, paired with a conditional PatchGAN discriminator that scores sketch/photo pairs.",
      "Designed a hybrid objective combining adversarial loss with a pixel-wise L1 term and a contextual (KL-divergence) loss on grayscale intensity distributions, then ran an ablation over pixel:contextual weightings of 1:0, 8:2, 5:5 and 2:8.",
      "Trained at 256x256 for 100 epochs with batch size 16 on augmented CUHK Face Sketch and Google sketch pairs; evaluated with SSIM and L2-norm face verification accuracy.",
      "Packaged separate training, inference and evaluation notebooks, saving generator and discriminator checkpoints every epoch for side-by-side comparison of loss variants."
    ]
  },
  {
    id: "banas-dairy-forecasting",
    title: "BANAS Dairy Multi-Target Cooperative Forecasting",
    subtitle: "Enterprise supply-chain demand forecasting across milk, feed, and veterinary services",
    company: "Vivid Minds Technologies Ltd",
    period: "2025",
    category: "Time-Series & Econometrics",
    featured: false,
    badge: "MLOps & Supply Chain",
    repoUrl: null,
    repoStatus: "Source available on request",
    stats: [
      { label: "Historical Data", value: "2021–2025" },
      { label: "Target Variables", value: "3 Targets" },
      { label: "Orchestration", value: "Apache Airflow" },
      { label: "Registry", value: "MLflow" }
    ],
    tech: ["Python", "LightGBM", "Apache Airflow", "MLflow", "Pandas", "Docker"],
    highlights: [
      "Engineered a multi-target time-series platform predicting daily milk collection volumes, veterinary visit frequencies, and cattle feed requirements for BANAS dairy cooperative.",
      "Engineered seasonal rolling aggregates, weather interaction features, and holiday calendars across multi-year operational records.",
      "Deployed automated ML pipelines with Apache Airflow for scheduled DAG execution, and MLflow for hyperparameter experiment tracking, artifact versioning, and continuous model drift monitoring."
    ]
  },
  {
    id: "multidb-llm-router",
    title: "Multi-Database LLM Natural Language Query Router",
    subtitle: "Intelligent SQL routing across heterogeneous database schemas using Gemini & Qdrant",
    company: "Vivid Minds Technologies Ltd",
    period: "2025",
    category: "LLM & RAG",
    featured: false,
    badge: "Enterprise RAG",
    repoUrl: null,
    repoStatus: "Source available on request",
    stats: [
      { label: "Routing LLM", value: "Gemini-Flash" },
      { label: "Vector Index", value: "Qdrant DB" },
      { label: "Query Output", value: "Precise SQL" },
      { label: "Schema Alignment", value: "Zero-Shot" }
    ],
    tech: ["Gemini-Flash", "Qdrant", "Python", "SQL", "FastAPI", "Vector Similarity"],
    highlights: [
      "Built an intelligent multi-database routing engine enabling natural language querying across disparate enterprise database schemas.",
      "Integrated vector similarity search on schema metadata (RAG) with Gemini-Flash reasoning for automatic schema alignment and safe SQL generation.",
      "Eliminated manual query drafting for non-technical stakeholders in e-governance and network management environments."
    ]
  },
  {
    id: "meddetect-ai",
    title: "MedDetect AI: Two-Stage Medical Imaging Diagnostic App",
    subtitle: "Scan-type router + specialist CNNs for brain, chest, hand and knee images, served through a Streamlit upload app",
    company: "Academic Project",
    period: "2024",
    category: "Deep Learning & Vision",
    featured: false,
    badge: "Clinical Diagnostics",
    repoUrl: "https://github.com/Subramanyasai1411/MedDetect-AI",
    repoStatus: "Source available on request",
    stats: [
      { label: "Scan-Type Router", value: "99% val acc" },
      { label: "Specialist Models", value: "5 CNNs" },
      { label: "Hand Fracture", value: "98% test acc" },
      { label: "Brain Tumor Types", value: "Glioma / Meningioma / Pituitary" }
    ],
    tech: ["Python", "TensorFlow", "Keras", "ResNet50", "CNN", "OpenCV", "Streamlit", "scikit-learn"],
    highlights: [
      "Built a two-stage diagnostic pipeline: a 4-class ResNet50-based router identifies whether an upload is a brain, chest, hand or knee scan (about 99% validation accuracy), then dispatches it to the matching specialist model.",
      "Trained specialist classifiers for chest abnormality (about 90% val acc), hand fracture (about 98% test acc), knee disease (about 79% test acc) and brain tumor detection, plus a 4-class glioma / meningioma / pituitary / no-tumor model.",
      "Used transfer learning with ResNet50 and custom CNN stacks (Conv2D, BatchNorm, MaxPool, dense heads), with augmentation through Keras ImageDataGenerator and per-model input preprocessing in OpenCV.",
      "Shipped a Streamlit web app where a user uploads an X-ray or MRI image and gets the predicted scan type and condition without choosing a model manually."
    ]
  },
  {
    id: "slm-pretraining-lora",
    title: "SLM Pretraining & QLoRA Instruction Fine-Tuning",
    subtitle: "Ablation of custom attention mechanisms and fine-tuning Qwen & Gemini models",
    company: "Vivid Minds Technologies Ltd",
    period: "2025",
    category: "LLM & RAG",
    featured: false,
    badge: "Foundational LLM",
    repoUrl: null,
    repoStatus: "Source available on request",
    stats: [
      { label: "Fine-Tuning", value: "LoRA / QLoRA" },
      { label: "Models Tuned", value: "Qwen-0.5B, Gemini-3B" },
      { label: "Pretraining", value: "Custom SLM" },
      { label: "Task", value: "Q/A Generation" }
    ],
    tech: ["PyTorch", "Hugging Face Transformers", "LoRA", "QLoRA", "PEFT", "Accelerate"],
    highlights: [
      "Pretrained a small language model (SLM) from scratch, evaluating standard multi-head vs grouped-query attention mechanisms, tokenization efficiency, and perplexity curves.",
      "Fine-tuned Qwen-0.5B and Gemini-3B using parameter-efficient fine-tuning (PEFT/LoRA) on curated question-answer datasets with strict hallucination reduction benchmarks.",
      "Developed an end-to-end stock price forecasting pipeline for AAPL, Microsoft, and Google combining hybrid statistical and deep learning backends."
    ]
  }
];

export const skillsHierarchy = {
  "Generative AI & LLMs": {
    color: "purple",
    skills: [
      { name: "LLM Fine-Tuning (LoRA, QLoRA)", level: 94, tags: ["Qwen-0.5B", "Gemini-3B", "PEFT"] },
      { name: "LLM Pretraining & Attention Ablation", level: 88, tags: ["Transformers", "PyTorch"] },
      { name: "LLM Agents & Tool Use", level: 92, tags: ["Groq", "Ollama", "Autonomous Loops"] },
      { name: "Pydantic Schema Guards & Sanitizers", level: 96, tags: ["Structured Outputs", "Validation"] },
      { name: "Prompt Engineering & Instruction Tuning", level: 95, tags: ["Zero/Few-Shot", "CoT"] },
    ]
  },
  "Information Retrieval & RAG": {
    color: "cyan",
    skills: [
      { name: "Hybrid Search (Dense + BM25)", level: 96, tags: ["bge-m3", "Qdrant", "BM25"] },
      { name: "Reciprocal Rank Fusion (RRF)", level: 95, tags: ["Multi-Index Ranking"] },
      { name: "Cross-Encoder Reranking", level: 92, tags: ["Jina Reranker", "Latency Optimization"] },
      { name: "Multilingual OCR & Digit Repair", level: 90, tags: ["Tesseract", "PyMuPDF", "Devanagari/Gujarati"] },
      { name: "Vector Databases", level: 94, tags: ["QdrantDB", "ChromaDB"] },
    ]
  },
  "Time-Series & Econometrics": {
    color: "blue",
    skills: [
      { name: "Time-Series Forecasting", level: 96, tags: ["LightGBM", "statsmodels", "Prophet", "MSTL"] },
      { name: "Deep Forecasting Architectures", level: 90, tags: ["PatchTST", "NHITS", "Chronos"] },
      { name: "What-If & Scenario Analysis", level: 95, tags: ["4-Tier Routers", "Perturbations"] },
      { name: "Causal Testing & Attribution", level: 92, tags: ["Granger Causality", "VAR", "SHAP"] },
      { name: "Backtesting & Ensembling", level: 94, tags: ["Walk-Forward MASE", "Convex-Weights"] },
    ]
  },
  "Deep Learning & Computer Vision": {
    color: "rose",
    skills: [
      { name: "Generative Adversarial Networks (GANs)", level: 88, tags: ["UNet", "PatchGAN", "Attention"] },
      { name: "Convolutional Neural Networks (CNNs)", level: 92, tags: ["ResNet50", "Medical Imaging"] },
      { name: "Deep Learning Frameworks", level: 94, tags: ["PyTorch", "TensorFlow", "Keras"] },
      { name: "Model Explainability & Heatmaps", level: 90, tags: ["SHAP", "Feature Attribution"] },
    ]
  },
  "MLOps, Backend & Infrastructure": {
    color: "emerald",
    skills: [
      { name: "Production APIs", level: 95, tags: ["FastAPI", "Flask", "Pydantic"] },
      { name: "Interactive Data Dashboards", level: 92, tags: ["Dash", "Plotly", "Tailwind"] },
      { name: "Workflow Orchestration", level: 88, tags: ["Apache Airflow", "DAGs"] },
      { name: "Experiment Tracking & Registry", level: 90, tags: ["MLflow", "Model Versioning"] },
      { name: "Containerization & Databases", level: 92, tags: ["Docker", "SQL", "SQLite"] },
    ]
  }
};

export const careerTimeline = [
  {
    role: "AI/ML Engineer",
    type: "Intern → Full-Time",
    company: "Vivid Minds Technologies Ltd",
    period: "Apr 2025 – Present",
    location: "Hyderabad, India",
    highlight: "Architected Auto-Forecast autonomous 9-stage pipeline and Document Exact Trilingual RAG with 0 unverified numerical claims.",
    points: [
      "Designed and built Auto-Forecast: handles multi-million-row panel datasets across 1,115 stores, 14 model families, walk-forward backtests, and Pydantic-governed LLM agents.",
      "Engineered What-If Scenario Copilot with a 4-tier router, Granger causality attribution, and goal-seek solver declining ungrounded assertions.",
      "Created Document Exact RAG for English, Hindi, and Gujarati with bge-m3 + BM25 reciprocal rank fusion, cutting CPU reranking latency from 4+ min to ~6 s.",
      "Developed BANAS dairy cooperative multi-target forecasting pipeline orchestrated via Apache Airflow and MLflow.",
      "Implemented multi-database natural language query router with Gemini-Flash and Qdrant vector database."
    ]
  },
  {
    role: "Deep Learning Research Intern",
    type: "Research Internship",
    company: "Centre for AI and ML, Osmania University",
    period: "May 2024 – July 2024",
    location: "Hyderabad, India",
    highlight: "Built a conditional UNet + PatchGAN model with a contextual and pixel loss for face sketch-to-photo synthesis.",
    points: [
      "Engineered an image-to-image conditional GAN in Keras/TensorFlow with a UNet generator, PatchGAN discriminator and a combined contextual + pixel loss.",
      "Compared four pixel:contextual loss weightings and measured results with SSIM and L2-norm face verification.",
      "Conducted comparative experiments on loss weighting (L1 loss vs adversarial loss) to eliminate artifact blurring."
    ]
  },
  {
    role: "B.Tech Computer Science & Engineering",
    type: "Undergraduate Degree",
    company: "Osmania University",
    period: "Aug 2021 – May 2025",
    location: "Hyderabad, India",
    highlight: "CGPA: 9.18 / 10 | Percentage: 86.34% | First Class with Distinction",
    points: [
      "Core coursework in Machine Learning, Deep Learning, Natural Language Processing, Data Structures & Algorithms, and Distributed DBMS.",
      "Led technical project teams developing MedDetect AI and autonomous stock forecasting pipelines.",
      "Active member in academic computing forums and university AI research labs."
    ]
  }
];

export const creativeWork = {
  title: "Creative Writing & Analytical Storytelling",
  channel: "Movies4u",
  role: "Content Writer",
  platform: "YouTube",
  description: `Outside of engineering, I worked as a content writer for the YouTube film channel "Movies4u", researching and writing analytical scripts on films. Breaking a story down into its structure, themes, and pacing, then rewriting it as a clear, engaging script, built the same skill I use every day as an engineer: turning complex systems into explanations that people actually understand.`,
  pillars: [
    {
      title: "Structured Thinking",
      desc: "Breaking a complex plot into themes and beats is the same move as breaking a messy ML problem into clean, decoupled pipeline stages."
    },
    {
      title: "Writing for an Audience",
      desc: "Scripts have to work for people who weren't in the room. Same goes for system docs, reports, and stakeholder walkthroughs."
    },
    {
      title: "Attention to Detail",
      desc: "Spotting continuity slips in a film carries over directly to catching data leakage and edge cases in model validation."
    }
  ]
};
