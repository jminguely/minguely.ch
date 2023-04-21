/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      aspectRatio: {
        cine: "2.35 / 1",
      },
      transitionDuration: {
        3000: "3000ms",
      },
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
        mono: ['"Space+Mono"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
