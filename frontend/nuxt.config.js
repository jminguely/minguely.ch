export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo", "@nuxt/image-edge"],

  app: {
    head: {
      link: [
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/geomanist-black-webfont.woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/geomanist-book-webfont.woff2',
          crossorigin: 'anonymous',
        },
      ],
    },
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
