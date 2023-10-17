const unique = async (
  node: FormKitNode,
  url: string,
  field: string,
  skipValue: string
) => {
  const { $api } = useNuxtApp();
  const token = useCookie("token");

  if (node.value == skipValue) {
    return true;
  } else {
    try {
      const res = await $fetch($api + url, {
        headers: { Authorization: `Bearer ${token.value}` },
        params: {
          field,
          value: node.value,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
};

// override default rule behaviors for your custom rule
// uniqueEmail.blocking = false;
// uniqueEmail.skipEmpty = false;
unique.debounce = 500; // milliseconds
// uniqueEmail.force = true;

export default unique;
