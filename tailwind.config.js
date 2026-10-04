/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#309689',
          dark: '#267a6f',
          light: '#ebf5f4',
          soft: 'rgba(48, 150, 137, 0.1)',
        },
        muted: '#6c757d',
      },
      boxShadow: {
        card: '0px 3px 4px rgba(48, 150, 137, 0.08)',
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
