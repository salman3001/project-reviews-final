<script setup lang="ts">
import useAddressStore from "~/store/useAddressStore";
import castNumber from "~/lib/formkit/plugins/castToNumber";

definePageMeta({
  layout: "admin-layout",
});

const route = useRoute();

const { $api, $event, $uploads } = useNuxtApp();
const token = useCookie("token");

const address = useAddressStore();

const { data: roles } = await useFetch($api + "/roles", {
  headers: { Authorization: `Bearer ${token.value}` },
  transform: (v: any) => v.roles,
});

const { data: user } = await useFetch(
  $api + "/admin-users/" + route.params.id,
  {
    headers: { Authorization: `Bearer ${token.value}` },
    transform: (v: any) => v.user,
  }
);

const updateUser = async (values: any) => {
  const formData = new FormData();

  formData.append("image", values?.image);
  formData.append("isActive", values?.isActive);
  formData.append("roleId", values?.roleId);
  values.user &&
    Object.entries(values.user).map((val) => {
      formData.append(`user[${val[0]}]`, values?.user[val[0]]);
    });

  values?.address &&
    Object.entries(values.address).map((val) => {
      formData.append(`address[${val[0]}]`, values?.address[val[0]]);
    });

  values?.social &&
    Object.entries(values.social).map((val) => {
      formData.append(`social[${val[0]}]`, values?.social[val[0]]);
    });

  try {
    const res = (await $fetch($api + "/admin-users/" + user.value.id, {
      body: formData,
      headers: { Authorization: `Bearer ${token.value}` },
      method: "put",
    })) as any;
    $event("user:updated");
    navigateTo("/admin/admin-users");
  } catch (error: any) {
    console.log(error.message);
  }
};
</script>

<template>
  <section class="mt-8 mb-16">
    <div class="flex items-center gap-4">
      <NuxtLink href="/admin/admin-users">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </NuxtLink>
      <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold">Add User</h1>
        <p class="text-base-400 text-sm" id="click">Add user details</p>
      </div>
    </div>
    <FormKit
      type="form"
      #default="{ value }"
      @submit="updateUser"
      :value="{
        roleId: user?.role_id || '',
        user: {
          email: user?.email,
          firstName: user?.first_name,
          lastName: user?.last_name,
          phone: user?.phone,
          isActive: user?.is_active === 1,
        },
        social: {
          website: user?.social?.website,
          facebook: user?.social?.facebook,
          twitter: user?.social?.twitter,
          instagram: user?.social?.instagram,
          pintrest: user?.social?.pintrest,
          vk: user?.social?.vk,
          whatsapp: user?.social?.whatsapp,
          telegram: user?.social?.telegram,
        },
      }"
    >
      <div class="space-y-4">
        <p class="text-xl font-semibold">General Information</p>
        <div class="flex flex-col sm:flex-row flex-wrap gap-4">
          <FormKit
            type="image"
            name="image"
            :url="
              user?.avatar
                ? $uploads + user?.avatar?.url
                : '/upload-preview.png'
            "
          />
          <FormKit type="group" name="user">
            <div class="">
              <p
                class="input input-bordered mt-6 justify-center flex items-center"
              >
                {{ user.email }}
              </p>
              <span class="btn btn-link text-base-400 normal-case"
                >Change Email</span
              >
            </div>
            <FormKit
              type="text"
              label="First Name"
              name="firstName"
              placeholder="Type here..."
              validation="required"
            />
            <FormKit
              type="text"
              label="Last Name"
              name="lastName"
              placeholder="Type here..."
              validation="required"
            />
            <FormKit
              type="number"
              label="Phone"
              name="phone"
              placeholder="Type here..."
            />
            <div class="flex gap-4 mt-4 flex-1">
              <label for="isActive" class="cursor-pointer label-text"
                >Activate</label
              >
              <FormKit type="checkbox" name="isActive" id="isActive" />
            </div>
          </FormKit>
        </div>
      </div>
      <div class="space-y-4 mt-8">
        <p class="text-xl font-semibold">Role Information</p>
        <div class="flex flex-col sm:flex-row flex-wrap gap-4">
          <FormKit
            type="select"
            label="Role"
            name="roleId"
            :options="roles ? [{ label: 'Select Role', value: '', attrs: { disabled: true,selected:true } }, ...roles.map((role: any) => ({ label: role.name, value: role.id }))] : []"
            :plugins="[castNumber]"
          />
        </div>
      </div>
      <div class="space-y-4 mt-8">
        <p class="text-xl font-semibold">Location Information</p>
        <div class="flex flex-col gap-4" v-if="user?.address">
          <p class="font-bold pl-4">
            {{
              `${user?.address?.address || ""}
                                            ${
                                              user?.address?.continent?.name ||
                                              ""
                                            } ${
                user?.address?.country?.name || ""
              }
                                            ${user?.address?.state?.name || ""}
                                            ${
                                              user?.address?.city?.name || ""
                                            } ${
                user?.address?.street?.name || ""
              }`
            }}
          </p>
          <span
            class="btn btn-lg btn-link text-base-400 normal-case justify-start"
            >Change Address</span
          >
        </div>
        <div v-else>
          <span class="btn btn-lg btn-link text-base-400 normal-case"
            >+ Add Address</span
          >
        </div>
      </div>
      <div class="space-y-4 mt-8">
        <p class="text-xl font-semibold">Url Information</p>
        <div class="flex flex-col sm:flex-row flex-wrap gap-4">
          <FormKit type="group" name="social">
            <FormKit
              type="text"
              label="Personal Website"
              name="website"
              placeholder="Type here..."
            />
            <FormKit
              type="text"
              label="Facebook Url"
              name="facebook"
              placeholder="Type here..."
            />
            <FormKit
              type="text"
              label="Twitter Url"
              name="twitter"
              placeholder="Type here..."
            />
            <FormKit
              type="text"
              label="Instagram Url"
              name="instagram"
              placeholder="Type here..."
            />
            <FormKit
              type="text"
              label="Pintrest Url"
              name="pintrest"
              placeholder="Type here..."
            />
            <FormKit
              type="text"
              label="VK Url"
              name="vk"
              placeholder="Type here..."
            />
            <FormKit
              type="text"
              label="Whatsapp Url"
              name="whatsapp"
              placeholder="Type here..."
            />
            <FormKit
              type="text"
              label="Telegram Url"
              name="telegram"
              placeholder="Type here..."
            />
          </FormKit>
        </div>
      </div>
      <div class="py-4">
        <FormKitSummary />
        <FormKitMessages />
      </div>
      <div class="flex justify-end mt-8 gap-8">
        <NuxtLink
          class="btn w-36 btn-sm text-base-400 bg-base-300"
          href="/admin/admin-users"
        >
          Cancle
        </NuxtLink>
        <button type="submit" class="btn w-36 btn-sm btn-primary">Save</button>
      </div>
    </FormKit>
  </section>
</template>
