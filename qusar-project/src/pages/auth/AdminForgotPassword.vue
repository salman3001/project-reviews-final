<script setup lang="ts">
import BrandLogo from 'components/BrandLogo.vue';
import authStore from 'src/stores/authStroe';
import { ref } from 'vue';

// const auth = authStore();
// const isPwd = ref(true);

const form = ref({
  email: '',
});

const send = async () => {
  // await auth.adminLogin(
  //   form.value.email,
  //   form.value.password,
  //   form.value.rememberMe
  // );
};
</script>
<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="row items-center justify-evenly"
        style="
          background-image: url('/images/login-bg.png');
          background-repeat: no-repeat;
          background-position: center;
        "
        @submit.prevent="send"
      >
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
                Forgot Password?
              </div>
              <div class="text-body2 text-grey-8 text-center">
                Please enter your email to recieve password reset link
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <form class="q-gutter-y-md">
                <div>
                  <label>Email</label>
                  <q-input outlined v-model="form.email" dense />
                </div>
                <q-btn type="submit" color="primary" style="width: 100%"
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
