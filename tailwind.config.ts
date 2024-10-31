import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "azure-radiance": {
          "50": "#eff5ff",
          "100": "#dbe8fe",
          "200": "#bfd7fe",
          "300": "#93bbfd",
          "400": "#609afa",
          "500": "#3b82f6",
          "600": "#2570eb",
          "700": "#1d64d8",
          "800": "#1e55af",
          "900": "#1e478a",
          "950": "#172e54",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
