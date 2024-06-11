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
      typography: {
        // 새로운 클래스 정의
        'after': {
          content: "''",
          display: 'block',
          width: '100%',
          height: '1px',
          backgroundColor: 'gray',
        },
      },
    },
  },
  plugins: [],
};
