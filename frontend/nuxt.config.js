export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo", "@nuxt/image-edge"],

  buildModules: [
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      'Space+Mono': true,
      Rubik: {
        wght: [100 + '..' + 900],
        ital: [100 + '..' + 900],
      },
    }
  },

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
