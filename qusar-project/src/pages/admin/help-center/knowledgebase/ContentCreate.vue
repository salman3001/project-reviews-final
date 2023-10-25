<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { rules } from '../../../../utils/validationRules';
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';
import { KnowledgebaseCategoryApi } from '../../../../utils/BaseApiService';

const router = useRouter();
const loading = ref(false);

const languages = ref<null | any[]>(null);

const form = ref({
  title: '',
  slug: '',
  languageId: null,
  categoryId: null,
  order: null,
  content: '',
  metaTitle: '',
  metaKeywords: '',
  metaDesc: '',
  isActive: false,
});

const { data: categories } = await KnowledgebaseCategoryApi.index({
  fields: ['name', 'id'],
});

const submit = async () => {
  try {
    loading.value = true;
    await api.post('/help-center/content', form.value);
    loading.value = false;
    Notify.create({
      message: 'Content added',
      color: 'positive',
      icon: 'check_circle',
    });
    router.push({ name: 'admin.knowlegebase.contnet.index' });
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
</script>

<template>
  <div class="q-pa-lg">
    <div class="row items-center q-gutter-sm">
      <q-icon
        name="keyboard_backspace"
        size="30px"
        style="cursor: pointer"
        @click="
          () => {
            router.push({ name: 'admin.knowlegebase.contnet.index' });
          }
        "
      />
      <span class="text-h6"> Add Content </span>
    </div>
    <q-form class="column q-gutter-y-md" @submit="submit">
      <div class="q-gutter-y-md">
        <div class="row q-col-gutter-md">
          <q-input
            outlined
            v-model="form.title"
            label="Title"
            class="col-12 col-sm-6 col-md-3"
            :rules="[
              $rules.required('required'),
              async (v) =>
                (await rules.unique('/help-center/unique-field', 'title', v)) ||
                'title Already Taken',
            ]"
          />
          <q-input
            outlined
            v-model="form.slug"
            label="Slug"
            class="col-12 col-sm-6 col-md-3"
            :rules="[
              async (v) =>
                (await rules.unique('/help-center/unique-field', 'slug', v)) ||
                'Slug Already Taken',
            ]"
          />
          <q-input
            outlined
            debounce="500"
            v-model="form.languageId"
            type="email"
            label="Email"
            class="col-12 col-sm-6 col-md-3"
            :rules="[
              $rules.required('required'),
              $rules.email('Email is not valid'),
              async (v) =>
                (await rules.unique('/admin-users/unique-field', 'email', v)) ||
                'Email Already Taken',
            ]"
          />
          <q-input
            outlined
            v-model="form.user.password"
            :type="isPwd ? 'password' : 'text'"
            label="Password"
            class="col-12 col-sm-6 col-md-3"
            :rules="[
              $rules.required('required'),
              $rules.minLength(8, 'Minimum 9 charectors required'),
              $rules.alphaNum('Password Must be alpha numeric'),
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            outlined
            v-model="form.user.password_confirmaton"
            :type="isPwd ? 'password' : 'text'"
            label="Cofirm Password"
            class="col-12 col-sm-6 col-md-3"
            :rules="[
              $rules.required('required'),
              $rules.sameAs(form.user.password, 'Password doesnt match'),
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            outlined
            v-model="form.user.desc"
            type="textarea"
            class="col-12"
            label="Description"
          />
        </div>

        <div class="column q-gutter-y-md">
          <p class="text-subtitle1">Role Information</p>
          <div class="row q-col-gutter-md">
            <q-toggle
              v-model="form.user.isActive"
              label="Activate"
              class="col-12 col-sm-6 col-md-3"
            />
            <q-select
              v-if="roles"
              outlined
              map-options
              emit-value
              v-model="form.user.roleId"
              :options="roles"
              label="Role"
              class="col-12 col-sm-6 col-md-3"
            />
          </div>
        </div>

        <div class="column q-gutter-y-md">
          <p class="text-subtitle1">Location Information</p>
          <div class="row q-col-gutter-md">
            <q-input
              outlined
              v-model="form.address.address"
              class="col-12 col-md-9"
              label="Address"
            />
            <q-select
              outlined
              emit-value
              map-options
              v-model="form.address.continentId"
              :options="address.selectContinents"
              label="Continet"
              class="col-12 col-sm-6 col-md-3"
              @update:model-value="
                (value) => {
                  address.getCountries(value);
                }
              "
            />
            <q-select
              outlined
              emit-value
              map-options
              v-model="form.address.countryId"
              label="Country"
              class="col-12 col-sm-6 col-md-3"
              :options="address.selectContries"
              @update:model-value="
                (value) => {
                  address.getstates(value);
                }
              "
            />
            <q-select
              outlined
              emit-value
              map-options
              v-model="form.address.stateId"
              label="State"
              class="col-12 col-sm-6 col-md-3"
              :options="address.selectStates"
              @update:model-value="
                (value) => {
                  address.getCities(value);
                }
              "
            />
            <q-select
              outlined
              emit-value
              map-options
              v-model="form.address.cityId"
              label="City"
              class="col-12 col-sm-6 col-md-3"
              :options="address.selectCities"
              @update:model-value="
                (value) => {
                  address.getStreets(value);
                }
              "
            />
            <q-select
              outlined
              emit-value
              map-options
              v-model="form.address.streetId"
              label="Street"
              class="col-12 col-sm-6 col-md-3"
              :options="address.selectStreets"
            />
            <q-input
              outlined
              v-model="form.address.zip"
              class="col-12 col-sm-6 col-md-3"
              label="Post Code"
            />
          </div>
        </div>

        <div class="column q-gutter-y-md">
          <p class="text-subtitle1">Social Information</p>
          <div class="row q-col-gutter-md">
            <q-input
              outlined
              v-model="form.social.website"
              class="col-12 col-sm-6 col-md-3"
              label="Website URL"
            />
            <q-input
              outlined
              v-model="form.social.facebook"
              label="Facebook URL"
              class="col-12 col-sm-6 col-md-3"
            />
            <q-input
              outlined
              v-model="form.social.twitter"
              label="Twitter URL"
              class="col-12 col-sm-6 col-md-3"
            />
            <q-input
              outlined
              v-model="form.social.instagram"
              label="Instagram URL"
              class="col-12 col-sm-6 col-md-3"
            />
            <q-input
              outlined
              v-model="form.social.pintrest"
              label="Pintrest URL"
              class="col-12 col-sm-6 col-md-3"
            />
            <q-input
              outlined
              v-model="form.social.linkedin"
              label="Linkedin URL"
              class="col-12 col-sm-6 col-md-3"
            />
            <q-input
              outlined
              v-model="form.social.vk"
              class="col-12 col-sm-6 col-md-3"
              label="VK URL"
            />
            <q-input
              outlined
              v-model="form.social.whatsapp"
              class="col-12 col-sm-6 col-md-3"
              label="Whatsapp URL"
            />
            <q-input
              outlined
              v-model="form.social.telegram"
              class="col-12 col-sm-6 col-md-3"
              label="Telegram URL"
            />
          </div>
        </div>
      </div>
      <div class="row justify-end q-gutter-md">
        <q-btn
          style="background-color: #e6e4d9; color: #aeaca1; min-width: 8rem"
          @click="
            () => {
              router.push({ name: 'admin.adminUsers.index' });
            }
          "
          >Cancle</q-btn
        >
        <q-btn color="primary" v-if="loading">
          <q-circular-progress
            indeterminate
            size="20px"
            class="q-px-10"
            :thickness="1"
            color="grey-8"
            track-color="orange-2"
            style="min-width: 8rem"
          />
        </q-btn>
        <q-btn v-else color="primary" type="submit" style="min-width: 8rem"
          >Save</q-btn
        >
      </div>
    </q-form>
  </div>
</template>
