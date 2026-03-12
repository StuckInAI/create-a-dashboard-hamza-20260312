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
        sidebar: {
          DEFAULT: '#1e2433',
          hover: '#2a3347',
          active: '#3b4a6b',
        },
      },
    },
  },
  plugins: [],
};
