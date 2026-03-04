/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8C00',
          dark: '#E67E00',
        },
        secondary: {
          DEFAULT: '#228B22',
          dark: '#1E7A1E',
        },
      },
    },
  },
  plugins: [],
}