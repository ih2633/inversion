/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        "3xl": {
          css: {
            fontSize: "1.875rem",
            h1: {
              fontSize: "4rem",
              fontFamily: ["Montserrat", "sans-serif"],
            },
            p: {
              fontSize: "1.5rem",
              fontFamily: ["Roboto", "sans-serif"],
            },
            // ...
          },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#b850e5",

          secondary: "#169265",

          accent: "#9973f4",

          neutral: "#1B1622",

          "base-100": "#F4F5F6",

          info: "#70A9D2",

          success: "#218C80",

          warning: "#EDC954",

          error: "#F74B3B",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
