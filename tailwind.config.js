/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Share Tech Mono"', 'monospace'],
        orbitron: ['"Orbitron"', 'sans-serif'],
      },
      colors: {
        cyber: {
          bg: '#080c14',
          panel: '#0d1525',
          border: '#1a3a5c',
          accent: '#00d4ff',
          danger: '#ff4060',
          green: '#00ff88',
          dim: '#4a6a8a',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-1px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
          '100%': { transform: 'translate(0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(0,212,255,0.3)',
        'cyber-danger': '0 0 20px rgba(255,64,96,0.3)',
        'cyber-green': '0 0 20px rgba(0,255,136,0.3)',
      },
    },
  },
  plugins: [],
}
