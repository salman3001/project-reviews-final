import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { api } from 'boot/axios';

const addressStore = defineStore('addressStore', () => {
  const continents = ref([]);
  const countries = ref([]);
  const states = ref([]);
  const cities = ref([]);
  const streets = ref([]);

  const getCountinents = async () => {
    try {
      const res = await api.get('/address/continents');
      continents.value = res?.data;
      countries.value = [];
      states.value = [];
      cities.value = [];
      streets.value = [];
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getCountries = async (continentId: number) => {
    try {
      const res = await api.get('/address/countries', {
        params: {
          continentId,
        },
      });

      countries.value = res?.data;
      states.value = [];
      cities.value = [];
      streets.value = [];
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getstates = async (countryId: number) => {
    try {
      const res = await api.get('/address/states', {
        params: {
          countryId,
        },
      });
      states.value = res?.data;
      cities.value = [];
      streets.value = [];
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getCities = async (stateId: number) => {
    try {
      const res = await api.get('/address/cities', {
        params: {
          stateId,
        },
      });
      cities.value = res?.data;
      streets.value = [];
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getStreets = async (cityId: number) => {
    try {
      const res = await api.get('/address/streets', {
        params: {
          cityId,
        },
      });

      streets.value = res?.data;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const selectContinents = computed(() =>
    continents.value
      ? continents.value.map((c: any) => ({
          label: c.name,
          value: c.id,
        }))
      : []
  );

  const selectContries = computed(() =>
    countries.value
      ? countries.value.map((c: any) => ({
          label: c.name,
          value: c.id,
        }))
      : []
  );

  const selectStates = computed(() =>
    states.value
      ? states.value.map((c: any) => ({
          label: c.name,
          value: c.id,
        }))
      : []
  );

  const selectCities = computed(() =>
    cities.value
      ? cities.value.map((c: any) => ({
          label: c.name,
          value: c.id,
        }))
      : []
  );

  const selectStreets = computed(() =>
    streets.value
      ? streets.value.map((c: any) => ({
          label: c.name,
          value: c.id,
        }))
      : []
  );

  return {
    getCountinents,
    getCountries,
    getstates,
    getCities,
    getStreets,
    selectContinents,
    selectContries,
    selectStates,
    selectCities,
    selectStreets,
  };
});

export default addressStore;
