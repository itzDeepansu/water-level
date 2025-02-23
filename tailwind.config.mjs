/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        jetbr: ["var(--font-jetbrainsmono)"],
        geist: ["var(--font-geist-sans)"],
      },
      keyframes: {
        revealTopToBottom: {
          "0%": { "clip-path": "inset(0 0 100% 0)" },
          "100%": { "clip-path": "inset(0 0 0 0)" },
        },
        pulseCustom: {
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        revealTopToBottom: "revealTopToBottom 6s ease-out forwards , pulseCustom 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
