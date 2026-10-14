import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0c0b12",
        panel: "#171521",
        accent: "#b7f36b",
        lilac: "#b9a2ff",
      },
      boxShadow: {
        glow: "0 0 40px rgba(185,162,255,.15)",
      },
    },
  },
  plugins: [],
};

export default config;
