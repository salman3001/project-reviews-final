const uniqueEmail = async (node: FormKitNode, user: string) => {
  const { $api } = useNuxtApp();
  const token = useCookie("token");
  const api =
    user === "admin"
      ? $api + "/admin/unique-email"
      : user === "user"
      ? $api + "/user/unique-email"
      : "";

  try {
    const res = await $fetch(api, {
      headers: { Authorization: `Bearer ${token.value}` },
      params: {
        email: node.value,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

// override default rule behaviors for your custom rule
// uniqueEmail.blocking = false;
// uniqueEmail.skipEmpty = false;
uniqueEmail.debounce = 1000; // milliseconds
// uniqueEmail.force = true;

export default uniqueEmail;
