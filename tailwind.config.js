/** @type {import('tailwindcss').Config} */
const { baseColors } = require('./src/assets/theme/base-theme');
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ...baseColors.colors,
      },
    },
  },
  plugins: [],
};
