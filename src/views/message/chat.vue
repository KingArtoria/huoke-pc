<template>
  <div>
    <div class="content ml-24">
      <!-- 聊天区 -->
      <div class="content_1">
        <template v-if="isSessionActive">
          <!-- 头部 -->
          <div class="content_1_1">
            <img :src="loadImg('fanhui_lt@2x.webp')" class="content_1_1_1" @click="router.back()">
            <div class="content_1_1_2">
              <div class="content_1_1_2_1">
                <div class="content_1_1_2_1_1">{{ target.nick_name }}</div>
                <VipIcon :item="getVipLevel(target.maxvip)" />
              </div>
              <div class="content_1_1_2_2">{{ target.company }}</div>
            </div>
            <el-popover placement="bottom" :width="120" trigger="hover">
              <template #reference>
                <img :src="loadImg('jubao_red.png')" class="content_1_1_3">
              </template>
              <ul class="action-item-wrap">
                <li class="action-item" @click="reportVisible = true">投诉</li>
                <li class="action-item" @click="delSession">删除对话</li>
              </ul>
            </el-popover>
          </div>
          <!-- 对话区域 -->
          <div class="main">
            <el-scrollbar style="height: 100%" ref="scrollbarRef">
              <div class="pr-30">
                <div v-for="item in messageList" :key="item.messageId">
                  <!-- 日期 -->
                  <div v-if="item.type === 'date'" class="my-20 flex justify-center">
                    <div class="date app-flex-center">{{ item.payload }}</div>
                  </div>
                  <!-- 文本消息 -->
                  <div v-if="item.type === 'text'" class="flex my-20"
                    :class="item.senderId == self.member_id ? 'self' : 'target'">
                    <div class="w-50 h-50 head">
                      <!-- 判断发送方是不是自己，如果是则用自己的头像，否则用对方的头像 -->
                      <img :src="headPrefix(item.senderId == self.member_id ? self.head : target.head)" alt="" class="head-img">
                    </div>
                    <div class="text">
                      {{ item.payload.text }}
                    </div>
                    <div class="pt-16">
                      <span class="time">{{ item.time }}</span>
                    </div>
                  </div>
                  <!-- 手机号和微信号 -->
                  <div v-if="item.type === 'phone'" class="my-20 flex justify-center">
                    <div class="phone app-flex-center">
                      <span>{{ item.payload.nick_name + '的' + item.payload.type + '：' + item.payload.value }}</span>
                      <span class="link" @click="doCopy(item.payload.value)">复制</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>
          <!-- 发送消息 -->
          <div class="write pt-20 px-30 flex">
            <div class="w-50 h-50 head mr-14">
              <img :src="headPrefix(self.head)" alt="" class="head-img">
            </div>
            <div class="flex-1">
              <el-input type="textarea" :rows="4" v-model="message" show-word-limit :maxlength="600"
                @keyup.enter="send" />
              <div class="flex justify-between items-center mt-16">
                <ul class="flex options pl-8 items-center">
                  <li>
                    <el-popover placement="bottom-start" :width="404" trigger="hover">
                      <template #reference>
                        <div class="flex items-center cursor-pointer">
                          <img :src="loadImg('jingh.png')" alt="">
                          <span class="ml-8 mr-20">常用语</span>
                          <div class="line"></div>
                        </div>
                      </template>
                      <div class="text-option">
                        <div class="option-head">常用语</div>
                        <ul class="py-10">
                          <li v-for="(item, index) in textOptions" :key="index" class="option-item"
                            @click="message = item">{{ item }}</li>
                        </ul>
                      </div>
                    </el-popover>
                  </li>
                  <li>
                    <el-tooltip class="box-item" effect="dark" content="点击向对方发送手机号" placement="top" :show-after="500">
                      <div class="flex items-center cursor-pointer" @click="sendPhone">
                        <img :src="loadImg('dianhua1.png')" alt="">
                        <span class="ml-8 mr-20">手机</span>
                        <div class="line"></div>
                      </div>
                    </el-tooltip>
                  </li>
                  <li>
                    <el-tooltip class="box-item" effect="dark" content="点击向对方发送微信号" placement="top" :show-after="500">
                      <div class="flex items-center cursor-pointer" @click="sendWx">
                        <img :src="loadImg('weixin.png')" alt="">
                        <span class="ml-8 mr-20">微信</span>
                      </div>
                    </el-tooltip>
                  </li>
                </ul>
                <button class="btn" :class="{ disabled: disabled }" @click="send">回复</button>
              </div>
            </div>
          </div>
        </template>
        <Empty v-else>没有正在进行中的会话</Empty>
      </div>
      <!-- 联系人 -->
      <div class="contacts">
        <div class="contacts-header">私信列表</div>
        <div>
          <div v-for="item in sessionList" :key="item.member_id" class="flex contacts-item"
            @click="changeSession(item)">
            <div class="w-40 h-40 head mr-16">
              <img :src="headPrefix(item.head)" alt="" class="head-img">
            </div>
            <div class="flex-1">
              <p class="flex">
                <span class="truncate flex-1">{{ item.nick_name }}</span>
                <span class="flex-shrink-0 time">{{ item.date }}</span>
              </p>
              <p class="text">{{ item.content }}</p>
            </div>
          </div>
          <Empty v-if="sessionList.length === 0" />
        </div>
      </div>
    </div>
    <Report v-if="reportVisible" v-model="reportVisible" :user-id="target.member_id" />
  </div>
