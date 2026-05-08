import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#080808',
        charcoal: '#111111',
        ember: '#C84B31',
        amber: '#D4813A',
        gold: '#C9A84C',
        'gold-light': '#E8C76A',
        cream: '#F5EDD7',
        ash: '#2A2A2A',
        smoke: '#1A1A1A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'ember-gradient': 'radial-gradient(ellipse at center, #C84B31 0%, #8B2010 60%, transparent 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C76A 50%, #C9A84C 100%)',
        'luxury-gradient': 'linear-gradient(180deg, #080808 0%, #111111 50%, #080808 100%)',
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,75,49,0.15) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'scroll-hint': 'scrollHint 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        scrollHint: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(12px)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'snap': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
}

export default config
