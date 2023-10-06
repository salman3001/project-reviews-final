<script setup lang="ts">
import useAddressStore from '~/store/useAddressStore'

definePageMeta({
  layout: "admin-layout"
})

const { $api } = useNuxtApp()
const token = useCookie('token')

const address = useAddressStore()

const { data: roles } = useFetch($api + '/admin/roles', {
  headers: { Authorization: `Bearer ${token.value}`, },
  transform: (v: any) => v.roles
})

onMounted(() => {
  address.getCountinents()
})



</script>

<template>
  <section class="mt-8 mb-16">
    <div class="flex items-center gap-4">
      <NuxtLink href="/admin/admin-users">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </NuxtLink>
      <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold">Add User</h1>
        <p class="text-base-400 text-sm" id="click">Add user details</p>
      </div>
    </div>
    <FormKit type="form" #default="{ value }" @submit="v => console.log(v)">
      <div class="space-y-4">
        <p class="text-xl font-semibold">General Information</p>
        <div class="flex flex-col  sm:flex-row flex-wrap gap-4">

          <FormKit type="image" name="image" url="sasas" />

          <FormKit type="text" label="Email" name="email" placeholder="Type here..." validation="required|email" />
          <FormKit type="password" label="Password" name="password" placeholder="Type here..."
            validation="required|length:8,20|alphanumeric" />
          <FormKit type="password" label="Confirm Password" name="password_confirm" placeholder="Type here..."
            validation="confirm" />
          <FormKit type="text" label="First Name" name="firstName" placeholder="Type here..." validation="required" />
          <FormKit type="text" label="Last Name" name="lastName" placeholder="Type here..." validation="required" />
          <FormKit type="number" label="Phone" name="phone" placeholder="Type here..." />
        </div>
      </div>
      <div class="space-y-4 mt-8">
        <p class="text-xl font-semibold">Role Information</p>
        <div class="flex flex-col  sm:flex-row flex-wrap gap-4">
          <div class="flex gap-4 mt-4 pr-16">
            <label for="isActive" class="cursor-pointer label-text">Activate</label>
            <FormKit type="checkbox" name="isActive" id="isActive" />
          </div>
          <FormKit type="select" label="Phone" name="roleId"
            :options="roles ? [{ label: 'Select Role', value: null, attrs: { disabled: true } }, ...roles.map((role: any) => ({ label: role.name, value: role.id }))] : []" />
        </div>
      </div>
      <div class="space-y-4 mt-8">
        <p class="text-xl font-semibold">Location Information</p>
        <div class="flex flex-col  sm:flex-row flex-wrap gap-4">
          <FormKit type="text" label="Address" name="address[address]" placeholder="Type here..." />
          <FormKit type="select" label="Continent" name="address[continentId]" placeholder="Type here..."
            :options="address.selectContinents" @change="() => { address.getCountries(value['address[continentId]']) }" />
          <FormKit type="select" label="Country" name="address[countryId]" placeholder="Type here..."
            :options="address.selectContries" @change="() => { address.getstates(value['address[countryId]']) }" />
          <FormKit type="select" label="State" name="address[stateId]" placeholder="Type here..."
            :options="address.selectStates" @change="() => { address.getCities(value['address[stateId]']) }" />
          <FormKit type="select" label="City" name="address[cityId]" placeholder="Type here..."
            :options="address.selectCities" @change="() => { address.getStreets(value['address[cityId]']) }" />
          <FormKit type="select" label="street" name="address[streetId]" placeholder="Type here..."
            :options="address.selectStreets" />
          <FormKit type="text" label="zip" name="address[zip]" placeholder="Type here..." />
        </div>
      </div>
      <div class="space-y-4 mt-8">
        <p class="text-xl font-semibold">Url Information</p>
        <div class="flex flex-col  sm:flex-row flex-wrap gap-4">
          <FormKit type="text" label="Personal Website" name="social[website]" placeholder="Type here..." />
          <FormKit type="text" label="Facebook Url" name="social[facebook]" placeholder="Type here..." />
          <FormKit type="text" label="Twitter Url" name="social[twitter]" placeholder="Type here..." />
          <FormKit type="text" label="Instagram Url" name="social[instagram]" placeholder="Type here..." />
          <FormKit type="text" label="Pintrest Url" name="social[pintrest]" placeholder="Type here..." />
          <FormKit type="text" label="VK Url" name="social[vk]" placeholder="Type here..." />
          <FormKit type="text" label="Whatsapp Url" name="social[whatsapp]" placeholder="Type here..." />
          <FormKit type="text" label="Telegram Url" name="social[telegram]" placeholder="Type here..." />
        </div>
      </div>
      <div class="py-4">
        <FormKitSummary />
        <FormKitMessages />
      </div>
      <div class="flex justify-end mt-8 gap-8">
        <NuxtLink class="btn w-36 btn-sm text-base-400 bg-base-300 " href="/admin/admin_users">
          Cancle
        </NuxtLink>
        <button type="submit" class="btn w-36 btn-sm btn-primary">Save</button>
      </div>
    </FormKit>
  </section>
</template>

