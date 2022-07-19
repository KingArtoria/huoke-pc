import { defineStore } from "pinia";

export const useStore = defineStore('root', {
  state: () => {
    return {
      offLine: false, // 用户在线状态
      refreshNav: true, // 刷新Nav组件
    }
  },
  actions: {
    changeState(state: boolean) {
      this.offLine = state
    }
  }
})