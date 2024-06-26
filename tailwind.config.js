/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBrown: "#BC6C25",
        customBrown2: "#DDA15E",
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
