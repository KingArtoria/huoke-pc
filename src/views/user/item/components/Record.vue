<template>
  <div>
    <el-table v-if="listData.length" :data="listData" class="mt-10"
      :header-cell-style="{ background: '#F3F3F3', color: '#1B1B1B', 'font-weight': 'normal', 'padding': '16px 0' }">
      <el-table-column label="道具名称">
        <template #default="scope">
          <div class="flex items-center">
            <div class="img-wrap app-flex-center">
              <img :src="DOMAIN + scope.row.image" alt="" class="img">
            </div>
            <span>{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="兑换时间" prop="create_time" :formatter="create_timeFmt" align="center" width="300">
      </el-table-column>
      <el-table-column label="兑换数量" prop="num" align="center" width="200"></el-table-column>
    </el-table>
    <Empty v-else />
  </div>
</template>
<script setup lang="ts">
import { couponsLogAPI } from '@/utils/api';
import { ref } from 'vue';
import Empty from '@/components/Empty.vue';
import { DOMAIN } from '@/utils/const'
import dayjs from 'dayjs'

// 兑换记录
const listData = ref<any>([])
couponsLogAPI().then(res => {
  listData.value = res.data.data.filter((val: any) => val.type === '积分兑换')
})
const create_timeFmt = (row: any) => {
  return dayjs(row.create_time).format('YYYY-MM-DD-HH:mm')
}
</script>

<style lang="scss" scoped>
.img-wrap {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #F6F6F6;
  margin-right: 16px;

  .img {
    width: 67px;
    height: 42px;
  }
}
</style>   
