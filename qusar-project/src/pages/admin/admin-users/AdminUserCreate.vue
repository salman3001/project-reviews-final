<script setup lang="ts">
import ProfileImageInput from 'src/components/forms/ProfileImageInput.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { rules } from '../../../utils/validationRules';
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';
import useAddressStore from 'src/stores/addressStore';

const router = useRouter()
const isPwd = ref(true)
const loading = ref(false)
const roles = ref<null | any[]>(null)
const address = useAddressStore();

const form = ref({
  user: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_confirmaton: '',
    phone: '',
    desc: "",
    isActive: false,
    roleId: ''
  },
  address: {
    address: '',
    continentId: '',
    countryId: '',
    stateId: '',
    cityId: '',
    streetId: '',
    zip: ''
  },
  social: {
    website: '',
    facebook: '',
    twitter: '',
    instagram: '',
    pintrest: '',
    linkedin: '',
    vk: '',
    whatsapp: '',
    telegram: '',
  }
})

const submit = async (e: SubmitEvent) => {
  const formData = new FormData(e.target)
  for (const key in form.value.user) {
    const element = form.value.user[key] as string;
    formData.append(`user[${key}]`, element)
  }
  for (const key in form.value.address) {
    const element = form.value.address[key] as string;
    formData.append(`address[${key}]`, element)
  }
  for (const key in form.value.social) {
    const element = form.value.social[key] as string;
    formData.append(`social[${key}]`, element)
  }

  try {
    loading.value = true;
    const res = await api.post('/admin-users', formData
    );
    loading.value = false;
    Notify.create({
      message: 'User added',
      color: 'positive',
      icon: 'success'
    });
    router.push({ name: 'admin.adminUsers.index' })
  } catch (error: any) {
    loading.value = false;
    if (error?.response) {
      Notify.create({
        message: error?.response?.data?.message,
        color: 'negative',
        icon: 'warning'
      });
    } else if (error?.request) {

      Notify.create({ message: 'Server Not Reachable!', color: 'negative' });
    } else {
      Notify.create({ message: error.message, color: 'negative' });
    }
  }
}

onMounted(async () => {
  try {
    const res = await api.get('/roles')
    if (res?.data) {
      roles.value = [...res?.data.map((r: any) => ({ label: r.name, value: r.val }))]
    }
  } catch (error) {
    Notify.create({
      message: 'Failed to fetch roles',
      color: 'negative',
      icon: 'warning'
    })
  }

  address.getCountinents();
})
</script>

