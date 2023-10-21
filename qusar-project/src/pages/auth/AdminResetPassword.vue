<script setup lang="ts">
import BrandLogo from 'components/BrandLogo.vue';
import authStore from 'src/stores/authStroe';
import { ref } from 'vue';

const auth = authStore();
const isPwd = ref(true);

const form = ref({
  password: '',
  password_confirmation: '',
});

const reset = async () => {
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
                Reset your password
              </div>
              <div class="text-body2 text-grey-8 text-center">
                Please choose a new password
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <form class="q-gutter-y-md" @submit.prevent="reset">
                <div>
                  <label>New Password</label>
                  <q-input
                    dense
                    v-model="form.password"
                    outlined
                    :type="isPwd ? 'password' : 'text'"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>
                <div>
                  <label>Confirm New Password</label>
                  <q-input
                    dense
                    v-model="form.password"
                    outlined
                    :type="isPwd ? 'password' : 'text'"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
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
