export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo", "@nuxt/image-edge"],

  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://api.minguely.ch/graphql",
      },
    },
  },

  css: ["~/assets/css/main.css"],

  image: {
    strapi: {
      baseURL: "https://api.minguely.ch/",
    },
  },

  vite: {
    compilerOptions: {
      isCustomElement: true,
    },
  },

  postcss: {
    plugins: {
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: true,
});
