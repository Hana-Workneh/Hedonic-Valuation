/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx,vue}', // Include Vue files
    './src/components/HedonicInput.vue', // Add the path to HedonicInput.vue
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans'], // Change 'Nunito' to the desired font
      },
      colors: {
        primary: '#3490dc', // Customize your color palette
      },
    },
  },
  plugins: [],
}

