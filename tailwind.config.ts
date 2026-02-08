import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f7ff",
          100: "#e5ecff",
          200: "#cdd8ff",
          300: "#a7bbff",
          400: "#7b95ff",
          500: "#4f6eff",
          600: "#3d55e6",
          700: "#2d3fc2",
          800: "#232f93",
          900: "#1f2a73"
        }
      }
    }
  },
  plugins: []
};

export default config;
