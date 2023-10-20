<script setup lang="ts">
import BrandLogo from 'components/BrandLogo.vue';
import authStore from 'src/stores/authStroe';
import { ref } from 'vue';

const auth = authStore();

const form = ref({
  rememberMe: false,
  email: '',
  password: '',
});

const login = async () => {
  await auth.adminLogin(
    form.value.email,
    form.value.password,
    form.value.rememberMe
  );
};
</script>
<template>
  <q-layout>
    <q-page-container>
      <q-page class="row items-center justify-evenly">
        <div class="q-pa-md">
          <q-card
            class="my-card q-pa-md"
            style="min-width: 400px; border-radius: 15px"
          >
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
              <form class="q-gutter-y-md">
                <div>
                  <label>Email</label>
                  <q-input outlined v-model="form.email" dense />
                </div>
                <div>
                  <label>Email</label>
                  <q-input outlined v-model="form.password" dense />
                  <q-checkbox v-model="form.rememberMe" label="Remember Me"
                  style: />
                </div>
                <q-btn color="primary" style="width: 100%" @click="login"
                  >Submit</q-btn
                >
              </form>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
