<script setup lang="ts">
import BrandLogo from 'components/BrandLogo.vue';
import authStore from 'src/stores/authStroe';
import { ref } from 'vue';

const auth = authStore();
const isPwd = ref(true);
const loading = ref(false)

const form = ref({
  rememberMe: false,
  email: '',
  password: '',
});

const login = async () => {
  loading.value = true
  await auth.adminLogin(
    form.value.email,
    form.value.password,
    form.value.rememberMe
  );
  loading.value = false
};
</script>
<template>
  <q-layout>
    <q-page-container>
      <q-page class="row items-center justify-evenly" style="
          background-image: url('/images/login-bg.png');
          background-repeat: no-repeat;
          background-position: center;
        ">
        <div class="q-pa-md">
          <q-card class="my-card q-pa-md" style="min-width: 400px; border-radius: 15px">
            <q-card-section>
              <div class="row justify-center">
                <BrandLogo />
              </div>
              <div class="text-h5 text-weight-bold text-center">
                Welcome Back!
              </div>
              <div class="text-body2 text-grey-8 text-center">
                Please enter your crendtials to login
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <form class="q-gutter-y-md" @submit.prevent="login">
                <div>
                  <label>Email</label>
                  <q-input outlined v-model="form.email" dense />
                </div>
                <div>
                  <label>Password</label>
                  <q-input dense v-model="form.password" outlined :type="isPwd ? 'password' : 'text'">
                    <template v-slot:append>
                      <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="isPwd = !isPwd" />
                    </template>
                  </q-input>
                  <div class="row items-center justify-between">
                    <q-checkbox v-model="form.rememberMe" label="Remember Me" />
                    <router-link :to="{ name: 'admin.forgotPassword' }" style="text-decoration: none; color: black">Forgot
                      Password</router-link>
                  </div>
                </div>
                <q-btn color="primary" v-if="loading" :disable="true" style="width: 100%">
                  <q-circular-progress indeterminate size="20px" class="q-px-10" :thickness="1" color="grey-8"
                    track-color="orange-2" style="min-width: 8rem" />
                </q-btn>
                <q-btn v-else type="submit" color="primary" style="width: 100%">Submit</q-btn>
              </form>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
