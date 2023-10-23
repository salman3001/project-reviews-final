<script setup lang="ts">
import useModalStore from '../../stores/modalStore';
import ChangeRoleModal from './ChangeRoleModal.vue';
import DeleteRecordModal from './DeleteRecordModal.vue';
import BanAdminUser from './BanAdminUser.vue';

const modal = useModalStore();

</script>

<template>
  <q-dialog v-model="modal.show">
    <!-- <ModalBanAdminUser v-if="modal.content === 'changeAdminStatus'" /> -->
    <ChangeRoleModal v-if="modal.content === 'changeRole'" />
    <BanAdminUser v-if="modal.content === 'changeAdminStatus'" />
    <DeleteRecordModal v-if="modal.content === 'deleteRecord'" />
    <ModalContactMessage v-if="modal.content === 'contactMessage'" />
    <ModalAddressContinentAdd v-if="modal.content === 'addContinent'" />
    <ModalAddressContinentEdit v-if="modal.content === 'editContinent'" />
    <ModalAddressCountryAdd v-if="modal.content === 'addCountry'" />
    <ModalAddressCountryEdit v-if="modal.content === 'editCountry'" /> -->
  </q-dialog>
</template>
