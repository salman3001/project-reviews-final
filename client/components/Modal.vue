<script setup lang="ts">
import useModalStore from "~/store/useModalStore";

const modal = useModalStore();
</script>

<template>
  <input type="checkbox" id="modal" class="modal-toggle" v-model="modal.show" />
  <div class="modal">
    <div class="modal-box p-0">
      <ModalBanAdminUser v-if="modal.content === 'changeAdminStatus'" />
      <ModalChangeRole v-if="modal.content === 'changeRole'" />
      <ModalDeleteAdminUser v-if="modal.content === 'deleteAdminUser'" />
      <ModalDelete v-if="modal.content === 'delete'" />
      <ModalContactMessage v-if="modal.content === 'contactMessage'" />
      <ModalAddressContinentAdd v-if="modal.content === 'addContinent'" />
      <ModalAddressContinentEdit v-if="modal.content === 'editContinent'" />
      <ModalAddressCountryAdd v-if="modal.content === 'addCountry'" />
      <ModalAddressCountryEdit v-if="modal.content === 'editCountry'" />
    </div>
    <label class="modal-backdrop backdrop-blur-sm"></label>
  </div>
</template>
