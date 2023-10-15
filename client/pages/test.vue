<script setup lang="ts">
const { $api } = useNuxtApp();
const res = ref(null);
const token = useCookie("token");

const f = async () => {
  const { data } = await useFetch($api + "/admin-users", {
    headers: { Authorization: "Bearer" + " " + token.value },
    params: {
      search: {
        first_name: "",
        last_name: "",
      },
      page: 1,
      populate: {
        role: {
          populate: {
            AdminUser: {
              fields: ["first_name"],
              populate: {
                role: {},
              },
            },
          },
        },
        social: {
          fields: ["id", "facebook"],
        },
        address: {},
      },
      orderBy: {
        first_name: "esc",
      },
      filter: {
        isActive: false,
      },
      relationFilter: {
        role: {
          field: "name",
          value: "Vender",
        },
      },
    },
  });
  res.value = data.value;
};
</script>
<template>
  <button @click="f">get</button>
  <!-- <div>{{ res }}</div> -->
  <li v-for="field in res?.data">
    {{ field.first_name + " " + field.last_name }}
  </li>
</template>
