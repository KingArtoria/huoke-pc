<template>
  <div>
    <div class="content ml-24">
      <!-- 聊天区 -->
      <div class="content_1">
        <template v-if="isSelectTarget">
          <!-- 头部 -->
          <div class="content_1_1">
            <img :src="loadImg('fanhui_lt@2x.webp')" class="content_1_1_1">
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
                <!-- <li class="action-item" @click="report">举报</li> -->
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
                      <img :src="item.senderId == self.member_id ? self.head : target.head" alt="">
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
              <img :src="self.head" alt="">
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
          <div v-for="item in contactsList" :key="item.member_id" class="flex contacts-item"
            @click="changeTarget(item)">
            <div class="w-40 h-40 head mr-16">
              <img :src="item.head" alt="">
            </div>
            <div class="flex-1 mt-6">
              <p class="flex">
                <span class="truncate flex-1">{{ item.nick_name }}</span>
                <span class="flex-shrink-0 time">{{ item.date }}</span>
              </p>
              <p class="text">{{ item.content }}</p>
            </div>
          </div>
          <Empty v-if="contactsList.length === 0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useGoEasy from '@/composables/useGoEasy'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { getUser, loadImg, getVipLevel, once } from '@/utils';
import GoEasy from 'goeasy';
import dayjs from 'dayjs'
import VipIcon from '@/components/VipIcon.vue'
import { useRoute } from 'vue-router';
import { getMemberInfoAPI, userInfoAPI } from '@/utils/api';
import Empty from '@/components/Empty.vue'
import { ElMessageBox, ElMessage } from 'element-plus';
import { useClipboard } from '@vueuse/core';

interface IMsg {
  messageId: string; // 消息唯一标识，由goeasy分配
  receiverId: string | number; // 接收者id
  senderId: string | number; // 发送者id
  date: string; // 消息发出的日期
  time: string; // 消息发出的时间
  read: boolean; // 对方是否已读
  status: boolean; // 消息是否发送成功
  // content: string; // 消息内容
  type: string; // 消息种类 text|phone
  payload: any; // 消息主体
}

// 自己
const self = ref<IUser>({} as IUser)
// 对方
const target = ref<IUser>({} as IUser)
// 是否选择了一位联系人
const isSelectTarget = ref(false)
const route = useRoute()
// 获取用户id
const targetUserId = route.query.userId
// 用户信息(获取手机号和微信号)
const memberInfo = ref<any>({})
userInfoAPI().then(res => {
  memberInfo.value = res.data.data.user_info
})
// 根据用户id获取用户信息
if (targetUserId) {
  getMemberInfoAPI({ id: targetUserId }).then(res => {
    res.data.data.member_id = targetUserId
    target.value = res.data.data
    isSelectTarget.value = true
  })
}

// 联系人列表
const contactsList = ref<any[]>([])

const goeasy = useGoEasy()
const im = goeasy.im;
onMounted(async () => {
  // 获取自己的账号数据
  const temp = getUser() as IUser
  const res = await getMemberInfoAPI({ id: temp.member_id })
  res.data.data.member_id = temp.member_id
  self.value = res.data.data
  // 建立连接
  goeasy.connect({
    id: self.value.member_id,
    data: self.value,
    onSuccess() {
      console.log('链接成功');
      // 监听消息
      im.on(GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, (message: any) => {
        pushDateMsg(message)
        messageList.value.push({
          messageId: message.messageId,
          receiverId: message.receiverId,
          senderId: message.senderId,
          date: dayjs(message.timestamp).format('YYYY-MM-DD'),
          time: dayjs(message.timestamp).format('HH:mm'),
          read: true,
          status: true,
          type: message.type,
          payload: message.payload
        })
        scrollToBottom()
      })
      const handleSession = (arr: any) => {
        contactsList.value = arr.map((val: any) => {
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
        if (!isSelectTarget.value && contactsList.value.length) {
          changeTarget(contactsList.value[0])
        }
      }
      // 获取最新的100条会话记录
      im.latestConversations({
        onSuccess: function (result: any) {
          handleSession(result.content.conversations)
        },
        onFailed: function (error: any) { //获取失败
          console.log("Failed to get the latest conversations, code:" + error.code + " content:" + error.content);
        },
      });
      //监听会话列表更新
      im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (result: any) => {
        handleSession(result.conversations)
      });

    },
    onFailed(err: any) {
      console.log(err.code, err.content);
    },
    onProgress() {
      console.log('连接中');
    }
  })
})

onUnmounted(() => {
  //断开连接
  goeasy.disconnect({
    onSuccess: function () {
      console.log("GoEasy disconnect successfully.")
    },
    onFailed: function (error: any) {
      console.log("Failed to disconnect GoEasy, code:" + error.code + ",error:" + error.content);
    }
  });
})
const pushDateMsg = (message: any) => {
  const date = dayjs(message.timestamp).format('YYYY-MM-DD')
  if (messageList.value.length) {
    const lastMsgDate = messageList.value[messageList.value.length - 1].date
    // 两条消息的发送日期不一样时，插入日期
    if (date !== lastMsgDate) {
      messageList.value.push({
        messageId: message.messageId,
        receiverId: message.receiverId,
        senderId: message.senderId,
        date,
        time: dayjs(message.timestamp).format('HH:mm'),
        read: message.read,
        status: message.status === 'success',
        type: 'date',
        payload: dayjs(message.timestamp).format('YYYY/MM/DD')
      })
    }
  }
}
// 用户输入的消息
const message = ref('')
const disabled = computed(() => {
  return message.value.trim().length === 0
})
// 互发的消息
const messageList = ref<IMsg[]>([])
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
  message.value = ''
  sendMessage(textMessage)
}

