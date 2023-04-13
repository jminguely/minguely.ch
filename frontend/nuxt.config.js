import gql from "@rollup/plugin-graphql"

export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo'],

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://api.minguely.ch/graphql'
      }
    },
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
