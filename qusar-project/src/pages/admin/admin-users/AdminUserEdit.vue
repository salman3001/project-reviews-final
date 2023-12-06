<script setup lang="ts">
import ProfileImageInput from 'src/components/forms/ProfileImageInput.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { rules } from '../../../utils/validationRules';
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';
import useAddressStore from 'src/stores/addressStore';
import { AdditionalParams } from 'src/type';

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const roles = ref<null | any[]>(null);
const user = ref<any>(null);
const address = useAddressStore();
const uploads = process.env.UPLOAD;

const form = ref({
  user: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_confirmaton: '',
    phone: '',
    desc: '',
    isActive: false,
    roleId: '',
  },
  // address: {
  //   address: '',
  //   continentId: '',
  //   countryId: '',
  //   stateId: '',
  //   cityId: '',
  //   streetId: '',
  //   zip: '',
  // },
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
  },
});

const submit = async (e: SubmitEvent) => {
  const formData = new FormData(e.target);
  for (const key in form.value.user) {
    const element = form.value.user[key] as string;
    formData.append(`user[${key}]`, element);
  }
  for (const key in form.value.address) {
    const element = form.value.address[key] as string;
    formData.append(`address[${key}]`, element);
  }
  for (const key in form.value.social) {
    const element = form.value.social[key] as string;
    formData.append(`social[${key}]`, element);
  }

  try {
    loading.value = true;
    const res = await api.put('/admin-users/' + route.params.id, formData);
    loading.value = false;
    Notify.create({
      message: 'User updated',
      color: 'positive',
      icon: 'check_circle',
    });
    router.push({ name: 'admin.adminUsers.index' });
  } catch (error: any) {
    loading.value = false;
    if (error?.response) {
      Notify.create({
        message: error?.response?.data?.message,
        color: 'negative',
        icon: 'warning',
      });
    } else if (error?.request) {
      Notify.create({ message: 'Server Not Reachable!', color: 'negative' });
    } else {
      Notify.create({ message: error.message, color: 'negative' });
    }
  }
};

onMounted(async () => {
  try {
    const res = await api.get('/admin-users/' + route.params.id, {
      params: {
        populate: {
          role: {
            fields: ['id'],
          },
          address: {
            populate: {
              continent: {
                fields: ['*'],
              },
              country: {
                fields: ['*'],
              },
              state: {
                fields: ['*'],
              },
              city: {
                fields: ['*'],
              },
              street: {
                fields: ['*'],
              },
            },
          },
          social: {
            fields: ['*'],
          },
        },
      } as AdditionalParams,
    });
    if (res?.data) {
      user.value = res.data;
      form.value.user.firstName = res.data?.first_name;
      form.value.user.lastName = res.data?.last_name;
      form.value.user.email = res.data?.email;
      form.value.user.email = res.data?.email;
      form.value.user.roleId = res.data?.role?.id;
      form.value.user.isActive = res.data?.is_active === 1 ? true : false;
      // form.value.address.address = res.data?.address?.address;
      // form.value.address.continentId = res.data?.address?.continentId;
      // form.value.address.countryId = res.data?.address?.countryId;
      // form.value.address.stateId = res.data?.address?.stateId;
      // form.value.address.cityId = res.data?.address?.cityId;
      // form.value.address.streetId = res.data?.address?.streetId;
      form.value.social.website = res.data?.social?.website;
      form.value.social.facebook = res.data?.social?.facebook;
      form.value.social.instagram = res.data?.social?.instagram;
      form.value.social.linkedin = res.data?.social?.linkedin;
      form.value.social.pintrest = res.data?.social?.pintrest;
      form.value.social.telegram = res.data?.social?.telegram;
      form.value.social.twitter = res.data?.social?.twitter;
      form.value.social.vk = res.data?.social?.vk;
      form.value.social.whatsapp = res.data?.social?.whatsapp;

      // ds
    }
  } catch (error) {
    Notify.create({
      message: 'Failed to fetch user',
      color: 'negative',
      icon: 'warning',
    });
  }

  try {
    const res = await api.get('/roles');
    if (res?.data) {
      roles.value = [
        ...res?.data.map((r: any) => ({ label: r.name, value: r.id })),
      ];
    }
  } catch (error) {
    Notify.create({
      message: 'Failed to fetch roles',
      color: 'negative',
      icon: 'warning',
    });
  }

  address.getCountinents();
});
</script>

