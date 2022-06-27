<template>
  <div class="box flex flex-col">
    <div class="header flex justify-between items-center py-22 pl-20 pr-16">
      <span>消息盒子</span>
      <span class="clear cursor-pointer" @click="clear">清空</span>
    </div>
    <div class="flex-1">
      <div v-for="item in messageList" class="msg flex items-center cursor-pointer" @click="nav('/message/inform')">
        <span class="truncate flex-1">{{ `[${item.type}]${item.content}` }}</span>
        <!-- <span class="count app-flex-center">2</span> -->
      </div>
      <Empty v-if="messageList.length === 0" />
    </div>
    <div class="footer py-16 text-center cursor-pointer" @click="nav('/message/inform')">查看全部</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getMessageAPI } from '@/utils/api';
import Empty from '@/components/Empty.vue';

const call = defineEmits(['change'])
// 消息
const messageList = ref<any>([])
getMessageAPI().then(res => {
  messageList.value = res.data.data.map((val: any) => {
    val.type = '公告'
    return val
  })
  call('change', messageList.value.length)
})
const clear = () => {
  messageList.value.length = 0
  call('change', messageList.value.length)
}

const router = useRouter()
const nav = (path: string) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>
.box {
  width: 302px;
  height: 366px;
  position: absolute;
  background: white;
  right: 0;
  z-index: 10;
  box-shadow: 0px 0px 24px 0px rgba(73, 73, 73, 0.38);
}

.header {
  border: 1px solid #E4E4E4;
}

.footer {
  border-top: 1px solid #E4E4E4;
}

.clear {
  font-size: 13px;
  color: #7B7B7B;
}

.msg {
  height: 56px;
  padding: 0 16px 0 16px;
  border-bottom: 1px solid #F5F5F5;
  font-size: 15px;

  &:hover {
    background: #F8FAFA;
  }

  .count {
    width: 20px;
    height: 16px;
    background: #B3B3B3;
    border-radius: 8px;
    font-size: 12px;
    color: white;
  }
}
</style>