/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF8F1",
          100: "#FFE9D9",
          200: "#FFD1AC",
          300: "#FFB97F",
          400: "#FFA052",
          500: "#FF8A25",
          600: "#DB6D0E",
          700: "#B54F00",
          800: "#913F00",
          900: "#6E2F00",
        },
        secondary: {},
        tertiary: {},
        dark: {},
        light: {},
        success: {},
        warning: {},
        danger: {},
        info: {},
      },
      fontFamily: {
        sans: [],
        serif: [],
        mono: [],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
}
