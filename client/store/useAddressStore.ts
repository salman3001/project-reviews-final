import { defineStore } from "pinia";

const useAddressStore = defineStore("addressStore", () => {
  const continents = ref([]);
  const countries = ref([]);
  const states = ref([]);
  const cities = ref([]);
  const streets = ref([]);

  const { $api } = useNuxtApp();
  const token = useCookie("token");

  const getCountinents = async () => {
    try {
      const res = (await $fetch($api + "/address/continents", {
        headers: { Authorization: `Bearer ${token.value}` },
      })) as any;

      continents.value = res.continents;
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
      const res = (await $fetch($api + "/address/countries", {
        params: { continentId },
        headers: { Authorization: `Bearer ${token.value}` },
      })) as any;

      console.log(res);

      countries.value = res.countries;
      states.value = [];
      cities.value = [];
      streets.value = [];
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getstates = async (countryId: number) => {
    try {
      const res = (await $fetch($api + "/address/states", {
        params: { countryId },
        headers: { Authorization: `Bearer ${token.value}` },
      })) as any;

      states.value = res.states;
      cities.value = [];
      streets.value = [];
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getCities = async (stateId: number) => {
    try {
      const res = (await $fetch($api + "/address/cities", {
        params: { stateId },
        headers: { Authorization: `Bearer ${token.value}` },
      })) as any;

      cities.value = res.cities;
      streets.value = [];
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getStreets = async (cityId: number) => {
    try {
      const res = (await $fetch($api + "/address/streets", {
        params: { cityId },
        headers: { Authorization: `Bearer ${token.value}` },
      })) as any;

      streets.value = res.streets;
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

export default useAddressStore;
