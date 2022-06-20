<template>
  <div class="page">
    <KindTab @change="handleChange" />
    <!-- 列表 -->
    <div v-if="listData.length" class="list">
      <el-table
        :header-cell-style="{ background: '#F3F3F3', color: '#1B1B1B', 'font-weight': 'normal', 'padding': '16px 0' }"
        :data="listData" :highlight-current-row="false">
        <el-table-column label="合作标题" prop="title">
          <template #default="scope">
            <p class="link" @click="navToDetail(scope.row.id)">{{ scope.row.title }}</p>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="addtime" :formatter="addtimeFmt" align="center" width="200">
        </el-table-column>
        <el-table-column label="浏览量" prop="viewcount" align="center" width="160"></el-table-column>
      </el-table>
    </div>
    <Empty v-else />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs';
import { memberProjectAPI } from '@/utils/api'
import KindTab from '@/components/KindTab.vue';
import { useRouter } from 'vue-router';
import Empty from '@/components/Empty.vue';

// 列表数据
const listData = ref<any>([])
const handleChange = (type: number) => {
  memberProjectAPI({ type }).then(res => {
    listData.value = res.data.data
  })
}
handleChange(1)
const addtimeFmt = (row: any) => {
  return dayjs(row.addtime).format('YYYY-MM-DD-HH:mm')
}
const router = useRouter()
// 跳转到详情页面
const navToDetail = (id: number) => {
  router.push(`/detail/${id}`)
}
</script>

<style lang="scss" scoped>
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

::v-deep(.el-table) {
  font-size: 16px;
  color: #1b1b1b;
}

::v-deep(.el-table .el-table__header-wrapper) {
  font-size: 15px;
}

.link {
  cursor: pointer;

  &:hover {
    color: #1E84FF;
  }
}
</style>