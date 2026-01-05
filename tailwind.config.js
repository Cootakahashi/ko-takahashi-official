/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        gold: '#D4AF37',
        'gold-light': '#F4CF57',
        'gold-dim': '#8A7018',
        sumi: '#1a1a1a', // Ink black
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        jp: ['"Noto Serif JP"', 'serif'],
      },
      backgroundImage: {
        'ink-wash': 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%)',
      }
    },
  },
  plugins: [],
}