</template>

<script setup lang="ts">
import useGoEasy from '@/composables/useGoEasy'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { getUser, loadImg, getVipLevel, once, headPrefix } from '@/utils';
import GoEasy from 'goeasy';
import dayjs from 'dayjs'
import VipIcon from '@/components/VipIcon.vue'
import { useRoute, useRouter } from 'vue-router';
import { getMemberInfoAPI, userInfoAPI } from '@/utils/api';
import Empty from '@/components/Empty.vue'
import { ElMessageBox, ElMessage } from 'element-plus';
import { useClipboard } from '@vueuse/core';
import Report from './components/Report.vue'

interface IMsg {
  messageId: string; // 消息唯一标识，由goeasy分配
  receiverId: string | number; // 接收者id
  senderId: string | number; // 发送者id
  date: string; // 消息发出的日期
  time: string; // 消息发出的时间
  read: boolean; // 对方是否已读
  status: boolean; // 消息是否发送成功
  type: string; // 消息种类 text|phone
  payload: any; // 消息主体
  timestamp?: string;
}

const route = useRoute()
const router = useRouter()
// 尝试从路由参数里获取聊天对象id
const targetUserId = route.query.userId

// 自己
const self = ref<IUser>({} as IUser)
// 聊天对象(对方)
const target = ref<IUser>({} as IUser)
// 是否有正在进行中的会话
const isSessionActive = ref(false)
// 投诉表单
const reportVisible = ref(false)

// 更详细的用户信息（用来获取手机号和微信号）
const memberInfo = ref<any>({})
userInfoAPI().then(res => {
  memberInfo.value = res.data.data.user_info
})

