export const useGet = async (url: string, params: any = {}) => {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  const {
    data: result,
    error,
    refresh,
    pending,
    execute,
  } = await useFetch($api + url, {
    headers: { Authorization: `Bearer ${token.value}` },
    params: { ...params },
  });

  return {
    result: result as any,
    refresh,
    error,
    execute,
    pending,
  };
};
