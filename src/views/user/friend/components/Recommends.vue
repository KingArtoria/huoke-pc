<template>
  <div>
    <div class="grid grid-cols-3 gap-10 mt-40">
      <div v-for="item in friends" class="item">
        <div class="flex">
          <img :src="loadImg('banner_big@2x.png')" alt="" class="w-50 h-50 app-round mr-22">
          <div class="flex-1">
            <p class="color-303030 mb-10">{{ item.name }}</p>
            <p class="color-6A6A6A fs-12 mb-6">{{ item.posi }}</p>
            <p class="color-6A6A6A fs-12">{{ item.comp }}</p>
          </div>
        </div>
        <div class="bottom flex justify-between items-center mt-30">
          <span class="color-56689B">{{ item.count }}条合作信息</span>
        </div>
        <button class="btn" @click="addFriend(item.id)">加好友</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils';
import VipIcon from '@/components/VipIcon.vue';
import { addFriendapplyAPI } from '@/utils/api';
import { ElMessage } from 'element-plus';

const friends = ref<any>([
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
])
// 获取推荐列表
const getData = () => {
  // getFriendListAPI({ page: pageIndex.value, num: 10, nick_name: searchText }).then(res => {
  //   friends.value = res.data.data
  //   total.value = res.data.num
  // })
}

let loading = false
const addFriend = (toid: number) => {
  if (loading) return
  loading = true
  addFriendapplyAPI({ toid }).then(() => {
    loading = false
    ElMessage.success('添加成功')
    // 刷新推荐列表
  }).catch(() => {
    loading = false
  })
}

</script>

<style lang="scss" scoped>
@import '@/views/message/friends.scss'
</style>