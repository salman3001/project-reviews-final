<script setup lang="ts">
import useAddressStore from "~/store/useAddressStore";
import castNumber from "~/lib/formkit/plugins/castToNumber";
import ErrorToast from "~/components/Toast/Error.vue";

definePageMeta({
  layout: "admin-layout",
});

const { $event, $toast } = useNuxtApp();

const address = useAddressStore();

const { result: data } = await useGet("/roles");

const createUser = async (values: any) => {
  const formData = new FormData();

  formData.append("image", values?.image);
  formData.append("isActive", values?.isActive);
  formData.append("roleId", values?.roleId);
  values.user &&
    Object.entries(values.user).map((val) => {
      formData.append(`user[${val[0]}]`, values?.user[val[0]]);
    });

  values.address &&
    Object.entries(values.address).map((val) => {
      formData.append(`address[${val[0]}]`, values?.address[val[0]]);
    });

  values.social &&
    Object.entries(values.social).map((val) => {
      formData.append(`social[${val[0]}]`, values?.social[val[0]]);
    });

  const { result, error } = await usePost("/admin-users", formData);

  if (result) {
    $event("user:created");
    navigateTo("/admin/admin-users");
  }

  if (error) {
    $toast({
      component: ErrorToast,
      props: { message: error.message || "something went wrong" },
    });
  }
};

onMounted(() => {
  address.getCountinents();
});
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
    <FormKit type="form" #default="{ value }" @submit="createUser">
      <div class="space-y-4">
        <p class="text-xl font-semibold">General Information</p>
        <div class="flex flex-col sm:flex-row flex-wrap gap-4">
          <FormKit type="image" name="image" url="/upload-preview.png" />
          <FormKit type="group" name="user">
            <FormKit
              type="text"
              label="Email"
              name="email"
              placeholder="Type here..."
              validation="required|email|unique:/admin-users/unique-email"
              :validation-messages="{
                unique: 'Email already taken',
              }"
            />
            <FormKit
              type="password"
              label="Password"
              name="password"
              placeholder="Type here..."
              validation="required|length:8,20|alphanumeric"
            />
            <FormKit
              type="password"
              label="Confirm Password"
              name="password_confirm"
              placeholder="Type here..."
              validation="required|confirm"
            />
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
            <div class="flex gap-4 mt-4 pr-16">
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
            :options="data.roles ? [{ label: 'Select Role', value: '', attrs: { disabled: true,selected:true } }, ...data.roles.map((role: any) => ({ label: role.name, value: role.id }))] : []"
            :plugins="[castNumber]"
          />
        </div>
      </div>
      <div class="space-y-4 mt-8">
        <p class="text-xl font-semibold">Location Information</p>
        <div class="flex flex-col sm:flex-row flex-wrap gap-4">
          <FormKit
            type="group"
            name="address"
            #default="{ value }"
            :value="{
              address: '',
              continentId: '',
              countryId: '',
              stateId: '',
              cityId: '',
              streetId: '',
              zip: '',
            }"
          >
            <FormKit
              type="text"
              label="Address"
              name="address"
              placeholder="Type here..."
            />
            <FormKit
              type="select"
              label="Continent"
              name="continentId"
              placeholder="Type here..."
              :options="address.selectContinents"
              @change="
                () => {
                  address.getCountries(value['continentId']);
                }
              "
              :plugins="[castNumber]"
            />
            <FormKit
              type="select"
              label="Country"
              name="countryId"
              placeholder="Type here..."
              :options="address.selectContries"
              @change="
                () => {
                  address.getstates(value['countryId']);
                }
              "
              :plugins="[castNumber]"
            />
            <FormKit
              type="select"
              label="State"
              name="stateId"
              placeholder="Type here..."
              :options="address.selectStates"
              @change="
                () => {
                  address.getCities(value['stateId']);
                }
              "
              :plugins="[castNumber]"
            />
            <FormKit
              type="select"
              label="City"
              name="cityId"
              placeholder="Type here..."
              :options="address.selectCities"
              @change="
                () => {
                  address.getStreets(value['cityId']);
                }
              "
              :plugins="[castNumber]"
            />
            <FormKit
              type="select"
              label="street"
              name="streetId"
              placeholder="Type here..."
              :options="address.selectStreets"
              :plugins="[castNumber]"
            />
            <FormKit
              type="text"
              label="zip"
              name="zip"
              placeholder="Type here..."
            />
          </FormKit>
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
