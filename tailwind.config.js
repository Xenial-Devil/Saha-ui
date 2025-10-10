/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: `var(--color-primary)`,
        secondary: `var(--secondary-color)`,
        accent: `var(--accent-color)`,
        background: `var(--background)`,
        text: `var(--text)`,
        teal: "#62f0c0",
        peach: "#f0c062",
        salmon: "#f0a292",
        coral: "#f0d292",
        turquoise: "#62f0f0",
        limeGreen: "#d6f092"
      },
    },
  },
  plugins: [],
}