// 初始化GoEasy
const goeasy = useGoEasy()
const im = goeasy.im;
// 添加监听
const initListen = () => {
  // 监听消息
  im.on(GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, (message: any) => {
    if (messageList.value.length) {
      const date = dayjs(message.timestamp).format('YYYY-MM-DD')
      const lastMsgDate = messageList.value[messageList.value.length - 1].date
      // 两条消息的发送日期不一样时，插入日期
      if (date !== lastMsgDate) {
        const _message = JSON.parse(JSON.stringify(message))
        _message.status = message.status === 'success'
        _message.type = 'date'
        _message.payload = dayjs(message.timestamp).format('YYYY/MM/DD')
        pushMessage(_message)
      }
    }
    message.read = true
    message.status = true
    pushMessage(message)
    scrollToBottom()
    im.markPrivateMessageAsRead({
      userId: target.value.member_id,  //聊天对象的userId
    });
  })
  // 处理会话
  const handleSession = (arr: any) => {
    sessionList.value = arr.map((val: any) => {
      let content = ''
      if (val.lastMessage.type === 'text') {
        content = val.lastMessage.payload.text
      } else if (val.lastMessage.type === 'phone') {
        content = val.lastMessage.payload.nick_name + '的' + val.lastMessage.payload.type + '：' + val.lastMessage.payload.value
      }
      return {
        member_id: val.userId,
        head: val.data.head,
        nick_name: val.data.nick_name,
        content,
        date: dayjs(val.lastMessage.timestamp).format('YYYY/MM/DD HH:mm'),
        maxvip: val.data.maxvip,
        company: val.data.company,
      }
    })
    // 如果没有选择会话，默认选中第一个
    if (!isSessionActive.value && sessionList.value.length) {
      changeSession(sessionList.value[0])
    } else if (isSessionActive.value && targetUserId) {
      changeSession(target.value)
    }
  }
  // 获取最新的100条会话记录
  im.latestConversations({
    onSuccess: function (result: any) {
      handleSession(result.content.conversations)
    },
  });
  //监听会话列表更新
  im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (result: any) => {
    handleSession(result.conversations)
  });
}

// 用户输入的消息
const message = ref('')
// 常用语
const textOptions = [
  '您好，我有您需要的资源可合作。',
  '您好，我想了解这个资源，方便聊聊吗？',
  '您好，合作有什么要求吗？'
]
// 未输入消息时，禁用发送按钮
const disabled = computed(() => {
  return message.value.trim().length === 0
})
// 聊天框消息
const messageList = ref<IMsg[]>([])
// 把消息渲染到聊天框里
const pushMessage = (message: IMsg) => {
  messageList.value.push({
    messageId: message.messageId,
    receiverId: message.receiverId,
    senderId: message.senderId,
    date: dayjs(message.timestamp).format('YYYY-MM-DD'),
    time: dayjs(message.timestamp).format('HH:mm'),
    read: message.read,
    status: message.status,
    type: message.type,
    payload: message.payload
  })
}
// 发送消息
const send = () => {
  if (disabled.value) {
    return
  }
  // 创建并发送文本消息
  //创建消息, 内容最长不超过3K，可以发送字符串，对象和json格式字符串
  let textMessage = im.createTextMessage({
    text: message.value, //消息内容
    to: {
      type: GoEasy.IM_SCENE.PRIVATE,   //私聊还是群聊，群聊为GoEasy.IM_SCENE.GROUP
      id: target.value.member_id,
      data: target.value //好友扩展数据, 任意格式的字符串或者对象，用于更新会话列表conversation.data
    }
  });
  // 发送后清空消息
  message.value = ''
  sendMessage(textMessage)
}
// 发送文本消息和自定义模板消息
const sendMessage = (messagePayload: any) => {
  im.sendMessage({
    message: messagePayload,
    onSuccess: function (message: any) { //发送成功
      if (messageList.value.length) {
        const date = dayjs(message.timestamp).format('YYYY-MM-DD')
        const lastMsgDate = messageList.value[messageList.value.length - 1].date
        // 两条消息的发送日期不一样时，插入日期
        if (date !== lastMsgDate) {
          const _message = JSON.parse(JSON.stringify(message))
          _message.status = message.status === 'success'
          _message.type = 'date'
          _message.payload = dayjs(message.timestamp).format('YYYY/MM/DD')
          pushMessage(_message)
        }
      }
      message.status = message.status === 'success'
      pushMessage(message)
      scrollToBottom()
    },
  });
}
// 发送手机号
const sendPhone = once((done: Function) => {
  if (!memberInfo.value.phone) {
    ElMessage.error('您没有填写手机号')
    done()
    return
  }
  var customMessage = im.createCustomMessage({
    type: 'phone',  //字符串，可以任意自定义类型，比如红包'hongbao', 订单'order，处方'chufang'
    payload: {
      nick_name: memberInfo.value.nick_name,
      type: '手机号',
      value: memberInfo.value.phone
    },
    to: {
      type: GoEasy.IM_SCENE.PRIVATE,   //私聊还是群聊，群聊为GoEasy.IM_SCENE.GROUP
      id: target.value.member_id,
      data: target.value //好友扩展数据, 任意格式的字符串或者对象，用于更新会话列表conversation.data
    }
  })
  sendMessage(customMessage)
})
// 发送微信
const sendWx = once((done: Function) => {
  if (!memberInfo.value.wx) {
    ElMessage.error('您没有填写微信号')
    done()
    return
  }
  var customMessage = im.createCustomMessage({
    type: 'phone',  //字符串，可以任意自定义类型，比如红包'hongbao', 订单'order，处方'chufang'
    payload: {
      nick_name: memberInfo.value.nick_name,
      type: '微信号',
      value: memberInfo.value.wx
    },
    to: {
      type: GoEasy.IM_SCENE.PRIVATE,   //私聊还是群聊，群聊为GoEasy.IM_SCENE.GROUP
      id: target.value.member_id,
      data: target.value //好友扩展数据, 任意格式的字符串或者对象，用于更新会话列表conversation.data
    }
  })
  sendMessage(customMessage)
})

