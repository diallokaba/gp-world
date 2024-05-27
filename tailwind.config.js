/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.php", "./templates/partial/*.php"],
  theme: {
    extend: {
      colors: {
        'custom-blue-sky': '#EBF5F6',
        'custom-blue-sky-200': '#1B3944'
      },
      width: {
        '160': '40rem'
      },
      fontFamily: {
        nunito: ["Nunito"]
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

