/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens:{
      'sm': {'max' : '500px'}
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    colors: {
      grey: "#f9f9f9",
      midnight: "#004953",
      spring: "#00F0A8",
      white: "#ffffff",
    },
    boxShadow: {
      normal: "0 0 24px 0 rgb(0 0 0 / 7%)",
    },
    backgroundImage: {
      image: 'url("./assets/images/pattern.png")',
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
