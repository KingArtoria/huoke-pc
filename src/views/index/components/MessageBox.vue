<template>
  <div class="box flex flex-col">
    <div class="header flex justify-between items-center py-22 pl-20 pr-16">
      <span>消息盒子</span>
      <span class="clear cursor-pointer" @click="clear">清空</span>
    </div>
    <div class="flex-1 overflow-auto">
      <template v-for="item in messageList">
        <div class="msg flex items-center cursor-pointer" @click="handleMsg(item)">
          <span class="truncate flex-1">{{ `[${item.type}]${item.content}` }}</span>
          <span v-if="item.type === '聊天'" class="count app-flex-center">{{ item.payload.unread }}</span>
        </div>
      </template>
      <div v-if="messageList.length === 0" class="h-full app-flex-center">
        <Empty />
      </div>
    </div>
    <div v-if="messageList.length !== 0" class="footer py-16 text-center cursor-pointer"
      @click="nav('/message/inform')">查看全部</div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getMemberInfoAPI, manageFriendapplyAPI } from '@/utils/api';
import Empty from '@/components/Empty.vue';
import { emitter, getUser } from '@/utils/index'
import usePull from '@/composables/usePull'
import { EVENT } from '@/utils/const';
import useGoEasy from '@/composables/useGoEasy';
import GoEasy from 'goeasy';

interface IMessage {
  type: string; // 消息类型
  content: string; // 消息内容
  payload?: any; // 消息附加数据
}

/**
 * change 通知父组件消息数量
 */
const call = defineEmits(['change'])
// 消息
const messageList = ref<IMessage[]>([])
// 好友请求
const friendRequest = ref<any[]>([])
// 聊天
const chatList = ref<IMessage[]>([])

const updateMessageCount = () => {
  messageList.value = [...friendRequest.value, ...chatList.value]
  call('change', friendRequest.value.length + chatList.value.reduce((sum, val) => { return sum + val.payload.unread }, 0))
}

// 获取好友请求
const getFriendRequest = () => {
  manageFriendapplyAPI({ type: 1 }).then(res => {
    friendRequest.value = res.data.data.map((val: any) => {
      return {
        type: '好友',
        content: `${val.nick_name}请求添加您为好友`
      }
    })
    updateMessageCount()
  })
}
const goeasy: GoEasy = useGoEasy()
const im = goeasy.im;
// 获取自己的账号数据
const self = ref<IUser>({} as IUser)
const temp = getUser() as IUser
const initListen = () => {
  im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (result: any) => {
    chatList.value = result.conversations.map((val: any) => {
      return {
        type: '聊天',
        payload: {
          userId: val.userId,
          unread: val.unread
        },
        content: `${val.data.nick_name}：${val.lastMessage.payload.text}`
      }
    })
    updateMessageCount()
  });
}
getMemberInfoAPI({ id: temp.member_id }).then(res => {
  res.data.data.member_id = temp.member_id
  self.value = res.data.data
  // connected disconnected
  if (goeasy.getConnectionStatus() === 'disconnected') {
    goeasy.connect({
      id: self.value.member_id,
      data: self.value,
      onSuccess() {
        console.log('链接成功');
        initListen()
      },
      onFailed(err: any) {
        console.log(err.code, err.content);
      },
      onProgress() {
        console.log('连接中');
      }
    })
  } else {
    initListen()
  }

})

// 每隔30秒执行一次轮询任务
const { stopPull } = usePull(() => {
  // 获取好友请求
  getFriendRequest()
}, 30 * 1000, true)

emitter.on(EVENT.FRIEND_REQUEST, getFriendRequest)
onBeforeUnmount(() => {
  stopPull()
  emitter.off(EVENT.FRIEND_REQUEST, getFriendRequest)
  //断开连接
  if (goeasy.getConnectionStatus() !== 'disconnected') {
    goeasy.disconnect({
      onSuccess: function () {
        console.log("GoEasy disconnect successfully.")
      },
      onFailed: function (error: any) {
        console.log("Failed to disconnect GoEasy, code:" + error.code + ",error:" + error.content);
      }
    });
  }
})
// 清空所有消息
const clear = () => {
  messageList.value.length = 0
  call('change', messageList.value.length)
}

const router = useRouter()
const nav = (path: string) => {
  router.push(path)
}

const handleMsg = (msg: IMessage) => {
  switch (msg.type) {
    case '好友':
      nav('/message/inform')
      break
    case '聊天':
      nav(`/message/chat?userId=${msg.payload.userId}`)
      break
  }
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

::v-deep(.empty-wrap) {
  padding: 0;
}
</style>