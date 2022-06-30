<template>
  <div class="bg-white">
    <div class="pt-24 px-10 flex items-center justify-between">
      <p class="title">好友共 <span class="color-0078FF">{{ friends.length }}</span> 人</p>
      <div class="flex justify-center">
        <el-input v-model="searchText" placeholder="查找好友" />
        <button class="search-btn" @click="getData">搜索</button>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-10 px-10 mt-40 pb-40">
      <div v-for="(item, index) in friends" class="item" :key="index">
        <div class="flex">
          <img :src="item.head" alt="" class="w-50 h-50 app-round mr-22">
          <div class="flex-1">
            <p class="color-303030 mb-10 pr-70">{{ item.nick_name }}</p>
            <p class="color-6A6A6A fs-12 mb-6">{{ item.position }}</p>
            <p class="color-6A6A6A fs-12">{{ item.company }}</p>
          </div>
        </div>
        <div class="bottom flex justify-between items-center mt-30">
          <span class="remark truncate mr-10" :title="item.remark">备注：{{ item.remark }}</span>
          <el-popover placement="bottom" :width="78" trigger="hover">
            <template #reference>
              <span class="color-0078FF flex items-center cursor-pointer">
                <span class="mr-8">管理</span>
                <el-icon>
                  <CaretBottom />
                </el-icon>
              </span>
            </template>
            <ul>
              <li class="action-item" @click="openRemark(item.id)">备注</li>
              <li class="action-item" @click="delFriend(item)">删除</li>
            </ul>
          </el-popover>
        </div>
        <button class="btn" @click="sendMsg(item.id)">发信息</button>
      </div>
    </div>
    <Empty v-if="friends.length === 0" />
    <Remark ref="remarkRef" @update="getData" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import useFriends from '@/views/user/friend/composables/useFriends';
import Empty from '@/components/Empty.vue';
import Remark from '@/views/user/friend/components/Remark.vue';
import { useRouter } from 'vue-router';

// 添加备注
const remarkRef = ref()
const openRemark = (id: number) => {
  remarkRef.value.open(id)
}
const { friends, searchText, delFriend, getData } = useFriends()
getData()

const router = useRouter()
const sendMsg = (id: number) => {
  router.push({
    path: '/message/chat',
    query: {
      userId: id
    }
  })
}
</script>

<style lang="scss" scoped>
@import './friends.scss';
</style>