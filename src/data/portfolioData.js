export const portfolioData = {
  personal: {
    name: "DAKSH LALWANI",
    shortName: "DAKSH.L",
    title: "FULL-STACK WEB DEVELOPER",
    specialization: "FULL STACK DEVELOPER",
    location: "Bhopal, MP, India",
    college: "Lakshmi Narain College of Technology (LNCT), Bhopal",
    degree: "B.Tech, Computer Science (AIML)",
    graduation: "Sep 2024 – 2028",
    cgpa: "8.31 / 10",
    email: "dakshlalwani89@gmail.com",
    phone: "+91-7898068165",
    github: "https://github.com/Daks9h",
    githubUsername: "Daks9h",
    linkedin: "https://linkedin.com/in/dakshlalwani-374212308",
    resume: "/Daksh_Lalwani_Resume.pdf",
    status: "AVAILABLE_FOR_HIRE",
    languages: "English, Hindi",
    focus: "Full-Stack Web Dev & Applied AI/RAG",
    availability: "Full Time / Internship",
    summary: "B.Tech Computer Science (AIML) student at LNCT Bhopal who builds high-performance, full-stack web applications with the MERN stack and Python/FastAPI. Architected an end-to-end RAG study assistant with a Manifest V3 Chrome extension and a production role-based rental marketplace with JWT authentication. Experienced across startups, open-source programs, and backed by a strong Java & DSA foundation.",
    mission: "Engineering resilient, high-fidelity digital solutions with an emphasis on architectural clarity, database indexing, and user-centric fluidity. Bridging the gap between scalable full-stack software and cutting-edge retrieval-augmented generation pipelines.",
  },

  stats: {
    projectsCount: "3+",
    repositories: "15+",
    cgpa: "8.31",
    statusText: "OPERATIONAL",
    experienceYears: "2+",
    commitsTotal: "480+",
    currentStreak: "18 DAYS",
    bestDay: "32 COMMITS",
    leetcodeSolved: "260+",
    leetcodeEasy: "125",
    leetcodeMedium: "115",
    leetcodeHard: "20+",
  },

  skills: {
    marquee: [
      { category: "FRONTEND", name: "REACT.JS", level: "95%", icon: "Atom", color: "#38bdf8" },
      { category: "FRONTEND", name: "NEXT.JS", level: "88%", icon: "Globe", color: "#ffffff" },
      { category: "BACKEND", name: "NODE.JS", level: "90%", icon: "Server", color: "#22c55e" },
      { category: "BACKEND", name: "FASTAPI", level: "86%", icon: "Zap", color: "#06b6d4" },
      { category: "DATABASE", name: "MONGODB", level: "88%", icon: "Database", color: "#10b981" },
      { category: "AI / ML", name: "RAG PIPELINES", level: "88%", icon: "Cpu", color: "#a855f7" },
      { category: "AI / ML", name: "GROQ LLAMA 3.1", level: "90%", icon: "Brain", color: "#f59e0b" },
      { category: "VECTOR DB", name: "SUPABASE PGVECTOR", level: "84%", icon: "Layers", color: "#3b82f6" },
      { category: "CORE DSA", name: "JAVA & ALGORITHMS", level: "88%", icon: "Code2", color: "#ef4444" },
      { category: "STYLING", name: "TAILWIND CSS", level: "94%", icon: "Palette", color: "#38bdf8" },
    ],

    categories: [
      {
        title: "LANGUAGES",
        skills: ["Java", "Python", "C++", "JavaScript (ES6+)", "SQL", "HTML5", "CSS3"]
      },
      {
        title: "FRAMEWORKS & LIBRARIES",
        skills: ["React.js", "Next.js", "Node.js", "Express.js", "FastAPI", "Tailwind CSS", "EJS", "EmailJS"]
      },
      {
        title: "DATABASES & BACKEND",
        skills: ["MongoDB", "Supabase (PostgreSQL)", "pgvector", "Firebase", "REST APIs", "JWT Authentication", "Role-Based Access Control"]
      },
      {
        title: "AI & ML TOOLING",
        skills: ["Groq API (LLaMA 3.1)", "Sentence-Transformers", "Faster-Whisper", "RAG Pipelines", "Semantic Chunking"]
      },
      {
        title: "DEVELOPER TOOLS & PIPELINES",
        skills: ["Git", "GitHub", "Postman", "Figma", "FFmpeg", "Vercel", "Render", "npm", "VS Code", "Cloudinary Multer"]
      }
    ],

    allTools: [
      "React.js", "Next.js", "Node.js", "Express.js", "FastAPI", "Python", "Java", "C++",
      "JavaScript", "MongoDB", "Supabase", "pgvector", "PostgreSQL", "Firebase", "Tailwind CSS",
      "Groq API", "LLaMA 3.1", "Faster-Whisper", "FFmpeg", "Git", "GitHub", "Postman", "Figma",
      "Vercel", "Render", "JWT", "REST APIs"
    ]
  },

  projects: [
    {
      id: "PROJ_01",
      year: "2025 – 2026",
      title: "AI_STUDYMATE",
      subtitle: "Multimodal AI Study Assistant & Chrome Extension",
      category: "AI",
      tags: ["Python", "FastAPI", "Groq API (LLaMA 3.1)", "Faster-Whisper", "Sentence-Transformers", "Supabase pgvector", "Manifest V3", "FFmpeg"],
      description: "End-to-end RAG study platform and Manifest V3 Chrome extension providing interactive Q&A over YouTube lectures and local audio/video uploads. Features semantic chunking, vector retrieval in Supabase pgvector, and Groq-hosted LLaMA 3.1 synthesis with timestamp citations.",
      bullets: [
        "Built an end-to-end RAG study platform and Manifest V3 Chrome extension for interactive Q&A over YouTube lectures and uploaded video/audio files.",
        "Engineered a transcription and ingestion pipeline using FFmpeg and faster-whisper for local media, and the YouTube Transcript API for streamed lectures.",
        "Implemented semantic chunking and vector search with Sentence-Transformers embeddings stored in Supabase pgvector for context-aware retrieval.",
        "Integrated Groq-hosted LLaMA 3.1 to generate answers with timestamp-linked citations that jump video playback to the referenced segment; added auto-graded quizzes and flashcards."
      ],
      workflowSteps: [
        { step: "01", name: "Media Ingestion", detail: "FFmpeg audio extraction for local files & YouTube Transcript API parsing for stream feeds" },
        { step: "02", name: "High-Speed Transcription", detail: "Local faster-whisper model runs speech-to-text with precise segment timecodes" },
        { step: "03", name: "Vector Indexing", detail: "Sentence-Transformers semantic chunking stored in Supabase pgvector embedding indexes" },
        { step: "04", name: "RAG Synthesis", detail: "Groq LLaMA 3.1 context injection producing answers with timestamp video jumps & quizzes" }
      ],
      liveDemo: "https://github.com/Daks9h",
      github: "https://github.com/Daks9h",
      imagePlaceholderColor: "from-cyan-900/60 to-blue-900/60"
    },
    {
      id: "PROJ_02",
      year: "2025",
      title: "HOMIFY",
      subtitle: "House Rental & Property Marketplace",
      category: "FULLSTACK",
      tags: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Cloudinary", "Multer", "REST APIs"],
      description: "Full-stack MERN marketplace connecting property owners and tenants directly, featuring multi-parameter property search, 3-role JWT access control (Renter, Owner, Admin), Multer-to-Cloudinary memory streaming, and tenancy verification pipelines.",
      bullets: [
        "Built a full-stack MERN marketplace connecting property owners and tenants directly, with multi-parameter search and filters (location, BHK, rent/sale, budget) and a saved wishlist.",
        "Implemented 3-role access control (Renter, Owner, Admin) using JWT stateless authentication, bcrypt password hashing, and custom route-protection middleware.",
        "Built an image upload pipeline with Multer memory storage and Cloudinary streaming APIs, eliminating local disk writes.",
        "Developed a booking workflow in which owners approve/reject tenancy requests, with an admin panel to audit user activity and verify ownership."
      ],
      workflowSteps: [
        { step: "01", name: "Stateless Security", detail: "Bcrypt hash password storage + JWT cookie token with role guard middleware" },
        { step: "02", name: "Multi-Filter Query Engine", detail: "Compound indexed MongoDB aggregations for BHK, pricing range, and geo-locality" },
        { step: "03", name: "Zero-Disk Upload Stream", detail: "Multer RAM buffer directly piped into Cloudinary asset CDN transformations" },
        { step: "04", name: "Tenancy Lifecycle", detail: "Owner booking approval protocol coupled with administrative permission auditing" }
      ],
      liveDemo: "https://github.com/Daks9h",
      github: "https://github.com/Daks9h",
      imagePlaceholderColor: "from-blue-900/60 to-purple-900/60"
    },
    {
      id: "PROJ_03",
      year: "2024 – 2025",
      title: "SAFAL_DARSHAN",
      subtitle: "Temple Tourism & Darshan Guidance Platform",
      category: "FULLSTACK",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Tailwind CSS"],
      description: "Full-stack pilgrimage and temple guidance portal delivering comprehensive schedules, darshan booking details, and transit information. Features indexed database queries, validated Express REST endpoints, and a component-based reactive frontend.",
      bullets: [
        "Developed a full-stack MERN application providing pilgrimage guidance, temple schedules, ritual booking details, and transit information.",
        "Designed MongoDB schemas with indexed queries for temple histories, darshan timings, and pooja offerings; built Node.js/Express REST APIs with input validation and error-handling middleware.",
        "Built a component-based React frontend with dynamic search, category filtering, and responsive mobile-first layouts."
      ],
      workflowSteps: [
        { step: "01", name: "Schema Optimization", detail: "MongoDB collections indexed for fast query lookups across deities, routes, and poojas" },
        { step: "02", name: "REST Endpoint Architecture", detail: "Express controllers with payload sanitization and comprehensive error interceptors" },
        { step: "03", name: "Interactive Client State", detail: "React component architecture with real-time category filtering and dynamic search" },
        { step: "04", name: "Transit & Schedule Engine", detail: "Structured itinerary timeline with responsive route and pooja booking guidance" }
      ],
      liveDemo: "https://github.com/Daks9h",
      github: "https://github.com/Daks9h",
      imagePlaceholderColor: "from-amber-900/60 to-cyan-900/60"
    }
  ],

  experience: [
    {
      id: "LOG_01",
      period: "MAY 2026 – PRESENT",
      role: "FULL_STACK_ENGINEER (MERN)",
      organization: "ISA-India",
      status: "ACTIVE_OPERATION",
      tags: ["MERN", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
      description: "Architecting and scaling core MERN stack web applications. Designing performant, indexed database schemas, crafting modular React interfaces, and integrating secure API services."
    },
    {
      id: "LOG_02",
      period: "APR 2026 – JUN 2026",
      role: "WEB_DEVELOPER",
      organization: "Wedeption",
      status: "COMPLETED",
      tags: ["React.js", "Firebase", "Supabase", "Tailwind CSS"],
      description: "Developed full-stack features for a vendor-discovery platform supporting vendor search and user interaction. Integrated frontend components with Firebase and Supabase to manage application data flow. Collaborated with the KLIC LNCT Bhopal team to design, test, and deploy product features."
    },
    {
      id: "LOG_03",
      period: "NOV 2025 – JAN 2026",
      role: "OPEN_SOURCE_CONTRIBUTOR",
      organization: "Code Social",
      status: "COMPLETED",
      tags: ["React.js", "JavaScript", "Git", "GitHub", "UI/UX"],
      description: "Contributed to collaborative open-source web platforms, resolved interface inconsistencies, optimized component modularity, and refined code standards through peer pull requests."
    },
    {
      id: "LOG_04",
      period: "SEP 2025 – NOV 2025",
      role: "FRONTEND_DEVELOPER",
      organization: "Edunet Foundation",
      status: "COMPLETED",
      tags: ["HTML5", "CSS3", "JavaScript", "React.js", "REST APIs"],
      description: "Built responsive React.js UI components for consistent use across devices. Integrated APIs and managed application state to implement interactive features. Fixed bugs and refined interface usability with teammates."
    }
  ],

  academic: [
    { label: "DEGREE", value: "B.Tech Computer Science (AIML)" },
    { label: "INSTITUTION", value: "Lakshmi Narain College of Technology (LNCT), Bhopal" },
    { label: "TENURE", value: "Sep 2024 – 2028" },
    { label: "ACADEMIC_RECORD", value: "8.31 / 10 CGPA" },
    { label: "CORE_FOCUS", value: "Data Structures, Algorithms (Java), AI & ML" }
  ],

  certifications: [
    { title: "NPTEL Java Certification", issuer: "NPTEL / IIT", type: "Core Foundation" },
    { title: "Postman API Fundamentals Student Expert", issuer: "Postman", type: "API Architecture" },
    { title: "JavaScript Foundations", issuer: "Mozilla", type: "Web Standards" },
    { title: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn", type: "AI Systems" },
    { title: "GenAI Study Jams", issuer: "Google Cloud / GDSC", type: "Applied ML" }
  ],

  activities: [
    { role: "Administrative Team Member", entity: "E-Cell LNCTS", focus: "Entrepreneurship & Ecosystem Coordination" },
    { role: "Casting Director", entity: "LNCT Ensemble", focus: "Art & Drama Club" }
  ]
};
