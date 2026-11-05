import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: {
      ink: "#172033",
      muted: "#748096",
      brand: "#5B5CE2",
      lavender: "#F0F0FF",
      canvas: "#F7F8FC"
    },
    boxShadow: {
      soft: "0 12px 40px rgba(31, 41, 75, 0.07)"
    }
  }},
  plugins: [],
};
export default config;