// 发送文本消息和自定义模板消息
const sendMessage = (messagePayload: any) => {
  im.sendMessage({
    message: messagePayload,
    onSuccess: function (message: any) { //发送成功
      pushDateMsg(message)
      messageList.value.push({
        messageId: message.messageId,
        receiverId: message.receiverId,
        senderId: message.senderId,
        date: dayjs(message.timestamp).format('YYYY-MM-DD'),
        time: dayjs(message.timestamp).format('HH:mm'),
        read: message.read,
        status: message.status === 'success',
        type: message.type,
        payload: message.payload
      })
      scrollToBottom()
    },
    onFailed: function (error: any) { //发送失败
      console.log('Failed to send private message，code:' + error.code + ' ,error ' + error.content);
    }
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

// 举报用户
const report = () => {

}
// 删除会话
const delSession = () => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: "确定",
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    isSelectTarget.value = false
    im.removePrivateConversation({
      userId: target.value.member_id,
      onSuccess: function () {
        console.log("Remove private conversation successfully.");
      },
      onFailed: function (error: any) {
        console.log("Failed to remove private conversation, code:" + error.code + " content:" + error.content);
      }
    });
  }).catch(() => {
  })
}
// 切换聊天的用户
const changeTarget = (item: IUser) => {
  target.value = item
  messageList.value.length = 0
  isSelectTarget.value = true
  // 拉取和这个用户的聊天记录
  im.history({
    userId: target.value.member_id,  //对方userId
    // lastTimestamp: lastMessage.timestamp, //上次查询结果里最后一条消息的时间戳，首次查询传入null即可
    // limit: 10, //可选项，返回的消息条数，默认为10条，最多30条
    onSuccess: function (result: any) {
      messageList.value.length = 0
      if (result.content.length) {
        let lastMsgDate = dayjs(result.content[0].timestamp).format('YYYY-MM-DD')
        result.content.forEach((val: any) => {
          const date = dayjs(val.timestamp).format('YYYY-MM-DD')
          if (date !== lastMsgDate) {
            lastMsgDate = date
            messageList.value.push({
              messageId: val.messageId,
              receiverId: '',
              senderId: val.senderId,
              date: dayjs(val.timestamp).format('YYYY-MM-DD'),
              time: dayjs(val.timestamp).format('HH:mm'),
              read: val.read,
              status: true,
              type: 'date',
              payload: dayjs(val.timestamp).format('YYYY/MM/DD')
            })
          } else {
            messageList.value.push({
              messageId: val.messageId,
              receiverId: '',
              senderId: val.senderId,
              date: dayjs(val.timestamp).format('YYYY-MM-DD'),
              time: dayjs(val.timestamp).format('HH:mm'),
              read: val.read,
              status: true,
              type: val.type,
              payload: val.payload
            })
          }

        })
      }
      scrollToBottom()
    },
    onFailed: function (error: any) { //获取失败
      console.log("Failed to query private message, code:" + error.code + " content:" + error.content);
    },
  });

}

// 常用语
const textOptions = [
  '您好，我有您需要的资源可合作。',
  '您好，我想了解这个资源，方便聊聊吗？',
  '您好，合作有什么要求吗？'
]

// 复制手机号和微信号
const source = ref('')
const { copy } = useClipboard({ source })
const doCopy = (val: string) => {
  source.value = val
  copy()
  ElMessage.success('复制成功')
}

// 在收到新消息和切换聊天时，自动滚动到最底部
const scrollbarRef: any = ref()
const scrollToBottom = () => {
  nextTick(() => {
    scrollbarRef.value.wrap$.scrollTop = scrollbarRef.value.wrap$.scrollHeight
  })
}
</script>

<style lang="scss" scoped>
@import './chat.scss';
</style>