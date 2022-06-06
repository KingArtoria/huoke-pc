<template>
  <div>
    <!-- tab栏 -->
    <header ref="headerRef" class="header">
      <div class="tab-wrap" v-for="item in tab.filter(v => !v.hide)">
        <span :class="{ active: item.value === activeTab }" class="tab" @click="switchTab(item)">{{
            item.label
        }}</span>
      </div>
      <el-dropdown @command="handleCommand" class="right">
        <span class="el-dropdown-link">
          更多
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="10">免费福利</el-dropdown-item>
            <el-dropdown-item command="11">海外项目</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </header>

    <!-- 列表 -->
    <div>
      <!-- 置顶 -->
      <!-- 1、广告置顶 -->
      <ListItem v-for="item in advertTop" :item="item" type="ad" />
      <!-- 2、黑卡置顶 -->
      <ListItem v-for="item in blackTop" :item="item" type="black" />
      <!-- 3、超级置顶 -->
      <ListItem v-for="item in superTop" :item="item" type="super" />
      <!-- 4、普通置顶 -->
      <ListItem v-for="item in ordinaryTop" :item="item" type="normal" />

      <!-- 列表数据 -->
      <ListItem v-for="item in listData" :item="item" />
    </div>

    <!-- 分页 -->
    <footer class="footer flex justify-center">
      <el-pagination :current-page="tab[activeTab].page" :total="tab[activeTab].total" background
        layout="total, prev, pager, next, jumper" @current-change="changePage" />
    </footer>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getListData } from '@/utils/api'
import ListItem from '@/components/ListItem.vue';
// 给tab选项动态添加宽度，避免选中时字体放大，造成其他项抖动
const headerRef = ref()
onMounted(() => {
  const arr = headerRef.value.getElementsByClassName('tab-wrap')
  Array.from(arr).forEach((v: any) => {
    v.style.width = (v.offsetWidth + 10) + 'px'
  })
})
// 分类
const tab = ref<any>([
  { label: '推荐项目', value: 0, page: 1, total: 0 },
  { label: '供应', value: 1, page: 1, total: 0 },
  { label: '需求', value: 2, page: 1, total: 0 },
  { label: '优质资源', value: 3, page: 1, total: 0 },
  { label: '销售渠道', value: 4, page: 1, total: 0 },
  { label: '资源互换', value: 5, page: 1, total: 0 },
  { label: '流量互换', value: 6, page: 1, total: 0 },
  { label: '招商加盟', value: 7, page: 1, total: 0 },
  { label: '线下广告', value: 8, page: 1, total: 0 },
  { label: '线下场地', value: 9, page: 1, total: 0 },
  { label: '免费福利', value: 10, page: 1, total: 0, hide: true },
  { label: '海外项目', value: 11, page: 1, total: 0, hide: true },
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
// 更多选项
const handleCommand = (command: string) => {
  switchTab(tab.value.find((v: any) => v.value == command))
}
</script>

<style lang="scss" scoped>
.header {
  padding: 51px 0 37px;
  display: flex;
  align-items: center;

  .tab-wrap {
    text-align: center;
    margin-right: 28px;
  }

  .tab {
    font-family: PingFang SC;
    font-weight: 500;
    cursor: pointer;
    font-size: 16px;

    &.active {
      color: #1E83FF;
      font-size: 18px;
      font-weight: bold;
    }

    // &:hover {
    //   color: #1E83FF;
    //   font-size: 18px;
    //   font-weight: bold;
    // }
  }
}

.footer {
  padding: 22px 0px;
  background-color: white;
  margin: 25px 0 27px;
}

.el-dropdown-link {
  font-family: PingFang SC;
  font-weight: 500;
  cursor: pointer;
  font-size: 16px;
  color: #989898;
}

.right {
  margin-left: auto;
}
</style>
