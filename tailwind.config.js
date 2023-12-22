/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('flowbite/plugin'),
    require("daisyui")
  ],
  daisyui: {
    themes: ["light", "dark", "cmyk"],
    darkTheme: "dark",
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    themeRoot: ":root"
  },
}
