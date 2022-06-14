<template>
  <div class="p-34 bg-white">
    <p class="fs-18 mb-20">我的收藏</p>
    <KindTab @change="handleChange" />
    <div v-if="currentData.length !== 0" class="flex items-center my-10">
      <el-checkbox v-model="isCheckAll" @change="isCheckAllChange"><span class="fs-16 color-1B1B1B ml-2">全选</span>
      </el-checkbox>
      <button class="btn" @click="doDel">删除</button>
    </div>
    <div v-for="item in currentData" class="flex items-center item">
      <el-checkbox v-model="item.isCheck" @change="itemChange"></el-checkbox>
      <p class="ml-10 fs-16 flex-1 truncate pr-20 link" @click="navToDetail(item.id)">{{ item.title }}</p>
      <span class="ml-auto time">{{ fmtDate(item.addtime) }}</span>
    </div>
    <!-- 无数据 -->
    <Empty v-if="currentData.length === 0" />
    <!-- 分页 -->
    <footer v-if="currentData.length !== 0" class="footer flex justify-center mt-30">
      <el-pagination :current-page="currentPage" :total="currentTotal" background
        layout="total, prev, pager, next, jumper" @current-change="changePage" />
    </footer>
  </div>
</template>
<script setup lang="ts">
import { favoriteAPI } from '@/utils/api';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import KindTab from '@/components/KindTab.vue';
import Empty from '@/components/Empty.vue';
import { COOPERATION_TYPES } from '@/utils/const'
import { computed } from '@vue/reactivity';
import Dayjs from 'dayjs';
import { useRouter } from 'vue-router';

const typeData = COOPERATION_TYPES.map((v: any) => {
  return {
    type: v.value,
    data: [],
    page: 1,
    total: 0,
  }
})
let activeType = 1
const currentData = ref<any>([])
const currentPage = ref(1)
const currentTotal = ref(0)
// 获取收藏
const getFavorite = () => {
  const current = typeData.find((v: any) => v.type === activeType) || {} as any
  favoriteAPI({ type: activeType, page: current.page }).then(res => {
    const { list, num } = res.data.data
    current.total = num
    list.forEach((v: any) => v.isCheck = false)
    current.data = list
    currentData.value = current.data
    currentPage.value = current.page
    currentTotal.value = current.total
  })
}
const handleChange = (type: number) => {
  activeType = type
  getFavorite()
}
getFavorite()
const changePage = (index: number) => {
  const current = typeData.find((v: any) => v.type === activeType) || {} as any
  current.page = index
  getFavorite()
}
// 全选
const isCheckAll = ref(false)
// 删除所选
let loading = false
const doDel = () => {
  if (loading) return
  const delIds = listData.filter((v: any) => v.isCheck).map((v: any) => v.id)
  if (delIds.length === 0) return ElMessage.error('请选择要删除的数据')
  // 删除
  loading = true
  loading = false
  getFavorite()
}
// 全选/取消全选
const isCheckAllChange = () => {
  listData.value.forEach((v: any) => v.isCheck = isCheckAll.value)
}
const itemChange = () => {
  isCheckAll.value = listData.value.every((v: any) => v.isCheck)
}
// 格式化日期
const fmtDate = (str: string) => {
  return Dayjs(str).format('YYYY-MM-DD-HH:mm')
}
const router = useRouter()
// 跳转到详情页面
const navToDetail = (id: number) => {
  router.push({
    path: '/detail',
    query: {
      id
    }
  })
}
</script>

<style lang="scss" scoped>
.item {
  padding: 20px 0;
  border-bottom: 1px solid #F3F3F3;
}

.time {
  font-size: 13px;
  color: #777777;
}

.btn {
  width: 84px;
  height: 32px;
  background: #1F73F1;
  border: 1px solid #1F73F1;
  border-radius: 5px;
  color: white;
  margin-left: 20px;
}

::v-deep(.header) {
  padding-left: 0;
  padding-right: 0;
}

.link {
  cursor: pointer;

  &:hover {
    color: #1E84FF;
  }
}
</style>