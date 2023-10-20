<script setup lang="ts">
import authStore from 'src/stores/authStroe';
import { useRouter } from 'vue-router';

const auth = authStore()
const router = useRouter()


const logout = async () => {
  await auth.adminLogout()
  router.push({ name: 'adminLogin' })
}
</script>
<template>
  <q-btn round icon="account_circle" class="text-black" unelevated>
    <q-menu anchor="bottom left">
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section @click="logout">Sign Out</q-item-section>
        </q-item>
        <!-- <q-item clickable v-close-popup>
          <q-item-section>New incognito tab</q-item-section>
        </q-item>
        <q-separator /> -->
        <!-- <q-item clickable v-close-popup>
          <q-item-section>Recent tabs</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>History</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Downloads</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup>
          <q-item-section>Settings</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup>
          <q-item-section>Help &amp; Feedback</q-item-section>
        </q-item> -->
      </q-list>
    </q-menu>
  </q-btn>
</template>
