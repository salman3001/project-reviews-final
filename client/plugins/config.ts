export default defineNuxtPlugin(() => {
  const { api, uploads } = useRuntimeConfig().public;

  return {
    provide: {
      api,
      uploads,
    },
  };
});
