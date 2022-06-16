<template>
  <div>
    <div class="grid grid-cols-3 gap-10 mt-40">
      <div v-for="item in listData" class="item">
        <div class="flex">
          <img :src="HEAD_DOMAIN + item.head" alt="" class="w-50 h-50 app-round mr-22">
          <div class="flex-1">
            <p class="color-303030 mb-10">{{ item.nick_name }}</p>
            <p v-if="item.position" class="color-6A6A6A fs-12 mb-6">{{ item.position }}</p>
            <p v-if="item.company" class="color-6A6A6A fs-12">{{ item.company }}</p>
          </div>
        </div>
        <div class="flex justify-end">
          <div class="bottom-item app-flex-center mr-10" @click="setState(item.member_id, 2)">
            <el-icon>
              <Close />
            </el-icon>
          </div>
          <div class="bottom-item primary app-flex-center" @click="setState(item.member_id, 1)">
            <el-icon>
              <Check />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
    <Empty v-if="listData.length === 0" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Empty from '@/components/Empty.vue';
import { manageFriendapplyAPI, agreeFriendapplyAPI } from '@/utils/api'
import { HEAD_DOMAIN } from '@/utils/const';
import { ElMessage, ElMessageBox } from 'element-plus';

const listData = ref<any>([])
const getData = () => {
  manageFriendapplyAPI({ type: 1 }).then(res => {
    listData.value = res.data.data
  })
}
getData()
// 通过(1)/不同意(2)
let loading = false
const setState = (member_id: number, type: number) => {
  if (loading) return
  ElMessageBox.confirm(`确定${type === 1 ? '同意' : '不同意'}吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    loading = true
    agreeFriendapplyAPI({
      toid: member_id,
      status: type
    }).then(() => {
      ElMessage.success('操作成功')
      loading = false
      // 刷新数据
      getData()
    }).catch(() => {
      loading = false
    })
  }).catch(() => {
  })
}
</script>

<style lang="scss" scoped>
@import '@/views/message/friends.scss';

.bottom-item {
  width: 67px;
  height: 25px;
  border: 1px solid #C1C1C1;
  color: #a6a6a6;
  border-radius: 13px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    border-color: #1F73F1;
    color: #1F73F1;
  }
}

.check-icon {
  width: 15px;
  height: 10px;
}

.x-icon {
  width: 10px;
  height: 10px;
}
</style>