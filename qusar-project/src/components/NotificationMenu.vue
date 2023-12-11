<script setup>
import notificationStore from 'src/stores/notificationStore'
import authStore from 'src/stores/authStroe'
import { onMounted } from 'vue';

const auth = authStore()
const notify = notificationStore()

onMounted(() => {
  notify.getAllNotification();
  notify.getSocket()

})
</script>
<template>
  <q-btn round icon="mail" class="text-black" unelevated>
    <q-badge floating rounded color="red">{{ notify.notificationCount.unread }}</q-badge>
    <q-menu anchor="bottom left">


      <q-list dense style="min-width: 300px;font-size: small;">
        <q-item clickable v-close-popup v-for="(n, i)  in notify.notifcations" :key="i"
          style="background-color: rgb(237, 233, 228);" class="q-my-xs">
          <q-item-section>{{ n?.data?.title }}</q-item-section>
        </q-item>
        <q-separator />
      </q-list>
      <div class="justify-center row q-py-1 q-pt-sm" style="border-top: 1px solid lightgray;">
        <q-btn flat size="small" class="text-secondary">See All</q-btn>
      </div>
    </q-menu>
  </q-btn>
</template>
