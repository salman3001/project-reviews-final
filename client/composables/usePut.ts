export const usePut = async (url: string, body: any = {}, params: any = {}) => {
  const { $api } = useNuxtApp();
  const token = useCookie("token");
  let result: any = null;
  let error: any = null;

  try {
    const res = await $fetch($api + url, {
      method: "put",
      headers: { Authorization: `Bearer ${token.value}` },
      body,
      params: { ...params },
    });

    result = res;
  } catch (err) {
    error = (err as any).data;
  }

  return {
    result,
    error,
  };
};
