<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import {
  SupportTickeApi
} from 'src/utils/BaseApiService';
import { ref } from 'vue';

const router = useRouter();
const route = useRoute();

const message = ref('');

const ticket = ref<Record<string, any> | null>(null)
SupportTickeApi.show(route.params.id as string, {
  populate: {
    user: { fields: ['id', 'first_name', 'last_name'] }
  }
}).then(({ data }) => {
  ticket.value = (data.value as any)
})
const messages = ref<any>(null)
SupportTickeApi.getMessages(route.params.id as string).then(({ data }) => {
  message.value = (data.value as any).messages
})


</script>

<template>
  <div class="q-pa-sm q-pa-sm-lg">
    <div class="row items-center q-gutter-sm q-mb-md">
      <q-icon name="keyboard_backspace" size="30px" style="cursor: pointer" @click="() => {
        router.push({ name: 'admin.supportTicket.index' });
      }
        " />
      <span class="text-h6 "> Chat Support </span>
    </div>
    <div class="q-pa-md row q-gutter-md ">
      <div style="width: 100%;max-width: 300px;font-size: larger;">
        <div v-if="ticket">
          <div>
            <span style="font-weight: 700;">User Name:</span> {{ ticket.user.first_name }} {{ ticket.user.last_name }}
          </div>
          <p class="text-h6 q-pt-md">subject :</p>
          <div>
            {{ ticket.subject }}
          </div>
        </div>
      </div>
      <div class="q-pa-md q-pa-sm-lg"
        style="width: 100%;max-width: 800px;height: 80vh; border: 1px solid lightgray;border-radius: 10px;display: flex;flex-direction: column;justify-content: space-between;gap: 20px;">
        <div v-if="messages" class="hide-scrollbar scroll" style="height: 100%;">
          <q-chat-message v-for="(m, i) in messages.data" :key="i"
            :text="['Hi How are you lorems dsdjkasndas dka dskas Hi How are you lorems dsdjkasndas dka dskas Hi How are you lorems dsdjkasndas dka dskas Hi How are you lorems dsdjkasndas dka dskas ']"
            :sent="m.type == 'Admin'" />
        </div>
        <div>
          <q-input v-model="message" filled label="Reply">
            <template v-slot:append>
              <q-icon name="send"></q-icon>
            </template>
          </q-input>
        </div>
      </div>

    </div>
    <!-- <q-form class="column q-gutter-y-xl" @submit="submit" style="max-width: 700px;">
      <div class="q-gutter-y-md">
        <q-select outlined debounce="500" v-model="form.userId" emit-value map-options option-label="first_name"
          option-value="id" label="User" class="col-12 col-sm-6 col-md-3" :options="users"
          :rules="[$rules.required('Required')]" />
        <q-input outlined v-model="form.subject" label="Subject" class="col-12 col-sm-6 col-md-3" :rules="[
          $rules.required('Required')
        ]" />
        <q-input type="textarea" outlined v-model="form.message" label="Message" class="col-12 col-sm-6 col-md-3"
          :rules="[$rules.required('Required')]" />

      </div>
      <div class="row justify-end q-gutter-md">
        <q-btn style="background-color: #e6e4d9; color: #aeaca1; min-width: 8rem" @click="() => {
          router.push({ name: 'admin.supportTicket.index' });
        }
          ">Cancle</q-btn>
        <q-btn color="primary" v-if="loading">
          <q-circular-progress indeterminate size="20px" class="q-px-10" :thickness="1" color="grey-8"
            track-color="orange-2" style="min-width: 8rem" />
        </q-btn>
        <q-btn v-else color="primary" type="submit" style="min-width: 8rem">Save</q-btn>
      </div>
    </q-form> -->
  </div>
</template>
