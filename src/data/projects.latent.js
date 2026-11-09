import { portfolioData } from './portfolioData';

const latentMetadata = {
  PROJ_01: {
    domain: 'ML',
    clusterName: 'Machine Learning & RAG',
    x: 0.24,
    y: 0.36,
    confidence: '99.1%',
    latency: '< 85ms',
    pipeline: 'Whisper + pgvector + Groq'
  },
  PROJ_02: {
    domain: 'WEB',
    clusterName: 'Full-Stack Architecture',
    x: 0.76,
    y: 0.36,
    confidence: '98.5%',
    latency: '< 120ms',
    pipeline: 'MERN + JWT RBAC'
  },
  PROJ_03: {
    domain: 'WEB',
    clusterName: 'Full-Stack Architecture',
    x: 0.84,
    y: 0.62,
    confidence: '97.8%',
    latency: '< 110ms',
    pipeline: 'React + Node + Mongo'
  },
  PROJ_04: {
    domain: 'ML',
    clusterName: 'Machine Learning & RAG',
    x: 0.38,
    y: 0.54,
    confidence: '98.2%',
    latency: '< 60ms',
    pipeline: 'Manifest V3 + FastAPI'
  },
  PROJ_05: {
    domain: 'WEB',
    clusterName: 'Full-Stack Architecture',
    x: 0.66,
    y: 0.76,
    confidence: '99.4%',
    latency: '16ms (60 FPS)',
    pipeline: 'React 19 + Canvas Engine'
  },
  PROJ_06: {
    domain: 'SYSTEMS',
    clusterName: 'Systems & Algorithmic Rigor',
    x: 0.28,
    y: 0.82,
    confidence: '99.7%',
    latency: 'O(log N) Avg',
    pipeline: 'Java + Fast Structures'
  }
};

const additionalNodes = [
  {
    id: 'PROJ_04',
    title: 'CHROME_EXT_RAG',
    domain: 'ML',
    clusterName: 'Machine Learning & RAG',
    stack: ['Manifest V3', 'JavaScript', 'FastAPI'],
    x: 0.38,
    y: 0.54,
    href: 'https://github.com/Daks9h',
    blurb: 'In-browser interactive RAG assistant with timestamp video citations.',
    confidence: '98.2%',
    latency: '< 60ms',
    pipeline: 'Manifest V3 + FastAPI'
  },
  {
    id: 'PROJ_05',
    title: 'PORTFOLIO_OS',
    domain: 'WEB',
    clusterName: 'Full-Stack Architecture',
    stack: ['React 19', 'Tailwind', 'Canvas API'],
    x: 0.66,
    y: 0.76,
    href: '#about',
    blurb: 'High-performance developer HUD with custom canvas visualizations.',
    confidence: '99.4%',
    latency: '16ms (60 FPS)',
    pipeline: 'React 19 + Canvas Engine'
  },
  {
    id: 'PROJ_06',
    title: 'DSA_ALGO_SUITE',
    domain: 'SYSTEMS',
    clusterName: 'Systems & Algorithmic Rigor',
    stack: ['Java', 'Algorithms', 'Data Structures'],
    x: 0.28,
    y: 0.82,
    href: 'https://github.com/Daks9h',
    blurb: '260+ optimized algorithmic solutions focusing on time-space efficiency.',
    confidence: '99.7%',
    latency: 'O(log N) Avg',
    pipeline: 'Java + Fast Structures'
  }
];

const baseProjects = (portfolioData.projects || []).map((p) => {
  const meta = latentMetadata[p.id] || {
    domain: 'WEB',
    clusterName: 'Full-Stack Architecture',
    x: 0.5,
    y: 0.5,
    confidence: '98.0%',
    latency: '< 100ms',
    pipeline: 'React + Node.js'
  };
  return {
    id: p.id,
    title: p.title,
    domain: meta.domain,
    clusterName: meta.clusterName,
    stack: p.tags.slice(0, 4),
    x: meta.x,
    y: meta.y,
    href: p.github || 'https://github.com/Daks9h',
    blurb: p.subtitle || p.description.slice(0, 80) + '...',
    confidence: meta.confidence,
    latency: meta.latency,
    pipeline: meta.pipeline
  };
});

export const latentProjects = [...baseProjects, ...additionalNodes];

export const domainClusters = [
  { name: 'ML', labelX: 0.24, labelY: 0.20 },
  { name: 'WEB', labelX: 0.78, labelY: 0.22 },
  { name: 'SYSTEMS', labelX: 0.22, labelY: 0.92 }
];
