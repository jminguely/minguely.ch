import gql from "@rollup/plugin-graphql"

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/strapi'
  ],
  runtimeConfig: {
    public: {
      strapi: {
        url: 'http://localhost:1337' // can be overridden by NUXT_PUBLIC_STRAPI_URL environment variable
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
  }
})
