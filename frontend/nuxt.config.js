import gql from "@rollup/plugin-graphql"

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/strapi'
  ],
  runtimeConfig: {
    public: {
      strapi: {
        url: 'https://api.minguely.ch'
      },
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [gql()]
  },
})
