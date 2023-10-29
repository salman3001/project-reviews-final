import { defineStore } from 'pinia';
import {
  ContinentsApi,
  StateApi,
  CountriesApi,
  CityApi,
  StreetApi,
} from 'src/utils/BaseApiService';
import { computed, ref } from 'vue';

const addressStore = defineStore('addressStore', () => {
  const continents = ref([]);
  const countries = ref([]);
  const states = ref([]);
  const cities = ref([]);
  const streets = ref([]);

  const getCountinents = async () => {
    const { data } = await ContinentsApi.index();
    continents.value = data?.value as any;
    countries.value = [];
    states.value = [];
    cities.value = [];
    streets.value = [];
  };

  const getCountries = async (continentId: string) => {
    const { data } = await CountriesApi.index({
      relationFilter: {
        continent: {
          field: 'id',
          value: continentId,
        },
      },
    });
    countries.value = data?.value as any;
    states.value = [];
    cities.value = [];
    streets.value = [];
  };

  const getstates = async (countryId: string) => {
    const { data } = await StateApi.index({
      relationFilter: {
        country: {
          field: 'id',
          value: countryId,
        },
      },
    });
    states.value = data?.value as any;
    cities.value = [];
    streets.value = [];
  };

  const getCities = async (stateId: string) => {
    const { data } = await CityApi.index({
      relationFilter: {
        state: {
          field: 'id',
          value: stateId,
        },
      },
    });
    cities.value = data?.value as any;
    streets.value = [];
  };

  const getStreets = async (cityId: string) => {
    const { data } = await StreetApi.index({
      relationFilter: {
        city: {
          field: 'id',
          value: cityId,
        },
      },
    });
    streets.value = data?.value as any;
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
    continents,
    countries,
    states,
    cities,
    streets,
  };
});

export default addressStore;
