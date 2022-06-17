<template>
  <div>
    <div class="grid grid-cols-3 gap-10 mt-40">
      <div v-for="item in listData" class="item">
        <div class="flex">
          <img :src="HEAD_DOMAIN + item.head" alt="" class="w-50 h-50 app-round mr-22">
          <div class="flex-1">
            <p class="color-303030 mb-10 pr-70">{{ item.nick_name }}</p>
            <p v-if="item.position" class="color-6A6A6A fs-12 mb-6">{{ item.position }}</p>
            <p v-if="item.company" class="color-6A6A6A fs-12">{{ item.company }}</p>
          </div>
        </div>
        <div class="bottom flex mt-30 justify-end items-center">
          <span class="del-btn" @click="revocation({ id: item.id })">删除申请</span>
        </div>
        <button class="btn">已申请</button>
      </div>
    </div>
    <Empty v-if="listData.length === 0" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Empty from '@/components/Empty.vue';
import { manageFriendapplyAPI, agreeFriendapplyAPI, putDelapplyAPI } from '@/utils/api'
import { HEAD_DOMAIN } from '@/utils/const';
import { ElMessage, ElMessageBox } from 'element-plus';
import { once } from '@/utils';

// 发出的好友申请
const listData = ref<any>([])
const getData = () => {
  manageFriendapplyAPI({ type: 2 }).then(res => {
    listData.value = res.data.data
  })
}
getData()

// 删除申请
const revocation = once((done: Function, payload: any) => {
  ElMessageBox.confirm(`确定删除申请吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    putDelapplyAPI({ applyid: payload.id }).then(() => {
      ElMessage.success('删除成功')
      getData()
      done()
    }).catch(() => {
      done()
    })
  }).catch(() => {
    done()
  })
})
</script>

<style lang="scss" scoped>
@import '@/views/message/friends.scss';

.del-btn {
  color: #FD1D1D;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.item .btn {
  border: 1px solid #BDBDBD;
  color: #BDBDBD;
  cursor: default;
}
</style>