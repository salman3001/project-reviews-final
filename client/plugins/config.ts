export default defineNuxtPlugin(() => {
  const api = useRuntimeConfig().public.api as string;

  return {
    provide: {
      api,
    },
  };
});
