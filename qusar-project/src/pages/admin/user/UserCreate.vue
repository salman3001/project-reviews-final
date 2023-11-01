<script setup lang="ts">
import ProfileImageInput from 'src/components/forms/ProfileImageInput.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { rules } from '../../../utils/validationRules';

import useAddressStore from 'src/stores/addressStore';
import createUserStore from 'src/stores/createUserStore';

const router = useRouter();
const isPwd = ref(true);
const step = ref(1)
const address = useAddressStore();

const createUser = createUserStore()

onMounted(async () => {
  address.getCountinents();
});
</script>

<template>
  <div class="q-pa-lg">
    <div class="row items-center q-gutter-sm">
      <q-icon name="keyboard_backspace" size="30px" style="cursor: pointer" @click="() => {
        router.push({ name: 'admin.user.index' });
      }
        " />
      <span class="text-h6"> Add User </span>
    </div>
    <div>
      <q-stepper flat v-model="step" ref="stepper" color="primary" animated>
        <q-step :name="1" title="Personal" icon="settings" :done="step > 1">
          <q-form class="column q-gutter-y-md" @submit="() => {
            $refs.stepper.next()
          }">
            <div>
              <ProfileImageInput name="image" />
            </div>
            <div class="q-gutter-y-md">
              <div class="row q-col-gutter-md">
                <q-input outlined v-model="createUser.form.user.firstName" label="First Name"
                  class="col-12 col-sm-6 col-md-3" :rules="[$rules.required('required')]" />
                <q-input outlined v-model="createUser.form.user.lastName" label="Last Name"
                  class="col-12 col-sm-6 col-md-3" :rules="[$rules.required('required')]" />
                <q-input outlined debounce="500" v-model="createUser.form.user.email" type="email" label="Email"
                  class="col-12 col-sm-6 col-md-3" :rules="[
                    $rules.required('required'),
                    $rules.email('Email is not valid'),
                    async (v) =>
                      (await rules.unique('/users/unique-field', 'email', v)) ||
                      'Email Already Taken',
                  ]" />
                <q-input outlined debounce="500" v-model="createUser.form.user.userName" label="User Name"
                  class="col-12 col-sm-6 col-md-3" :rules="[
                    $rules.required('required'),
                    async (v) =>
                      (await rules.unique('/users/unique-field', 'user_name', v)) ||
                      'User Name Already Taken',
                  ]" />
                <q-input outlined v-model="createUser.form.user.password" :type="isPwd ? 'password' : 'text'"
                  label="Password" class="col-12 col-sm-6 col-md-3" :rules="[
                    $rules.required('required'),
                    $rules.minLength(8, 'Minimum 9 charectors required'),
                    $rules.alphaNum('Password Must be alpha numeric'),
                  ]">
                  <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                      @click="isPwd = !isPwd" />
                  </template>
                </q-input>
                <q-input outlined v-model="createUser.form.user.password_confirmaton" :type="isPwd ? 'password' : 'text'"
                  label="Cofirm Password" class="col-12 col-sm-6 col-md-3" :rules="[
                    $rules.required('required'),
                    $rules.sameAs(createUser.form.user.password, 'Password doesnt match'),
                  ]">
                  <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                      @click="isPwd = !isPwd" />
                  </template>
                </q-input>
                <q-input outlined v-model="createUser.form.user.desc" type="textarea" class="col-12"
                  label="Description" />
              </div>

              <div class="column q-gutter-y-md">
                <p class="text-subtitle1">Location Information</p>
                <div class="row q-col-gutter-md">
                  <q-input outlined v-model="createUser.form.address.address" class="col-12 col-md-9" label="Address" />
                  <q-select outlined emit-value map-options v-model="createUser.form.address.continentId"
                    :options="address.selectContinents" label="Continet" class="col-12 col-sm-6 col-md-3"
                    @update:model-value="(value) => {
                      createUser.form.address.countryId = '';
                      createUser.form.address.stateId = '';
                      createUser.form.address.cityId = '';
                      createUser.form.address.streetId = '';
                      address.getCountries(value);
                    }
                      " />
                  <q-select outlined emit-value map-options v-model="createUser.form.address.countryId" label="Country"
                    class="col-12 col-sm-6 col-md-3" :options="address.selectContries" @update:model-value="(value) => {
                      createUser.form.address.stateId = '';
                      createUser.form.address.cityId = '';
                      createUser.form.address.streetId = '';
                      address.getstates(value);
                    }
                      " />
                  <q-select outlined emit-value map-options v-model="createUser.form.address.stateId" label="State"
                    class="col-12 col-sm-6 col-md-3" :options="address.selectStates" @update:model-value="(value) => {
                      createUser.form.address.cityId = '';
                      createUser.form.address.streetId = '';
                      address.getCities(value);
                    }
                      " />
                  <q-select outlined emit-value map-options v-model="createUser.form.address.cityId" label="City"
                    class="col-12 col-sm-6 col-md-3" :options="address.selectCities" @update:model-value="(value) => {
                      createUser.form.address.streetId = '';
                      address.getStreets(value);
                    }
                      " />
                  <q-select outlined emit-value map-options v-model="createUser.form.address.streetId" label="Street"
                    class="col-12 col-sm-6 col-md-3" :options="address.selectStreets" />
                  <q-input outlined v-model="createUser.form.address.zip" class="col-12 col-sm-6 col-md-3"
                    label="Post Code" />
                </div>
              </div>
            </div>
            <div class="row justify-end q-gutter-md">
              <q-btn v-if="step > 1" style="background-color: #e6e4d9; color: #aeaca1; min-width: 8rem" type="submit"
                label="Back" class="q-ml-sm" />
              <q-btn color="primary" type="submit" style="min-width: 8rem">Next</q-btn>
            </div>
          </q-form>
        </q-step>

        <q-step :name="2" title="Social Links" icon="create_new_folder" :done="step > 2">
          <q-form class="column q-gutter-y-md" @submit="() => {
            $refs.stepper.next()
          }">
            <div class="column q-gutter-y-md">
              <div class="row q-col-gutter-md">
                <q-input outlined v-model="createUser.form.social.website" class="col-12 col-sm-6 col-md-3"
                  label="Website URL" />
                <q-input outlined v-model="createUser.form.social.facebook" label="Facebook URL"
                  class="col-12 col-sm-6 col-md-3" />
                <q-input outlined v-model="createUser.form.social.twitter" label="Twitter URL"
                  class="col-12 col-sm-6 col-md-3" />
                <q-input outlined v-model="createUser.form.social.instagram" label="Instagram URL"
                  class="col-12 col-sm-6 col-md-3" />
                <q-input outlined v-model="createUser.form.social.pintrest" label="Pintrest URL"
                  class="col-12 col-sm-6 col-md-3" />
                <q-input outlined v-model="createUser.form.social.linkedin" label="Linkedin URL"
                  class="col-12 col-sm-6 col-md-3" />
                <q-input outlined v-model="createUser.form.social.vk" class="col-12 col-sm-6 col-md-3" label="VK URL" />
                <q-input outlined v-model="createUser.form.social.whatsapp" class="col-12 col-sm-6 col-md-3"
                  label="Whatsapp URL" />
                <q-input outlined v-model="createUser.form.social.telegram" class="col-12 col-sm-6 col-md-3"
                  label="Telegram URL" />
              </div>
            </div>
            <div class="row justify-end q-gutter-md">
              <q-btn v-if="step > 1" style="background-color: #e6e4d9; color: #aeaca1; min-width: 8rem" type="submit"
                label="Back" class="q-ml-sm" @click="() => {
                  $refs.stepper.previous()
                }" />
              <!--
              <q-btn color="primary">
                <q-circular-progress indeterminate size="20px" class="q-px-10" :thickness="1" color="grey-8"
                  track-color="orange-2" style="min-width: 8rem" />
              </q-btn> -->
              <q-btn color="primary" type="submit" style="min-width: 8rem">Next</q-btn>
            </div>
          </q-form>
        </q-step>

        <q-step :name="3" title="Favorite Links" icon="assignment">
          <q-form class="column q-gutter-y-md" @submit="() => {
            $refs.stepper.next()
          }">
            <div class="column q-gutter-y-md">
              <div class="row q-col-gutter-md">

                <q-input outlined v-for="(f, i) in createUser.form.favoriteLinks" :key="i" v-model="f.link"
                  class="col-12 col-sm-6 col-md-3" :label="'Link' + ' ' + i + 1" />
              </div>
              <q-btn color="primary" style="max-width: 8rem" @click="createUser.addNewFavoriteLinks">+Add
                New</q-btn>
            </div>
            <div class="row justify-end q-gutter-md">
              <q-btn v-if="step > 1" style="background-color: #e6e4d9; color: #aeaca1; min-width: 8rem" type="submit"
                label="Back" class="q-ml-sm" @click="() => {
                  $refs.stepper.previous()
                }" />
              <!--
              <q-btn color="primary">
                <q-circular-progress indeterminate size="20px" class="q-px-10" :thickness="1" color="grey-8"
                  track-color="orange-2" style="min-width: 8rem" />
              </q-btn> -->
              <q-btn color="primary" type="submit" style="min-width: 8rem">Next</q-btn>
            </div>
          </q-form>
        </q-step>

        <q-step :name="4" title="Create an ad" icon="add_comment">
          Try out different ad text to see what brings in the most customers, and learn how to
          enhance your ads using features like ad extensions. If you run into any problems with
          your ads, find out how to tell if they're running and how to resolve approval issues.
        </q-step>

        <template v-slot:navigation>

          <!-- <q-stepper-navigation>
            <div class="row justify-end q-gutter-md">
              <q-btn v-if="step > 1" style="background-color: #e6e4d9; color: #aeaca1; min-width: 8rem"
                @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />

              <q-btn color="primary" v-if="loading">
                <q-circular-progress indeterminate size="20px" class="q-px-10" :thickness="1" color="grey-8"
                  track-color="orange-2" style="min-width: 8rem" />
              </q-btn>
              <q-btn v-else color="primary" type="submit" style="min-width: 8rem"
                @click="$refs.stepper.next()">Next</q-btn>
            </div>
          </q-stepper-navigation> -->
        </template>
      </q-stepper>
    </div>
  </div>
</template>
