/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#8b5cf6",

          secondary: "#10b981",

        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
