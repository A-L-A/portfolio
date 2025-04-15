/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        burtons: ["Burtons", "monospace"],
        cursive: ["Brush Script MT", "Brush Script Std", "cursive"],
      },
      colors: {
        brown: {
          DEFAULT: "#77503d",
          light: "#a37a6b",
          dark: "#5a3c2e",
        },
        beige: {
          DEFAULT: "#f9f3ef",
          light: "#fdfbf9",
          dark: "#e5dbd3",
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
};