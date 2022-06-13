<template>
  <div class="p-34 bg-white">
    <p class="fs-18 mb-20">我的收藏</p>
    <KindTab @change="handleChange" />
    <div v-if="currentType.data.length !== 0" class="flex items-center mt-20">
      <el-checkbox v-model="isCheckAll" @change="isCheckAllChange"><span class="fs-16 color-1B1B1B ml-2">全选</span>
      </el-checkbox>
      <button class="btn" @click="doDel">删除</button>
    </div>
    <div v-for="item in currentType.data" class="flex items-center item">
      <el-checkbox v-model="item.isCheck" @change="itemChange"></el-checkbox>
      <p class="ml-10 fs-16">{{ item.title }}</p>
      <span class="ml-auto time">{{ item.date }}</span>
    </div>
    <!-- 无数据 -->
    <Empty v-if="currentType.data.length === 0" />
    <!-- 分页 -->
    <footer v-if="currentType.data.length !== 0" class="footer flex justify-center">
      <el-pagination :current-page="currentType.page" :total="currentType.total" background
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

const typeData = COOPERATION_TYPES.map((v: any) => {
  return {
    type: v.value,
    data: [],
    page: 1,
    total: 0,
  }
})
let activeType = 1
const currentType = computed(() => {
  return typeData.find((v: any) => v.type === activeType) || {} as any
})
// 获取收藏
const getFavorite = () => {
  const current = typeData.find((v: any) => v.type === activeType) || {} as any
  favoriteAPI({ type: activeType, page: current.page }).then(res => {
    const { list, num } = res.data.data
    current.total = num
    list.forEach((v: any) => v.isCheck = false)
    current.data = list
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
</style>