<template>
  <div class="p-34 bg-white">
    <p class="fs-18">担保记录</p>
    <div class="tabbar flex mt-38">
      <div v-for="tab in tabItems" class="tab-item app-flex-center"
        :class="[tab.value, { active: tab.value === activeTab }]">{{ tab.label
        }}</div>
    </div>
    <div class="p-20 item-wrap">
      <div v-for="item in listData" class="item p-20 bg-white mb-10">
        <p class="fs-16 mb-20">{{ item.title }}</p>
        <p class="mb-10">担保金额：<span class="color-FF0000">￥{{ item.price }}</span></p>
        <div class="line"></div>
        <p class="color-A0A0A0 mt-18">
          <span class="mr-60">付款方：{{ item.fukuan }}</span>
          <span class="mr-60">收款方：{{ item.showkuan }}</span>
          <span class="mr-60">发起时间：{{ item.faqi }}</span>
          <span class="mr-60">完成时间：{{ item.wancheng }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
const tabItems = [
  { label: '已完成', value: 0 },
  { label: '待完成', value: 1 },
  { label: '已关闭', value: 2 },
]
const activeTab = ref(0)
const listData = ref([
  { title: '天街跑量100w起步这是一段合作内容。', price: 1000, fukuan: 'sdfsdf', showkuan: 'sdfsdf', faqi: 'sdfdsf', wancheng: 'sdfdsf' },
  { title: '天街跑量100w起步这是一段合作内容。', price: 1000, fukuan: 'sdfsdf', showkuan: 'sdfsdf', faqi: 'sdfdsf', wancheng: 'sdfdsf' },
  { title: '天街跑量100w起步这是一段合作内容。', price: 1000, fukuan: 'sdfsdf', showkuan: 'sdfsdf', faqi: 'sdfdsf', wancheng: 'sdfdsf' },
  { title: '天街跑量100w起步这是一段合作内容。', price: 1000, fukuan: 'sdfsdf', showkuan: 'sdfsdf', faqi: 'sdfdsf', wancheng: 'sdfdsf' },
])
watch(activeTab, () => {

}, { immediate: true })
</script>

<style lang="scss" scoped>
.tabbar {
  background: #FCFCFC;
  border: 1px solid #F3F3F3;
  height: 49px;
}

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

.item-wrap {
  background: #F5F5F5;
}

.color-FF0000 {
  color: #FF0000;
}

.color-A0A0A0 {
  color: #A0A0A0;
}

.line {
  border-bottom: 1px solid #F6F6F6;
}
</style>