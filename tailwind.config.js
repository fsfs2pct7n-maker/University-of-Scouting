/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#cfb991',
        'primary-dark': '#b39b77',
        'primary-light': '#e8dcc5',
        text: '#333333',
        'text-light': '#666666',
        'text-muted': '#999999',
        background: '#ffffff',
        warning: '#F68B7C',
        gray: '#808080',
        'light-gray': '#f5f5f5',
      },
    },
  },
  plugins: [],
}

