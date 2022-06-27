<template>
  <div>
    <div class="grid grid-cols-3 gap-10 mt-40">
      <div v-for="item in friends" class="item">
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
              <span class="color-0078FF flex items-center cursor-pointer flex-shrink-0">
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
        <button class="btn">发信息</button>
      </div>
    </div>
    <Empty v-if="friends.length === 0" />
    <Remark ref="remarkRef" @update="getData" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Remark from './Remark.vue';
import Empty from '@/components/Empty.vue';
import useFriends from '../composables/useFriends'

// 添加备注
const remarkRef = ref()
const openRemark = (id: number) => {
  remarkRef.value.open(id)
}

const { friends, search, delFriend, getData } = useFriends()
getData()

defineExpose({
  search
})
</script>

<style lang="scss" scoped>
@import '@/views/message/friends.scss';


</style>