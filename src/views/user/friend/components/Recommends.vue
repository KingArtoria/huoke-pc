<template>
  <div>
    <div class="grid grid-cols-3 gap-10 mt-40">
      <div v-for="item in friends" class="item">
        <div class="flex">
          <img :src="HEAD_DOMAIN + item.head" alt="" class="w-50 h-50 app-round mr-22">
          <div class="flex-1">
            <p class="color-303030 mb-10">{{ item.nick_name }}</p>
            <p class="color-6A6A6A fs-12 mb-6">{{ item.position }}</p>
            <p class="color-6A6A6A fs-12">{{ item.company }}</p>
          </div>
        </div>
        <div class="bottom flex justify-between items-center mt-30">
          <span class="color-56689B">{{ item.count }}条合作信息</span>
        </div>
        <button class="btn" @click="addFriend({ id: item.member_id })">加好友</button>
      </div>
    </div>
    <Empty v-if="friends.length === 0" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { HEAD_DOMAIN } from '@/utils/const';
import { addFriendapplyAPI, getRecommendList } from '@/utils/api';
import { ElMessage } from 'element-plus';
import { once } from '@/utils';
import Empty from '@/components/Empty.vue';

const friends = ref<any>([])
// 获取推荐列表
const getData = () => {
  getRecommendList().then(res => {
    // 只显示状态为未添加，且最多只展示9条数据
    friends.value = res.data.data.filter((v: any) => !v.is_add).slice(0, 9)
  })
}
getData()

// 添加好友
const addFriend = once((done: Function, payload?: any) => {
  addFriendapplyAPI({ toid: payload.id }).then((res) => {
    done()
    ElMessage.success(res.data.msg)
  }).catch(() => {
    done()
  })
})

</script>

<style lang="scss" scoped>
@import '@/views/message/friends.scss'
</style>