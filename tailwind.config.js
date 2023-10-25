/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx,vue}', // Include Vue files
    './src/components/HedonicInput.vue', // Add the path to HedonicInput.vue
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