<template>
  <div class="q-pa-lg">
    <div class="row items-center q-gutter-sm">
      <q-icon name="keyboard_backspace" size="30px" style="cursor: pointer;" @click="() => {
        router.push({ name: 'admin.adminUsers.index' })
      }" />
      <span class="text-h6">
        Add User
      </span>
    </div>
    <q-form class="column q-gutter-y-md" @submit="submit">
      <p class="text-subtitle1">General Information</p>
      <div>
        <ProfileImageInput name="image" />
      </div>
      <div class="q-gutter-y-md">
        <div class="row q-col-gutter-md">
          <q-input outlined v-model="form.user.firstName" label="First Name" class="col-12  col-sm-6 col-md-3"
            :rules="[$rules.required('required')]" />
          <q-input outlined v-model="form.user.lastName" label="Last Name" class="col-12  col-sm-6 col-md-3"
            :rules="[$rules.required('required')]" />
          <q-input outlined debounce="500" v-model="form.user.email" type="email" label="Email"
            class="col-12  col-sm-6 col-md-3"
            :rules="[$rules.required('required'), $rules.email('Email is not valid'), async (v) => await rules.unique('/admin-users/unique-field', 'email', v) || 'Email Already Taken']" />
          <q-input outlined v-model="form.user.password" :type="isPwd ? 'password' : 'text'" label="Password"
            class="col-12 col-sm-6 col-md-3"
            :rules="[$rules.required('required'), $rules.minLength(8, 'Minimum 9 charectors required'), $rules.alphaNum('Password Must be alpha numeric')]">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input outlined v-model="form.user.password_confirmaton" :type="isPwd ? 'password' : 'text'"
            label="Cofirm Password" class="col-12 col-sm-6 col-md-3"
            :rules="[$rules.required('required'), $rules.sameAs(form.user.password, 'Password doesnt match')]">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-input outlined v-model="form.user.desc" type="textarea" class="col-12" label="Description" />
        </div>


        <div class="column q-gutter-y-md">
          <p class="text-subtitle1">Role Information</p>
          <div class="row q-col-gutter-md">
            <q-toggle v-model="form.user.isActive" label="Activate" class="col-12  col-sm-6 col-md-3" />
            <q-select v-if="roles" outlined map-options emit-value v-model="form.user.roleId" :options="roles"
              label="Role" class="col-12  col-sm-6 col-md-3" />
          </div>
        </div>

        <div class="column q-gutter-y-md">
          <p class="text-subtitle1">Location Information</p>
          <div class="row q-col-gutter-md">
            <q-input outlined v-model="form.address.address" class="col-12 col-md-9" label="Address" />
            <q-select outlined emit-value map-options v-model="form.address.continentId"
              :options="address.selectContinents" label="Continet" class="col-12  col-sm-6 col-md-3" @update:model-value="(value) => {
                address.getCountries(value);
              }" />
            <q-select outlined emit-value map-options v-model="form.address.countryId" label="Country"
              class="col-12  col-sm-6 col-md-3" :options="address.selectContries" @update:model-value="(value) => {
                address.getstates(value);
              }" />
            <q-select outlined emit-value map-options v-model="form.address.stateId" label="State"
              class="col-12  col-sm-6 col-md-3" :options="address.selectStates" @update:model-value="(value) => {
                address.getCities(value);
              }" />
            <q-select outlined emit-value map-options v-model="form.address.cityId" label="City"
              class="col-12  col-sm-6 col-md-3" :options="address.selectCities" @update:model-value="(value) => {
                address.getStreets(value);
              }" />
            <q-select outlined emit-value map-options v-model="form.address.streetId" label="Street"
              class="col-12 col-sm-6 col-md-3" :options="address.selectStreets" />
            <q-input outlined v-model="form.address.zip" class="col-12 col-sm-6 col-md-3" label="Post Code" />
          </div>
        </div>

        <div class="column q-gutter-y-md">
          <p class="text-subtitle1">Social Information</p>
          <div class="row q-col-gutter-md">
            <q-input outlined v-model="form.social.website" class="col-12  col-sm-6 col-md-3" label="Website URL" />
            <q-input outlined v-model="form.social.facebook" label="Facebook URL" class="col-12  col-sm-6 col-md-3" />
            <q-input outlined v-model="form.social.twitter" label="Twitter URL" class="col-12  col-sm-6 col-md-3" />
            <q-input outlined v-model="form.social.instagram" label="Instagram URL" class="col-12  col-sm-6 col-md-3" />
            <q-input outlined v-model="form.social.pintrest" label="Pintrest URL" class="col-12  col-sm-6 col-md-3" />
            <q-input outlined v-model="form.social.linkedin" label="Linkedin URL" class="col-12 col-sm-6 col-md-3" />
            <q-input outlined v-model="form.social.vk" class="col-12 col-sm-6 col-md-3" label="VK URL" />
            <q-input outlined v-model="form.social.whatsapp" class="col-12 col-sm-6 col-md-3" label="Whatsapp URL" />
            <q-input outlined v-model="form.social.telegram" class="col-12 col-sm-6 col-md-3" label="Telegram URL" />
          </div>
        </div>
      </div>
      <div class="row justify-end q-gutter-md">
        <q-btn style="background-color: #E6E4D9;color: #AEACA1;min-width: 8rem;" @click="() => {
          router.push({ name: 'admin.adminUsers.index' })
        }">Cancle</q-btn>
        <q-btn color="primary" v-if="loading">
          <q-circular-progress indeterminate size="20px" class="q-px-10" :thickness="1" color="grey-8"
            track-color="orange-2" style="min-width: 8rem" />
        </q-btn>
        <q-btn v-else color="primary" type="submit" style="min-width: 8rem">Save</q-btn>
      </div>
    </q-form>
  </div>
</template>
