<template>
  <div class="bg-white">
    <p class="title">全部私信</p>
    <div v-for="item in contractList" :key="item.member_id" class="item">
      <img :src="headPrefix(item.head)" alt="" class="w-60 h-60 app-round mr-24">
      <div class="flex-1">
        <div>
          <span>{{ item.nick_name }}</span>
          <VipIcon :item="getVipLevel(item.maxvip)" />
          <span>与你的私信</span>
          <span>{{ item.date }}</span>
        </div>
        <p>{{ item.content }}</p>
      </div>
    </div>
    <Empty v-if="contractList.length === 0" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Empty from '@/components/Empty.vue';
import useGoEasy from '@/composables/useGoEasy'
import GoEasy from 'goeasy';
import { getUser, headPrefix, getVipLevel } from '@/utils';
import { getMemberInfoAPI } from '@/utils/api';
import dayjs from 'dayjs'
import VipIcon from '@/components/VipIcon.vue';

interface IContract {
  member_id: number, // 用户id
  head: string, // 头像
  nick_name: string, // 昵称
  content: string, // 消息内容
  date: string, // 消息发送时间
  maxvip: string, // vip等级
  company: string, // 公司
}

// 私信列表
const contractList = ref<IContract[]>([])
// 初始化GoEasy
const goeasy: GoEasy = useGoEasy()
const im = goeasy.im;
// 自己
const self = ref<IUser>({} as IUser)
// 添加监听
const initListen = () => {
  // 获取最新的100条会话记录
  im.latestConversations({
    onSuccess: function (result: any) {
      contractList.value = result.content.conversations.map((val: any) => {
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
    },
  });
}
onMounted(async () => {
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