<template>
  <!-- tab栏 -->
  <header ref="headerRef" class="header">
    <div class="flex items-center inner">
      <div class="tab-wrap" v-for="item in tab.filter(v => !v.hide)">
        <span :class="{ active: item.value === activeTab }" class="tab" @click="setActiveTab(item.value)">{{
            item.label
        }}</span>
      </div>
    </div>
    <!-- <el-dropdown @command="handleCommand" class="right">
      <span class="el-dropdown-link">
        更多
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="11">海外项目</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown> -->
    <div ref="lineRef" class="line"></div>
  </header>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
const call = defineEmits(['change'])
const headerRef = ref()
const lineRef = ref()
let tabItemDom: any = []
const moveLine = () => {
  const { offsetLeft, offsetWidth } = tabItemDom[tab.value.findIndex((v: any) => v.value === activeTab.value)]
  lineRef.value.style.left = offsetLeft + 'px'
  lineRef.value.style.width = offsetWidth + 'px'
}
onMounted(() => {
  tabItemDom = headerRef.value.getElementsByClassName('tab-wrap')
  moveLine()
})
// 分类
const tab = ref<any>([
  { label: '供应', value: 1, page: 1, total: 0 },
  { label: '需求', value: 2, page: 1, total: 0 },
  { label: '优质资源', value: 3, page: 1, total: 0 },
  { label: '销售渠道', value: 4, page: 1, total: 0 },
  { label: '资源互换', value: 5, page: 1, total: 0 },
  { label: '流量互换', value: 6, page: 1, total: 0 },
  { label: '招商加盟', value: 7, page: 1, total: 0 },
  { label: '线下广告', value: 8, page: 1, total: 0 },
  { label: '线下场地', value: 9, page: 1, total: 0 },
  { label: '免费福利', value: 10, page: 1, total: 0 },
  { label: '海外项目', value: 11, page: 1, total: 0 },
])
const activeTab = ref(1)
const setActiveTab = (value: number) => {
  activeTab.value = value
  moveLine()
  call('change', activeTab.value)
}
// 更多选项
const handleCommand = (command: number) => {
  activeTab.value = command
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  padding: 20px 20px 28px 20px;
  background: white;

  .tab-wrap {
    margin-right: 40px;
  }

  .tab {
    cursor: pointer;
    font-size: 16px;

    &.active {
      color: #1E83FF;
    }
  }

  .line {
    height: 2px;
    position: absolute;
    top: 43px;
    background: #0073F9;
    transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
  }
}

.inner .tab-wrap:last-of-type {
  margin-right: 0;
}
</style>