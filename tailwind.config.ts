import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        current: "currentColor",
        transparent: "transparent",
        black: "#121212",
        dark: "#000",
        primary: "#547C8C",
        yellow: "#FBB040",
        white: "#fdfdfd",
      },
    },
  },
  screens: {
    sm: "575px",
    md: "768px",
    lg: "992px",
  },
  plugins: [],
};
export default config;
