/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mn:"375px",
      sm:"600px",
      md:"768px",
      lg:"900px",
      xl:"1280px",
      "1xl":"1440px",
      "2xl":"1536px",
      "3xl":"1636px",
      "4xl":"1728px",
      "5xl":"1920px"
    },
  },
  plugins: [],
}
