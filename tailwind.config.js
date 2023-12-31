/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        mainGray: '#3A4750',
        mainDarkGray: '#303841',
        mainWhite: '#EEEEEE',
        mainRed: '#DF2121',
        validGreen: '#75EB18',
        errorRed: '#EB1818',
        warningYellow: '#EBD118',
      },
    },
  },
  plugins: [],
}