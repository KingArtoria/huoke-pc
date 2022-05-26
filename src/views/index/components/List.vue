<template>
  <div>
    <header class="header">
      <div class="tab-wrap" v-for="item in tab">
        <span :class="{ active: item.value === activeTab }" class="tab" @click="switchTab(item)">{{
            item.label
        }}</span>
      </div>
    </header>
    <footer class="footer flex justify-center">
      <el-pagination background layout="prev, pager, next, jumper, total" :total="1000" />
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
// 分类
const tab = ref([
  { label: '推荐项目', value: 0 },
  { label: '广告甲方', value: 1 },
  { label: '流量乙方', value: 2 },
  { label: '优质货源', value: 3 },
  { label: '销售渠道', value: 4 },
  { label: '资源互换', value: 5 },
  { label: '流量互换', value: 6 },
  { label: '招商加盟', value: 7 },
  { label: '线下广告', value: 9 },
])
const activeTab = ref(0)
// 切换分类
const switchTab = (item: any) => {

}
</script>

<style lang="scss" scoped>
.header {
  padding: 51px 11px 37px;
  display: flex;
  align-items: center;

  .tab-wrap {
    width: 80px;
    text-align: center;
    margin-right: 28px;
  }

  .tab {
    font-family: PingFang SC;
    font-weight: 500;
    cursor: pointer;

    font-size: 18px;

    &.active {
      color: #1E83FF;
      font-size: 20px;
      font-weight: bold;
    }

    &:hover {
      color: #1E83FF;
      font-size: 20px;
      font-weight: bold;
    }
  }
}

.footer {
  padding: 22px 0px;
  background-color: white;
  margin: 25px 0 27px;
}
</style>