<template>
  <div class="q-pa-lg">
    <div class="row items-center q-gutter-sm">
      <q-icon name="keyboard_backspace" size="30px" style="cursor: pointer" @click="() => {
        router.push({ name: 'admin.adminUsers.index' });
      }
        " />
      <span class="text-h6"> Edit User </span>
    </div>
    <q-form class="column q-gutter-y-md" @submit="submit">
      <p class="text-subtitle1">General Information</p>
      <div>
        <ProfileImageInput name="image" :url="user?.avatar
          ? uploads + user?.avatar?.url
          : '/images/upload-preview.png'
          " />
      </div>
      <div class="q-gutter-y-md">
        <div class="row q-col-gutter-md">
          <q-input outlined v-model="form.user.firstName" label="First Name" class="col-12 col-sm-6 col-md-3"
            :rules="[$rules.required('required')]" />
          <q-input outlined v-model="form.user.lastName" label="Last Name" class="col-12 col-sm-6 col-md-3"
            :rules="[$rules.required('required')]" />
          <q-input outlined debounce="500" v-model="form.user.email" type="email" label="Email"
            class="col-12 col-sm-6 col-md-3" :rules="[
              $rules.required('required'),
              $rules.email('Email is not valid'),
              async (v) =>
                (await rules.unique(
                  '/admin-users/unique-field',
                  'email',
                  v,
                  user?.email
                )) || 'Email Already Taken',
            ]" />
          <q-input outlined v-model="form.user.desc" type="textarea" class="col-12" label="Description" />
        </div>

        <div class="column q-gutter-y-md">
          <p class="text-subtitle1">Role Information</p>
          <div class="row q-col-gutter-md">
            <q-toggle v-model="form.user.isActive" label="Activate" class="col-12 col-sm-6 col-md-3" />
            <q-select v-if="roles" outlined map-options emit-value v-model="form.user.roleId" :options="roles"
              label="Role" class="col-12 col-sm-6 col-md-3" />
          </div>
        </div>
        <div class="column q-gutter-y-md">
          <p class="text-subtitle1">Location Information</p>
          <div v-if="user">
            <p>
              {{
                `${user?.address?.address || ''} ${user?.address?.continent?.name || ''
                  } ${user?.address?.country?.name || ''} ${user?.address?.state?.name || ''
                  } ${user?.address?.city?.name || ''} ${user?.address?.street?.name || ''
                  } ${user?.address?.continent?.zip || ''}`
              }}
            </p>
            <q-btn outline> Change Address </q-btn>
          </div>
        </div>

        <div class="column q-gutter-y-md">
          <p class="text-subtitle1">Social Information</p>
          <div class="row q-col-gutter-md">
            <q-input outlined v-model="form.social.website" class="col-12 col-sm-6 col-md-3" label="Website URL" />
            <q-input outlined v-model="form.social.facebook" label="Facebook URL" class="col-12 col-sm-6 col-md-3" />
            <q-input outlined v-model="form.social.twitter" label="Twitter URL" class="col-12 col-sm-6 col-md-3" />
            <q-input outlined v-model="form.social.instagram" label="Instagram URL" class="col-12 col-sm-6 col-md-3" />
            <q-input outlined v-model="form.social.pintrest" label="Pintrest URL" class="col-12 col-sm-6 col-md-3" />
            <q-input outlined v-model="form.social.linkedin" label="Linkedin URL" class="col-12 col-sm-6 col-md-3" />
            <q-input outlined v-model="form.social.vk" class="col-12 col-sm-6 col-md-3" label="VK URL" />
            <q-input outlined v-model="form.social.whatsapp" class="col-12 col-sm-6 col-md-3" label="Whatsapp URL" />
            <q-input outlined v-model="form.social.telegram" class="col-12 col-sm-6 col-md-3" label="Telegram URL" />
          </div>
        </div>
      </div>
      <div class="row justify-end q-gutter-md">
        <q-btn style="background-color: #e6e4d9; color: #aeaca1; min-width: 8rem" @click="() => {
          router.push({ name: 'admin.adminUsers.index' });
        }
          ">Cancle</q-btn>
        <q-btn color="primary" v-if="loading">
          <q-circular-progress indeterminate size="20px" class="q-px-10" :thickness="1" color="grey-8"
            track-color="orange-2" style="min-width: 8rem" />
        </q-btn>
        <q-btn v-else color="primary" type="submit" style="min-width: 8rem">Update</q-btn>
      </div>
    </q-form>
  </div>
</template>
