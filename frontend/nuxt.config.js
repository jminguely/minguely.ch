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
  server: {
    host: process.env.IP || '0.0.0.0',
    port: process.env.PORT || '3000',
  },
})
