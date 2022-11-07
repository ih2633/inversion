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
          primary: "#b850e5",

          secondary: "#60f78d",

          accent: "#0e4f87",

          neutral: "#1B1622",

          "base-100": "#F4F5F6",

          info: "#70A9D2",

          success: "#35DE87",

          warning: "#995E05",

          error: "#F74B3B",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
