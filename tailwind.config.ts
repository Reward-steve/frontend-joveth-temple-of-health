// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "50%": { transform: "translateX(4px)" },
          "75%": { transform: "translateX(-4px)" },
        },
        fade: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shake: "shake 0.3s ease-in-out",
        fade: "fade 0.5s ease-out forwards",
      },
      colors: {
        dark: {
          primary: "#3f83f8",
          secondary: "#0f0f0f",
        },
        light: {
          primary: " #1e9ef4",
          secondary: "#8e8e93",
        },
        error: "red",
      },
    },
  },
  plugins: [],
};
