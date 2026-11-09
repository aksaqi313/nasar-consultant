/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Color Palette ───────────────────────────────────────
      colors: {
        navy: {
          DEFAULT: '#1e3163',
          50:  '#f0f4fb',
          100: '#dce6f5',
          200: '#b9cceb',
          300: '#8aaad9',
          400: '#5c85c4',
          500: '#3b65b0',
          600: '#2c4f96',
          700: '#253f7a',
          800: '#1e3163',   // primary navy
          900: '#172448',
          950: '#0f1830',   // darkest navy
        },
        gold: {
          DEFAULT: '#C9A84C',   // primary gold
          300: '#e8c96e',
          400: '#d9b55a',
          500: '#C9A84C',
          600: '#a8873a',
          700: '#876829',
        },
      },

      // ── Typography ──────────────────────────────────────────
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
      },

      // ── Spacing / Sizing ────────────────────────────────────
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },

      // ── Box Shadow ──────────────────────────────────────────
      boxShadow: {
        navy:  '0 4px 24px rgba(30, 49, 99, 0.18)',
        gold:  '0 4px 24px rgba(201, 168, 76, 0.25)',
        card:  '0 2px 12px rgba(0,0,0,0.07)',
        'card-hover': '0 8px 32px rgba(30,49,99,0.14)',
      },

      // ── Animation ───────────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in':  'fade-in 0.6s ease both',
        'slide-up': 'slide-up 0.6s ease both',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
