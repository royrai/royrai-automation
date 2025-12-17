/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0FA4A0',
        secondary: '#f7ce46',
        background: '#FDFBF7',
        'text-dark': '#333333',
        'text-light': '#666666',
      },
      fontFamily: {
        heading: ['Secular One', 'sans-serif'],
        body: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
