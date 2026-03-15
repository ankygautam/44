/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0b0f1a',
        card: '#111827',
        accent: {
          cyan: '#22d3ee',
          purple: '#a855f7',
          blue: '#60a5fa'
        },
        text: '#e5e7eb'
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'sans-serif']
      },
      boxShadow: {
        glow: '0 10px 40px rgba(96, 165, 250, 0.35)'
      }
    }
  },
  plugins: []
};
