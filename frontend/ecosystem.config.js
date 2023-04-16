module.exports = {
  apps: [
    {
      name: "nuxt",
      exec_mode: "cluster",
      instances: 1, // Or a number of instances
      script: "./.output/server/index.mjs",
      // env: {
      //   NITRO_HOST: "127.0.0.1",
      //   NITRO_PORT: 8109
      // }
    },
  ],
};
