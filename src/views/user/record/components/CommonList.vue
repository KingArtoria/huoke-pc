<template>
  <div class="page">
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
      <div ref="lineRef" class="line"></div>
    </header>
    <!-- 列表 -->
    <div class="list">
      <el-table
        :header-cell-style="{ background: '#F3F3F3', color: '#1B1B1B', 'font-weight': 'normal', 'padding': '16px 0' }"
        :data="listData" :highlight-current-row="false">
        <el-table-column label="合作标题" prop="title">
          <template #default="scope">
            <p class="link">{{ scope.row.title }}</p>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="date" align="center" width="200"></el-table-column>
        <el-table-column label="状态" prop="state" align="center" width="160"></el-table-column>
        <el-table-column label="浏览量" prop="count" align="center" width="160"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <footer class="flex justify-center py-30">
        <el-pagination :current-page="tab[activeTab].page" :total="tab[activeTab].total" background
          layout="total, prev, pager, next, jumper" @current-change="changePage" />
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
defineProps<{
  /**
   * 类型
   * 1=已发布
   * 2=待审核
   * 3=未通过
   */
  type: number
}>()
const headerRef = ref()
const lineRef = ref()
let tabItemDom: any = []
onMounted(() => {
  tabItemDom = headerRef.value.getElementsByClassName('tab-wrap')
  moveLine()
})
const moveLine = () => {
  const { offsetLeft, offsetWidth } = tabItemDom[activeTab.value]
  lineRef.value.style.left = offsetLeft + 'px'
  lineRef.value.style.width = offsetWidth + 'px'
}
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
// 列表数据
const listData = ref<any>([
  { title: '2021年6月份APP即将上线啦寻渠道招募商家， 无费用入住，坐享2年分润', date: '2021-06-29-14:26', state: '已发布', count: 288 },
  { title: '2021年6月份APP即将上线啦寻渠道招募商家， 无费用入住，坐享2年分润', date: '2021-06-29-14:26', state: '已发布', count: 288 },
  { title: '2021年6月份APP即将上线啦寻渠道招募商家， 无费用入住，坐享2年分润', date: '2021-06-29-14:26', state: '已发布', count: 288 },
  { title: '2021年6月份APP即将上线啦寻渠道招募商家， 无费用入住，坐享2年分润', date: '2021-06-29-14:26', state: '已发布', count: 288 },
])
const activeTab = ref(0)
// 切换分类
const switchTab = (item: any) => {
  if (item.value === activeTab.value) {
    return
  }
  activeTab.value = item.value
  moveLine()
  // getData(item)
}
// 翻页
const changePage = (pageIndex: number) => {
  tab.value[activeTab.value].page = pageIndex
  // getData(tab.value[activeTab.value])
}
// 更多选项
const handleCommand = (command: string) => {
  switchTab(tab.value.find((v: any) => v.value == command))
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  position: relative;
  padding: 20px 20px 28px 20px;
  background: white;

  .tab-wrap {
    // text-align: center;
    margin-right: 46px;
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

.list {
  position: relative;
  padding: 0 20px;
  background: white;

  &::before {
    content: '';
    position: absolute;
    background: #F3F3F3;
    left: 0;
    right: 0;
    height: 56px;
  }
}

::v-deep(.el-table .el-table__body-wrapper .el-table__cell) {
  padding: 20px 0;
}

::v-deep(.el-table .cell) {
  padding: 0;
}

::v-deep(.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell) {
  background: white;
}

.link {
  cursor: pointer;

  &:hover {
    color: #1E84FF;
  }
}
</style>