<template>
  <div class="bg-white">
    <p class="title">全部通知</p>
    <div v-for="item in friendRequest" :key="item.id" class="item relative">
      <img :src="item.head" alt="" class="w-60 h-60 app-round mr-24">
      <div class="flex-1">
        <p class="flex items-end color-989898">
          <span class="fs-16 mr-20">好友请求</span>
        </p>
        <p class="fs-16 color-1b1b1b mt-16"><span class="light">{{ item.nick_name }}</span>请求加您为好友,同行{{ item.count
        }}个共同好友</p>
        <div class="right flex">
          <div class="right-item app-flex-center mr-40" @click="setState(item.member_id, 2)">
            <img :src="loadImg('jujue@2x.webp')" alt="" class="x-icon">
          </div>
          <div class="right-item app-flex-center" @click="setState(item.member_id, 1)">
            <img :src="loadImg('tongyi@2x.webp')" alt="" class="check-icon">
          </div>
        </div>
      </div>
    </div>
    <div v-for="item in notify" :key="item.id" class="item" @click="clickNotify(item.url)">
      <img src="http://39.106.208.234/pic/img_/zs.png" alt="" class="w-60 h-60 app-round mr-24">
      <div class="flex-1">
        <p class="flex items-end color-989898">
          <span class="fs-16 mr-20">公告</span>
        </p>
        <p class="fs-16 color-1b1b1b mt-16">{{ item.content }}</p>
        <img :src="item.pic" alt="" class="mt-10">
      </div>
    </div>
    <Empty v-if="friendRequest.length === 0 && notify.length === 0" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils';
import { manageFriendapplyAPI, agreeFriendapplyAPI, getMessageAPI } from '@/utils/api'
import { ElMessage, ElMessageBox } from 'element-plus';
import Empty from '@/components/Empty.vue';

// 好友请求
const friendRequest = ref<any>([])
const getData = () => {
  manageFriendapplyAPI({ type: 1 }).then(res => {
    friendRequest.value = res.data.data
  })
}
getData()
// 通过(1)/不同意(2)
let loading = false
const setState = (member_id: number, type: number) => {
  if (loading) return
  ElMessageBox.confirm(`确定${type === 1 ? '同意' : '拒绝'}吗？`, '提示', {
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

// 公告
const notify = ref<any>([])
getMessageAPI().then(res => {
  notify.value = res.data.data
})
// 打开公告链接
const clickNotify = (url: string) => {
  if (url) {
    window.open(url)
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding: 28px 60px 40px 46px;
  border-bottom: 1px solid #f3f3f3;
  display: flex;

  .right {
    position: absolute;
    right: 60px;
  }

  .right-item {
    width: 47px;
    height: 31px;
    background: #F6F6F6;
    border-radius: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      background: #e9e9e9;
    }
  }

  .check-icon {
    width: 15px;
    height: 11px;
  }

  .x-icon {
    width: 12px;
    height: 11px;
  }
}

.title {
  font-size: 16px;
  color: #393939;
  padding: 18px 0 20px 46px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 15px;
    background: #1F73F1;
    left: 34px;
  }
}

.color-989898 {
  color: #989898;
}

.color-1b1b1b {
  color: #1b1b1b;
}

.light {
  color: #1F73F1;
}
</style>