// 复制手机号和微信号
const source = ref('')
const { copy } = useClipboard({ source })
const doCopy = (val: string) => {
  source.value = val
  copy()
  ElMessage.success('复制成功')
}

// 会话列表
const sessionList = ref<any[]>([])
// 删除会话
const delSession = () => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: "确定",
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    isSessionActive.value = false
    im.removePrivateConversation({
      userId: target.value.member_id,
    });
  }).catch(() => {
  })
}
// 切换会话
const changeSession = (item: IUser) => {
  target.value = item
  messageList.value.length = 0
  isSessionActive.value = true
  // 拉取和这个用户的聊天记录
  im.history({
    userId: target.value.member_id,  //对方userId
    // lastTimestamp: lastMessage.timestamp, //上次查询结果里最后一条消息的时间戳，首次查询传入null即可
    // limit: 10, //可选项，返回的消息条数，默认为10条，最多30条
    onSuccess: function (result: any) {
      if (result.content.length) {
        let lastMsgDate = dayjs(result.content[0].timestamp).format('YYYY-MM-DD')
        result.content.forEach((val: any) => {
          const date = dayjs(val.timestamp).format('YYYY-MM-DD')
          if (date !== lastMsgDate) {
            lastMsgDate = date
            const _message = JSON.parse(JSON.stringify(val))
            _message.receiverId = ''
            _message.status = true
            _message.type = 'date'
            _message.payload = dayjs(val.timestamp).format('YYYY/MM/DD')
            pushMessage(_message)
          }
          val.receiverId = ''
          val.status = true
          pushMessage(val)
        })
      }
      scrollToBottom()
      im.markPrivateMessageAsRead({
        userId: target.value.member_id,  //聊天对象的userId
      });
    },
  });
}

// 在收到新消息和切换聊天时，自动滚动到最底部
const scrollbarRef: any = ref()
const scrollToBottom = () => {
  nextTick(() => {
    scrollbarRef.value.wrap$.scrollTop = scrollbarRef.value.wrap$.scrollHeight
  })
}

onMounted(async () => {
  // 获取聊天对象信息（如果有）
  if (targetUserId) {
    const res = await getMemberInfoAPI({ id: targetUserId })
    res.data.data.member_id = targetUserId
    target.value = res.data.data
    isSessionActive.value = true
  }
  // 获取自己的账号数据
  const temp = getUser() as IUser
  const res = await getMemberInfoAPI({ id: temp.member_id })
  res.data.data.member_id = temp.member_id
  self.value = res.data.data
  if (goeasy.getConnectionStatus() === 'disconnected') {
    // 建立连接
    goeasy.connect({
      id: self.value.member_id,
      data: self.value,
      onSuccess() {
        initListen()
      },
    })
  } else {
    initListen()
  }
})

onBeforeUnmount(() => {
  //断开连接
  if (goeasy.getConnectionStatus() !== 'disconnected') {
    goeasy.disconnect({});
  }
})
</script>

<style lang="scss" scoped>
@import './chat.scss';
</style>