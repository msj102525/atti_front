/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBrown: "#5E3229",
      },
    },
    // height: {
    //   '128': '32rem', // 32rem (512px)
    //   '144': '36rem', // 36rem (576px)
    //   '160': '40rem', // 40rem (640px)
    //   '192': '48rem', // 48rem (768px)
    //   '256': '64rem', // 64rem (1024px)
    // },
  },
  plugins: [],
};
