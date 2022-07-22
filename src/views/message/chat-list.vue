<template>
  <div class="bg-white">
    <div class="flex justify-between pt-18">
      <p class="title">全部私信</p>
      <span class="color-A9A9A9 fs-15 mr-32 cursor-pointer light" @click="setRead">全部标为已读</span>
    </div>
    <div v-for="item in contractList" :key="item.member_id" class="item cursor-pointer"
      @click="sendMsg(item.member_id)">
      <div class="mr-24 relative">
        <img :src="headPrefix(item.head)" alt="" class="w-60 h-60 app-round">
        <div v-if="item.unread" class="count">{{ item.unread }}</div>
      </div>
      <div class="flex-1 mt-4">
        <div class="flex items-center">
          <span class="fs-16 mr-2">{{ item.nick_name }}</span>
          <div>
            <VipIcon :item="getVipLevel(item.maxvip)" />
          </div>
          <span class="ml-14 fs-15">与你的私信</span>
          <span class="ml-20 color-ABABAB">{{ item.date }}</span>
        </div>
        <p class="mt-10 content fs-15">{{ item.content }}</p>
      </div>
      <img :src="loadImg('close_sl.png')" alt="" class="close" @click.stop="delSession(item.member_id)">
    </div>
    <Empty v-if="contractList.length === 0" />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Empty from '@/components/Empty.vue';
import useGoEasy from '@/composables/useGoEasy'
import GoEasy from 'goeasy';
import { getUser, headPrefix, getVipLevel, once, loadImg } from '@/utils';
import { getMemberInfoAPI } from '@/utils/api';
import dayjs from 'dayjs'
import VipIcon from '@/components/VipIcon.vue';
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus';

interface IContract {
  member_id: number, // 用户id
  head: string, // 头像
  nick_name: string, // 昵称
  content: string, // 消息内容
  date: string, // 消息发送时间
  maxvip: string, // vip等级
  company: string, // 公司
  unread: number, // 未读消息数量
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
          unread: val.unread
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

// 标为已读
const setRead = once((done: Function) => {
  contractList.value.forEach((val: IContract) => {
    val.unread = 0
    im.markPrivateMessageAsRead({
      userId: '' + val.member_id,  //聊天对象的userId
    })
  })
  setTimeout(() => {
    done()
  }, 200);
})
// 移除会话
const delSession = (member_id: number) => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: "确定",
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    im.removePrivateConversation({
      userId: '' + member_id,
    });
    const index = contractList.value.findIndex((v: IContract) => v.member_id === member_id)
    if (index !== -1) {
      contractList.value.splice(index, 1)
    }
  }).catch(() => {
  })
}
// 进入会话详情
const router = useRouter()
const sendMsg = (member_id: number) => {
  router.push({
    path: '/message/chat',
    query: {
      userId: member_id
    }
  })
}
</script>

<style lang="scss" scoped>
.item {
  padding: 28px 60px 40px 46px;
  border-bottom: 1px solid #f3f3f3;
  display: flex;
  position: relative;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    background: #FAFAFA;

    .close {
      display: block;
    }
  }

  .content {
    color: #1B1B1B;
    line-height: 29px;
  }

  .close {
    position: absolute;
    top: 50px;
    right: 37px;
    display: none;
    cursor: pointer;
  }

  .count {
    position: absolute;
    right: -14px;
    top: -2px;
    font-size: 12px;
    color: #FFFFFF;
    background: #FF0000;
    border-radius: 7px;
    height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 3px;
  }
}

.title {
  font-size: 16px;
  color: #393939;
  padding: 0 0 20px 46px;
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

.fs-15 {
  font-size: 15px;
}

.color-ABABAB {
  color: #ABABAB;
}

.color-A9A9A9 {
  color: #A9A9A9;
}

.light {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    color: #0076FF;
  }
}
</style>