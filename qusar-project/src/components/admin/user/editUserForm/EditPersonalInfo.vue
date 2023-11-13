<script setup lang="ts">
import ProfileImageInput from 'src/components/forms/ProfileImageInput.vue';
import { userApi } from 'src/utils/BaseApiService'
import { srollToView } from 'src/utils/scrollToView';
import { rules } from 'src/utils/validationRules';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const uploads = ref('')
const user = ref<null | Record<string, any>>(null)

const route = useRoute()

const form = ref({
  image: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    phone: '',
    desc: '',
    isActive: false,
  },
});

userApi.show(route.params.id as string, {
  populate: {
    avatar: {
      fields: ['url']
    },
  }
}).then(({ data }) => {
  user.value = data.value
  form.value.user.firstName = (data.value as any)?.first_name
  form.value.user.lastName = (data.value as any)?.last_name
  form.value.user.email = (data.value as any)?.email
  form.value.user.userName = (data.value as any)?.user_name
  form.value.user.phone = (data.value as any)?.phone
  form.value.user.desc = (data.value as any)?.desc
  form.value.user.isActive = (data.value as any)?.is_active == 1 ? true : false
})

const { execute, loading } = userApi.put(route.params.id as string, form.value, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

onMounted(async () => {
  uploads.value = process.env.UPLOAD as string;
});
</script>

<template>
  <div class="q-py-lg">
    <q-form class="column q-gutter-y-md" @submit="() => {
      execute()
    }" @validation-error="srollToView">
      <div>
        <ProfileImageInput name="image" :url="user?.avatar?.url
          ? uploads + user?.avatar?.url
          : '/images/sample-dp.png'
          " @image="(v: any) => {
    form.image = v
  }" />
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
                (await rules.unique('/users/unique-field', 'email', v, user?.email)) ||
                'Email Already Taken'
            ]
              " />
          <q-input outlined debounce="500" v-model="form.user.userName" label="User Name" class="col-12 col-sm-6 col-md-3"
            :rules="[
              $rules.required('required'),
              rules.slug || 'Remove White Spaces',
              async (v) =>
                (await rules.unique('/users/unique-field', 'user_name', v, user?.user_name)) ||
                'User Name Already Taken',
            ]
              " />
          <q-input outlined v-model="form.user.desc" type="textarea" class="col-12" label="Description" />
        </div>

      </div>
      <div class="row justify-end q-gutter-md">
        <q-btn color="primary" v-if="loading">
          <q-circular-progress indeterminate size="20px" class="q-px-10" :thickness="1" color="grey-8"
            track-color="orange-2" style="min-width: 8rem" />
        </q-btn>
        <q-btn v-else color="primary" type="submit" style="min-width: 8rem">Update</q-btn>
      </div>
    </q-form>
  </div>
</template>
