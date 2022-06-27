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
                <li class="action-item" @click="report">举报</li>
                <li class="action-item" @click="delSession">删除对话</li>
              </ul>
            </el-popover>
          </div>
          <!-- 对话区域 -->
          <div class="main">
            <div v-for="item in messageList" :key="item.messageId" class="flex my-20"
              :class="item.senderId == self.member_id ? 'self' : 'target'">
              <div class="w-50 h-50 head">
                <!-- 判断发送方是不是自己，如果是则用自己的头像，否则用对方的头像 -->
                <img :src="HEAD_DOMAIN + (item.senderId == self.member_id ? self.head : target.head)" alt="">
              </div>
              <div class="text">
                {{ item.content }}
              </div>
              <div class="pt-16">
                <span class="time">{{ item.time }}</span>
              </div>
            </div>
          </div>
          <!-- 发送消息 -->
          <div class="write pt-20 px-30 flex">
            <div class="w-50 h-50 head mr-14">
              <img :src="HEAD_DOMAIN + self.head" alt="">
            </div>
            <div class="flex-1">
              <el-input type="textarea" :rows="4" v-model="message" show-word-limit :maxlength="600" />
              <div class="flex justify-between items-center mt-16">
                <ul class="flex options pl-8 items-center">
                  <li>
                    <div class="flex items-center">
                      <img :src="loadImg('jingh.png')" alt="">
                      <span class="ml-8 mr-20">常用语</span>
                      <div class="line"></div>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center">
                      <img :src="loadImg('dianhua1.png')" alt="">
                      <span class="ml-8 mr-20">电话</span>
                      <div class="line"></div>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center">
                      <img :src="loadImg('weixin.png')" alt="">
                      <span class="ml-8 mr-20">微信</span>
                    </div>
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
              <img :src="HEAD_DOMAIN + item.head" alt="">
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
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { getUser, loadImg, getVipLevel } from '@/utils';
import { HEAD_DOMAIN } from '@/utils/const';
import GoEasy from 'goeasy';
import dayjs from 'dayjs'
import useUser from '@/composables/useUser';
import VipIcon from '@/components/VipIcon.vue'
import { useRoute } from 'vue-router';
import { getMemberInfoAPI } from '@/utils/api';
import Empty from '@/components/Empty.vue'

interface IMsg {
  messageId: string; // 消息唯一标识，由goeasy分配
  receiverId: string | number; // 接收者id
  senderId: string | number; // 发送者id
  date: string; // 消息发出的日期
  time: string; // 消息发出的时间
  read: boolean; // 对方是否已读
  status: boolean; // 消息是否发送成功
  content: string; // 消息内容
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
// 根据用户id获取用户信息
if (targetUserId) {
  getMemberInfoAPI({ id: targetUserId }).then(res => {
    res.data.data.member_id = targetUserId
    target.value = res.data.data
    isSelectTarget.value = true
  })
}

// 联系人列表
const contactsList = ref<any>([])

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
        messageList.value.push({
          messageId: message.messageId,
          receiverId: message.receiverId,
          senderId: message.senderId,
          date: dayjs(message.timestamp).format('YYYY-MM-DD'),
          time: dayjs(message.timestamp).format('HH:mm'),
          read: true,
          status: true,
          content: message.payload.text
        })
      })
      // 获取最新的100条会话记录
      im.latestConversations({
        onSuccess: function (result: any) {
          contactsList.value = result.content.conversations.map((val: any) => {
            return {
              member_id: val.userId,
              head: val.data.head,
              nick_name: val.data.nick_name,
              content: val.lastMessage.payload.text,
              date: dayjs(val.lastMessage.timestamp).format('YYYY/MM/DD HH:mm')
            }
          })
          console.log(contactsList.value);

        },
        onFailed: function (error: any) { //获取失败
          console.log("Failed to get the latest conversations, code:" + error.code + " content:" + error.content);
        },
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




// 监听会话

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
  //发送消息
  im.sendMessage({
    message: textMessage,
    onSuccess: function (message: any) { //发送成功
      messageList.value.push({
        messageId: message.messageId,
        receiverId: message.receiverId,
        senderId: message.senderId,
        date: dayjs(message.timestamp).format('YYYY-MM-DD'),
        time: dayjs(message.timestamp).format('HH:mm'),
        read: message.read,
        status: message.status === 'success',
        content: message.payload.text
      })
    },
    onFailed: function (error: any) { //发送失败
      console.log('Failed to send private message，code:' + error.code + ' ,error ' + error.content);
    }
  });

}

// 举报用户
const report = () => {

}
// 删除会话
const delSession = () => {

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
      messageList.value = result.content.map((val: any) => {
        return {
          messageId: val.messageId,
          receiverId: '',
          senderId: val.senderId,
          date: dayjs(val.timestamp).format('YYYY-MM-DD'),
          time: dayjs(val.timestamp).format('HH:mm'),
          read: val.read,
          status: true,
          content: val.payload.text
        }
      })
    },
    onFailed: function (error: any) { //获取失败
      console.log("Failed to query private message, code:" + error.code + " content:" + error.content);
    },
  });

}
</script>

<style lang="scss" scoped>
@import './fniends_info.scss';
</style>