<script setup lang="ts">
import modalStore from '../../stores/modalStore';
import ChangeRoleModal from './ChangeRoleModal.vue';
import DeleteRecordModal from './DeleteRecordModal.vue';
import BanAdminUser from './BanAdminUser.vue';
import BanUser from './BanUser.vue';
import ContinentAddModal from './address/ContinentAddModal.vue';
import ContinentEditModal from './address/ContinentEditModal.vue';
import CountryAddModal from './address/CountryAddModal.vue';
import CountryEditModal from './address/CountryEditModal.vue';
import StateAddModal from './address/StateAddModal.vue';
import StateEditModal from './address/StateEditModal.vue';
import CityEditModal from './address/CityEditModal.vue';
import CityAddModal from './address/CityAddModal.vue';
import StreetEditModal from './address/StreetEditModal.vue';
import StreetAddModal from './address/StreetAddModal.vue';
import AddRoleModal from './AddRoleModal.vue';

const modal = modalStore();
</script>

<template>
  <q-dialog v-model="modal.show">
    <ChangeRoleModal v-if="modal.content === 'changeRole'" />
    <BanAdminUser v-if="modal.content === 'changeAdminStatus'" />
    <DeleteRecordModal v-if="modal.content === 'deleteRecord'" />
    <ContinentAddModal v-if="modal.content === 'addContinent'" />
    <ContinentEditModal v-if="modal.content === 'editContinent'" />
    <CountryAddModal v-if="modal.content === 'addCountry'" />
    <CountryEditModal v-if="modal.content === 'editCountry'" />
    <StateAddModal v-if="modal.content === 'addState'" />
    <StateEditModal v-if="modal.content === 'editState'" />
    <CityEditModal v-if="modal.content === 'editCity'" />
    <CityAddModal v-if="modal.content === 'addCity'" />
    <StreetAddModal v-if="modal.content === 'addStreet'" />
    <StreetEditModal v-if="modal.content === 'editStreet'" />
    <AddRoleModal v-if="modal.content === 'addRole'" />
    <BanUser v-if="modal.content === 'changeUserStatus'" />
    <!-- <ModalContactMessage v-if="modal.content === 'contactMessage'" />
    <ModalAddressContinentAdd v-if="modal.content === 'addContinent'" />
    <ModalAddressContinentEdit v-if="modal.content === 'editContinent'" />
    <ModalAddressCountryAdd v-if="modal.content === 'addCountry'" />
    <ModalAddressCountryEdit v-if="modal.content === 'editCountry'" /> -->
  </q-dialog>
</template>
