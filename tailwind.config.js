/** @type {import('tailwindcss').Config} */
const { height } = require('@fortawesome/free-brands-svg-icons/fa42Group');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      height: {
        128: '40rem',
      },
      colors: {
        'own-dark': '#776552',
        'own-medium-dark': '#97795B',
        'own-brown-gray': '#A29589',
        'own-gray': '#CCCC6',
        'own-light': '#E8E4DE',
      },
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      0.5: '0.5px',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
