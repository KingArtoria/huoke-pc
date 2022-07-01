import { defineStore } from "pinia";

export const useStore = defineStore('root', {
  state: () => {
    return {
      offLine: false,
    }
  },
  actions: {
    changeState(state: boolean) {
      this.offLine = state
    }
  }
})