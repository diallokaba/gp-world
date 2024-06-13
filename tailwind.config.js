  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ["./index.php", "./templates/**/*.php", "./node_modules/flowbite/**/*.js"],
    theme: {
      extend: {
        colors: {
          'custom-blue-sky': '#EBF5F6',
          'custom-blue-sky-200': '#1B3944',
          danger: "#FF6363",
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
      require('flowbite/plugin')
    ],
  }

