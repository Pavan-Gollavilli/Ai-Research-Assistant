/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      boxShadow: {
        card:       '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        'card-hover': '0 10px 30px -5px rgb(37 99 235 / 0.12), 0 4px 6px -4px rgb(0 0 0 / 0.07)',
        modal:      '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner-brand': 'inset 0 1px 0 0 rgb(255 255 255 / 0.1)',
      },
      borderRadius: {
        card: '1rem',
        btn:  '0.625rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.35s ease forwards',
        'fade-in':    'fadeIn 0.25s ease forwards',
        'scale-in':   'scaleIn 0.2s ease forwards',
        shimmer:      'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-brand':     'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
        'gradient-brand-soft':'linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)',
      },
    },
  },
  plugins: [],
};