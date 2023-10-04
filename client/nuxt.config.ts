// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-icon", "@pinia/nuxt", "@tailvue/nuxt", "@vueuse/nuxt"],
  runtimeConfig: {
    public: {
      api: "http://127.0.0.1:3333/api",
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
