/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        ink2: '#0D0C0A',
        inkcard: '#1A1712',
        gold: '#E5A93C',
        golddeep: '#D4AF37',
        vermilion: '#C84B31',
        saffron: '#FF9F1C',
        cream: '#F5F0E6',
        sand: '#A8A090',
        stonewarm: '#6E6759',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        dev: ['"Tiro Devanagari Sanskrit"', '"Noto Serif Devanagari"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-rev': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.15', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(1.05)' },
        },
      },
      animation: {
        marquee: 'marquee 70s linear infinite',
        'spin-slower': 'spin 46s linear infinite',
        'spin-rev': 'spin-rev 62s linear infinite',
        'glow-pulse': 'glow-pulse 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
