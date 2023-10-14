import { UseFetchOptions } from "nuxt/app";

export const useGet = async (
  url: string,
  params: any = {},
  opt?: UseFetchOptions<unknown, unknown>
) => {
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
    ...opt,
  });

  return {
    result: result as any,
    refresh,
    error,
    execute,
    pending,
  };
};
