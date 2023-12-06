<script setup lang="ts">
import EditAdminUserForm from 'src/components/admin/adminUser/EditAdminUserForm.vue'
import EditPasswordInfo from 'src/components/admin/adminUser/EditPasswordInfo.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const tab = ref('personal')

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
    <q-card flat class="q-mt-lg">
      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="left"
        narrow-indicator>
        <q-tab name="personal" label="Personal Information" />
        <q-tab name="password" label="Password" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="personal" class="q-py-xl">
          <div class="text-h6">Edit Personal Information</div>
          <EditAdminUserForm />
        </q-tab-panel>

        <q-tab-panel name="password">
          <div class="text-h6">Edit Password</div>
          <EditPasswordInfo />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

  </div>
</template>
