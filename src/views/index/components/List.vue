<template>
  <div>
    <!-- tab栏 -->
    <header class="header">
      <div class="tab-wrap" v-for="item in tab">
        <span :class="{ active: item.value === activeTab }" class="tab" @click="switchTab(item)">{{
            item.label
        }}</span>
      </div>
    </header>

    <!-- 列表 -->
    <div>
      <!-- 置顶 -->
      <!-- 超级置顶 -->
      <ListItem v-for="item in superTop" :item="item" />
      <!-- 广告置顶 -->
      <ListItem v-for="item in advertTop" :item="item" />
      <!-- 黑卡置顶 -->
      <ListItem v-for="item in blackTop" :item="item" />
      <!-- 普通置顶 -->
      <ListItem v-for="item in ordinaryTop" :item="item" />

      <!-- 列表数据 -->
      <ListItem v-for="item in listData" :item="item" />
    </div>

    <!-- 分页 -->
    <footer class="footer flex justify-center">
      <el-pagination :current-page="tab[activeTab].page" :total="tab[activeTab].total" background
        layout="prev, pager, next, jumper, total" @current-change="changePage" />
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { getListData } from '@/utils/api'
import ListItem from './ListItem.vue';
// 分类
const tab = ref([
  { label: '推荐项目', value: 0, page: 1, total: 0 },
  { label: '广告甲方', value: 1, page: 1, total: 0 },
  { label: '流量乙方', value: 2, page: 1, total: 0 },
  { label: '优质货源', value: 3, page: 1, total: 0 },
  { label: '销售渠道', value: 4, page: 1, total: 0 },
  { label: '资源互换', value: 5, page: 1, total: 0 },
  { label: '流量互换', value: 6, page: 1, total: 0 },
  { label: '招商加盟', value: 7, page: 1, total: 0 },
  { label: '线下广告', value: 9, page: 1, total: 0 },
])
// 广告置顶
const advertTop = ref<any>([])
// 黑卡置顶
const blackTop = ref<any>([])
// 超级置顶
const superTop = ref<any>([])
// 普通置顶
const ordinaryTop = ref<any>([])
// 列表数据
const listData = ref<any>([])
const activeTab = ref(0)
// 切换分类
const switchTab = (item: any) => {
  if (item.value === activeTab.value) {
    return
  }
  activeTab.value = item.value
  getData(item)
}
// 获取列表数据
const getData = (item: any) => {
  getListData({
    page: item.page,
    num: 10,
    type: item.value
  }).then(res => {
    const { list, advert_top, black_top, super_top, ordinary_top, num } = res.data.data
    item.total = num
    listData.value = list
    advertTop.value = advert_top
    blackTop.value = black_top
    superTop.value = super_top
    ordinaryTop.value = ordinary_top
  })
}
getData(tab.value[0])
// 翻页
const changePage = (pageIndex: number) => {
  tab.value[activeTab.value].page = pageIndex
  getData(tab.value[activeTab.value])
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
