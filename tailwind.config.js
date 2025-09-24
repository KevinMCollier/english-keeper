/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'orange':       '#ea6f29',
        'caramel':      '#C7883B',
        'lemon':        '#F5D58A',
        'off-white':    '#FDFCF7',
        'creme':        '#FFF9F0'
      },

      /* —— add this block —— */
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
