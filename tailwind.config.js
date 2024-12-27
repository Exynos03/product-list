/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Work Sans", "sans-serif"],
      },
      screens: {
        cr: { min: "760px", max: "1500px" },
      },
    },
  },
  plugins: [],
};
