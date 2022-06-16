<template>
  <div class="p-34 bg-white">
    <p class="fs-18">人脉管理</p>
    <div class="tabbar flex mt-38">
      <div v-for="tab in tabItems" class="tab-item app-flex-center"
        :class="[tab.value, { active: tab.value === activeTab }]" @click="activeTab = tab.value">
        {{ tab.label }}
      </div>
    </div>
    <WaitRequest v-if="activeTab === 1" />
    <DoneRequest v-if="activeTab === 2" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import WaitRequest from './components/WaitRequest.vue'
import DoneRequest from './components/DoneRequest.vue'

const tabItems = [
  { label: '待处理请求', value: 1 },
  { label: '已发出请求', value: 2 },
]
const activeTab = ref(1)
</script>

<style lang="scss" scoped>
.tabbar {
  background: #FCFCFC;
  border: 1px solid #F3F3F3;
  height: 49px;

  .tab-item {
    width: 170px;
    height: 45px;
    font-size: 16px;
    color: #666;
    width: 183px;
    cursor: pointer;

    &.active,
    &:hover {
      color: #0172FF;
      background: white;
      border-top: 2px solid #0D86FF;
    }
  }
}
</style>