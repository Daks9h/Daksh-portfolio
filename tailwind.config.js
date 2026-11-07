/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#07090e',
          card: '#0d111a',
          surface: '#111622',
          cyan: '#06b6d4',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          emerald: '#10b981',
          border: 'rgba(255, 255, 255, 0.08)',
          muted: '#94a3b8',
          dim: '#64748b',
        }
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', '-apple-system', 'sans-serif'],
        science: ['"Science Gothic"', 'system-ui', 'sans-serif'],
        gothic: ['"Science Gothic"', 'system-ui', 'sans-serif'],
        display: ['"Science Gothic"', 'system-ui', 'sans-serif'],
        orbitron: ['"Science Gothic"', 'system-ui', 'sans-serif'],
        rajdhani: ['"Science Gothic"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 10px 25px -5px rgba(6, 182, 212, 0.25)',
        'glow-cyan-lg': '0 15px 35px -5px rgba(6, 182, 212, 0.35)',
        'glow-blue': '0 10px 25px -5px rgba(59, 130, 246, 0.25)',
        'glow-purple': '0 10px 25px -5px rgba(139, 92, 246, 0.25)',
        'soft-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
