import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#07090d",
        panel: "#0f141d",
        line: "#1a2332",
        glow: "#6de4ff",
        anatomy: "#7dd3fc",
        pharm: "#c4b5fd",
        pathology: "#fca5a5",
        vocab: "#86efac",
        review: "#facc15",
      },
      boxShadow: {
        soft: "0 20px 80px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        grid: "radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "18px 18px",
      },
    },
  },
  plugins: [heroui()],
};
