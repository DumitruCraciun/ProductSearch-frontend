/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        meadow: {
          green: '#2D5A3F',
          'green-light': '#3D7A55',
          yellow: '#FFC107',
          'yellow-hover': '#E6A800',
          gray: '#F2F2F2',
          'gray-border': '#E5E5E5',
        }
      },
    },
  },
  plugins: [],
};