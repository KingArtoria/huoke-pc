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
              <li class="action-item">删除</li>
            </ul>
          </el-popover>
        </div>
        <button class="btn">发信息</button>
      </div>
    </div>
    <!-- 分页 -->
    <footer class="footer flex justify-center pt-80 pb-60">
      <el-pagination :current-page="pageIndex" :total="total" background layout="total, prev, pager, next, jumper"
        @current-change="changePage" />
    </footer>
    <Remark ref="remarkRef" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils';
import VipIcon from '@/components/VipIcon.vue';
import { getFriendListAPI } from '@/utils/api';
import Remark from './Remark.vue';
import { ElMessage, ElMessageBox, ElPopconfirm } from 'element-plus';

// 添加备注
const remarkRef = ref()
const openRemark = (id: number) => {
  remarkRef.value.open(id)
}
// 删除好友
const delFriend = (friend: any) => {
  ElMessageBox.confirm(`将好友“${friend.nick_name}”删除，将同时删除与该好友的聊天记录`, '删除好友', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success('删除成功')
    // 刷新好友列表
  }).catch(() => {

  })
}

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
let searchText = ''
const pageIndex = ref(1)
const total = ref(0)
const getData = () => {
  getFriendListAPI({ page: pageIndex.value, num: 10, nick_name: searchText }).then(res => {
    friends.value = res.data.data
    total.value = res.data.num
  })
}
const search = (val: string) => {
  searchText = val
  pageIndex.value = 1
  getData()
}

// 翻页
const changePage = (index: number) => {
  pageIndex.value = index
  getData()
}

defineExpose({
  search
})
</script>

<style lang="scss" scoped>
@import '@/views/message/friends.scss'
</style>