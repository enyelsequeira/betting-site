/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['Sora', 'sans-serif'],
        body: ['Caudex', 'serif'],
      },
      colors: {
        primary: {
          bg: '#060714',
        },
      },
      backgroundImage: {
        hero: "url('/bg-svg')",
      },
      gridTemplateRows: {
        layout: 'repeat(auto-fit, minmax(0, 200px))',
      },
    },
  },
  variants: {
    stroke: [],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
