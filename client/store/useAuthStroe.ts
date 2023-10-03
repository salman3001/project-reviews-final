import { defineStore } from "pinia";

const useAuthStore = defineStore("Auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(payload: any) {
      this.user = payload;
    },
  },
});

export default useAuthStore;
