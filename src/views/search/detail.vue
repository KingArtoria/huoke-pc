<template>
  <div class="app-page">
    <header class="nav py-20 fs-14">
      <span>当前位置：首页 > 异业合作 > {{ shortTitle }}</span>
    </header>

    <div class="content-wrap">
      <div class="flex-1 mb-30">
        <header class="content-header flex items-center text-white pl-32">
          <img :src="iconImg" alt="" class="img1">
          <span class="font-bold fs-16 mx-16">已加入平台交易</span>
          <span class="header-sub-title">双方资金安全保障</span>
        </header>
        <div class="p-22 bg-white">
          <div class="detail">
            <div class="tag mb-20">{{ fmtType(detailData.type) }}</div>
            <p class="detail-title fs-22 mb-32">{{ detailData.title }}</p>
            <div class="flex items-center div1">
              <img :src="host + detailData.head" alt="" class="head-img">
              <span>{{ detailData.nick_name }}</span>
              <span v-if="detailData.position" class="line"></span>
              <span>{{ detailData.position }}</span>
              <span v-if="detailData.company" class="line"></span>
              <span>{{ detailData.company }}</span>
              <VipIcon :item="detailData" class="ml-10 mr-24" />
              <button class="btn primary mr-22">+添加好友</button>
              <button class="btn info">发消息</button>
              <span class="right flex items-center">
                <el-icon class="icon">
                  <View />
                </el-icon>
                <span>{{ detailData.viewcount }}</span>
              </span>
            </div>
            <div class="grid grid-cols-3 fields gap-y-22 mt-20 mb-30">
              <p>
                <span class="label">合作类型：</span>
                <span class="value">{{ detailData.cooptype_id }}</span>
              </p>
              <p>
                <span class="label">合作地区：</span>
                <span class="value">{{ detailData.area }}</span>
              </p>
              <p>
                <span class="label">发布时间：</span>
                <span class="value">{{ fmtDate(detailData.addtime) }}</span>
              </p>
              <p>
                <span class="label">结算方式：</span>
                <span class="value">{{ detailData.settmod_id }}</span>
              </p>
              <p>
                <span class="label">结算周期：</span>
                <span class="value">{{ detailData.settcycle_id }}</span>
              </p>
              <p>
                <span class="label">推广方式：</span>
                <span class="value">{{ detailData.promotion }}</span>
              </p>
              <p>
                <span class="label">结算单价：</span>
                <span class="value">{{ detailData.price }}</span>
              </p>
            </div>
            <div class="flex items-center justify-between">
              <span class="leader">联系方式</span>
              <span class="fs-14">安全提醒：请严格审核对发信息再开始合作</span>
            </div>
            <!-- 联系方式 -->
            <div v-if="!contactVisible" class="contract-type flex items-center justify-center my-30">
              <div class="btn cursor-pointer" @click="getContactInfo">点击查看联系方式</div>
            </div>
            <div v-else class="contract-type show my-30">
              <div class="flex justify-center show1">
                <div class="flex items-center">
                  <img :src="loadImg('dianh@2x.png')" alt="" class="img">
                  <span class="line"></span>
                  <span>{{ contactInfo.contact }}</span>
                </div>
                <div class="flex items-center show2">
                  <img :src="loadImg('wechat@2x.png')" alt="" class="img">
                  <span class="line"></span>
                  <span>{{ contactInfo.wx }}</span>
                </div>
                <div class="flex items-center">
                  <img :src="loadImg('QQ@2x.png')" alt="" class="img">
                  <span class="line"></span>
                  <span>{{ contactInfo.qq }}</span>
                </div>
              </div>
              <span class="text">联系我时请说明是从<span class="light">BD火客</span>上看到的（未经授权严禁转载和使用）</span>
            </div>
            <div>
              <span class="leader">考核标准</span>
            </div>
            <div class="mt-32 mb-48 div2">
              <p>1、这是一段需求详情，这是一段需求详情，这是一段需求详情，这是一段需求详情，这是一段需求详情，这是一段需求详情，这是一段需求详</p>
              <p>2、线上流量互推</p>
              <p>3、实物或高价值优惠券、视频网站会员等（需全国范围内使用）</p>
            </div>
            <div>
              <span class="leader">需求详情</span>
            </div>
            <div class="mt-32 mb-48 div2">
              {{ detailData.info }}
              <!-- <p>1、提供优质流量资源,寻运营商号卡,电商,教育等甲方,可按表单线索合作</p>
              <p>2、寻求微信支付后流量、短信流量、电子发票流量等各种出</p> -->
            </div>
            <div class="text-center">
              <p class="text1 fs-16 mb-38">扫一扫下方二维码，下载BD火客AP，商务合作更快捷</p>
              <img :src="loadImg('erwm.png')" alt="" class="code-img">
            </div>
          </div>
        </div>
        <!-- 回复 -->
        <div class="mt-16 bg-white comment-wrap">
          <div class="px-22 pt-32 pb-18">
            <textarea v-model="comment" placeholder="会员用户可以自定义回复文案，普通用户仅限于使用快捷回复。切记禁止留联系方式，违规将被禁言！"
              class="comment-input" :disabled="!isVip" />
            <div class="flex justify-end mt-12">
              <button class="btn primary" @click="sendReply">评论</button>
            </div>
            <p class="mt-12 mb-26 fs-16">快捷回复：</p>
            <div class="flex option-wrap">
              <div v-for="item in replyOptions" class="option" @click="comment = item">{{ item }}</div>
            </div>
          </div>
          <div class="hr-line"></div>
          <div class="px-22 py-34">
            <p class="p1 fs-16">全部回复（{{ commentList.length }}）</p>
            <div v-for="item in commentList" class="comment">
              <div class="flex">
                <img src="" alt="" class="img">
                <div class="flex-1">
                  <p class="flex items-end">
                    <span class="mr-10 mb-12 fs-16">{{ item.name }}</span>
                    <img src="" alt="">
                  </p>
                  <p class="flex items-center color-949494 fs-16">
                    <span>{{ item.posi }}</span>
                    <span class="line"></span>
                    <span>{{ item.comp }}</span>
                  </p>
                  <p class="py-20 color-4D4D4D">{{ item.content }}</p>
                  <div class="bottom">
                    <p class="color-949494">{{ item.date }}</p>
                    <button class="btn info" @click="openReply(item.id)">回复</button>
                  </div>
                </div>
              </div>
              <!-- 楼中楼 -->
              <div v-if="item.children && item.children.length" class="reply-wrap">
                <div v-for="reply in item.children" class="reply">
                  <div class="flex">
                    <img src="" alt="" class="img">
                    <div class="flex-1">
                      <p class="flex items-end">
                        <span class="mr-10 mb-12 fs-16">{{ reply.name }}</span>
                        <img src="" alt="">
                      </p>
                      <p class="flex items-center color-949494 fs-16">
                        <span>{{ reply.posi }}</span>
                        <span class="line"></span>
                        <span>{{ reply.comp }}</span>
                      </p>
                      <p class="py-20 color-4D4D4D">{{ reply.content }}</p>
                      <p class="color-949494">{{ reply.date }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <aside class="aside">
        <!-- 浏览用户 -->
        <div class="visitor">
          <p class="p1 py-20 fs-16">浏览用户（89）</p>
          <div class="pl-16 pr-10">
            <div v-for="item in visitorList" class="py-20 flex visitor-item">
              <img src="" alt="">
              <div class="flex-1">
                <p>杨月</p>
                <p class="flex color-949494 fs-14 my-10">
                  <span>产品</span>
                  <span class="line"></span>
                  <span>徐州星月联动网络科技</span>
                </p>
                <p class="flex justify-between items-center">
                  <span class="color-949494">
                    <span class="light">2</span>
                    <span>条合作信息</span>
                  </span>
                  <span class="tag1 app-flex-center">互联网</span>
                </p>
              </div>
            </div>
          </div>
          <p class="more cursor-pointer">查看更多 >></p>
        </div>
        <Download class="download" />
      </aside>
      <div class="side">
        <div class="side-item">
          <img :src="loadImg('shoucang@2x.png')" alt="" class="img1">
          <span class="mt-12">收藏</span>
        </div>
        <div class="side-item">
          <img :src="loadImg('图层 622@2x.png')" alt="" class="img2">
          <span class="mt-12">递名片</span>
        </div>
      </div>
    </div>
  </div>
  <Tip v-if="vipTipVisible" @close="vipTipVisible = false" />
  <UserList v-if="userListVisible" @close="userListVisible = false" />
  <Reply ref="replyRef" @update="getProjectInfo" />
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import Download from '@/components/Download.vue';
import { useRoute } from 'vue-router';
import iconImg from '@/assets/baozhang@2x.png'
import { loadImg } from '@/utils'
import Tip from './components/Tip.vue';
import UserList from './components/UserList.vue';
import { projectInfoAPI, contactInfoAPI } from '@/utils/api'
import { COOPERATION_TYPES } from '@/utils/const'
import { matchLabel } from '@/utils/index'
import VipIcon from '@/components/VipIcon.vue';
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus';
import Reply from './components/Reply.vue'
const route = useRoute()
// 浏览用户
const visitorList = ref<any>([
  {},
  {},
  {},
])
// getHot().then(res => {
//   todayHot.value = (res.data.data || []).slice(0, 2)
// })
const { id } = route.query
const detailData = ref<any>({})
// 获取当前用户是否是vip
const isVip = ref(false)
// 获取详情
const getProjectInfo = () => {
  projectInfoAPI({ fid: id }).then(res => {
    detailData.value = res.data.data
  })
}
getProjectInfo()
// 格式化合作类型
const fmtType = (val: number) => {
  return val ? matchLabel(val, COOPERATION_TYPES) : val
}
// 格式化发布时间
const fmtDate = (val: number) => {
  return val ? dayjs(val).format('YYYY-MM-DD') : val
}
// 图片地址前缀
const host = 'https://admin.bdhuoke.com/'
// 标题字数过长做截取
const shortTitle = computed(() => {
  const { title } = detailData.value
  if (title) {
    if (title.length > 20) {
      return title.substr(0, 20) + '...'
    }
  } else {
    return ''
  }
})

// 是否显示联系方式
const contactVisible = ref(false)
// 联系方式详情
const contactInfo = ref<any>({})
// 获取联系方式
const getContactInfo = () => {
  contactInfoAPI({ fid: id }).then(res => {
    contactInfo.value = res.data.data
    contactVisible.value = true
  })
}
// 开通会员提示
const vipTipVisible = ref(false)
// 浏览用户窗口
const userListVisible = ref(false)
// 回复窗口
const replyRef = ref()
// 评论
const comment = ref('')
// 快捷回复
const replyOptions = [
  '怎么合作请联系我',
  '我有您需要的资源可合作',
  '您好，期待与您的合作',
  '有兴趣可聊聊',
  '聊聊',
  '欢迎私信对接合作',
  '您好，合作有什么要求吗？'
]
// 发表回复
let replyLoading = false
const sendReply = () => {
  if (replyLoading) return
  if (comment.value.trim() === '') {
    return ElMessage.info('请输入评论内容')
  }
  replyLoading = true
  replyLoading = false
}
// 评论列表
const commentList = ref<any>([
  {
    img: '', name: '张三', vip: '', posi: 'sdfds', comp: 'sdfdsf', content: '怎么合作请联系我', date: '2222', children: [
      { img: '', name: '张三', vip: '', posi: 'sdfds', comp: 'sdfdsf', content: '怎么合作请联系我', date: '2222' },
    ]
  },
  { img: '', name: '张三', vip: '', posi: 'sdfds', comp: 'sdfdsf', content: '怎么合作请联系我', date: '2222' },
  { img: '', name: '张三', vip: '', posi: 'sdfds', comp: 'sdfdsf', content: '怎么合作请联系我', date: '2222' },
  { img: '', name: '张三', vip: '', posi: 'sdfds', comp: 'sdfdsf', content: '怎么合作请联系我', date: '2222' },
])
const openReply = (id: number) => {
  replyRef.value.open(id)
}
</script>

<style lang="scss" scoped>
.download {
  margin-top: 35px;
}

.leader {
  position: relative;
  padding-left: 10px;
  font-size: 18px;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 16px;
    background: #0071FA;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
}

.nav {
  color: #202020;
}

.content-header {
  height: 39px;
  background: #0074FF;

  .img1 {
    width: 21px;
    height: 25px;
  }
}

.tag {
  border: 1px solid #1F73F1;
  border-radius: 5px;
  padding: 6px;
  color: #1F73F1;
  display: inline-block;
}

.detail-title {
  line-height: 29px;
  letter-spacing: 1px;
}



.div1 {
  color: #949494;

  .right {
    margin-left: auto;
    color: #C1C1C1;

    .icon {
      color: #D8D8D8;
      margin-right: 6px;
    }
  }


  .head-img {
    width: 45px;
    height: 45px;
    margin-right: 13px;
    border-radius: 50%;
  }

  .btn {
    border-radius: 16px;
    width: 88px;
    height: 31px;
    text-align: center;
    line-height: 31px;

    &.primary {
      background: #0372F7;
      color: white;
    }

    &.info {
      background: #DFDFDF;
      color: #4D4D4D;
    }
  }
}

.fields {
  padding: 20px 40px;
  background: #F5F5F5;

  .label {
    color: #969696;
  }

  .value {
    color: #4D4D4D;
  }
}

.contract-type {
  height: 98px;
  background: rgba(105, 173, 255, 0.3);
  border: 1px solid #0074FF;
  text-align: center;

  &.show {
    background: #F5F5F5;
    border-color: white;
  }

  .text {
    color: #969696;
    font-size: 12px;
  }

  .show1 {
    font-size: 26px;
    color: #317AF6;
    margin: 32px auto 24px;
    line-height: 21px;

    .img {
      width: 23px;
      height: 22px;
    }

    .line {
      width: 1px;
      height: 19px;
      background: #BDD5F8;
      margin: 0 15px 0 8px;
    }
  }

  .show2 {
    margin-left: 61px;
    margin-right: 57px;
  }

  .light {
    color: #0074FF;
  }

  .btn {
    width: 238px;
    height: 44px;
    background: #0074FF;
    border: 1px solid #0074FF;
    border-radius: 22px;
    text-align: center;
    line-height: 44px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }
}

.content-wrap {
  position: relative;
  display: flex;

  .aside {
    width: 305px;
    margin-left: 14px;
  }
}

.div2 {
  line-height: 35px;
  font-size: 16;
}

.text1 {
  color: #0074FF;
  margin-top: 108px;
}

.code-img {
  width: 124px;
  height: 124px;
  margin: 0 auto 42px;
}

.line {
  width: 1px;
  height: 13px;
  background: #bebebe;
  margin: 0 8px;
}

.comment-wrap {
  .btn {
    border-radius: 16px;
    width: 88px;
    height: 31px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    &.primary {
      background: #0372F7;
      color: white;
    }

    &.info {
      border: 1px solid #CECECE;
      color: #868686;

      &:hover {
        background: #F3F3F3;
      }
    }
  }

  .comment-input {
    height: 78px;
    background: #F4F4F4;
    border: 1px solid #E2E2E2;
    border-radius: 5px;
    padding: 12px 10px;
    display: block;
    width: 100%;
    outline: none;
  }

  .option-wrap {
    flex-wrap: wrap;

    .option {
      padding: 10px 26px;
      border: 1px solid #CECECE;
      border-radius: 18px;
      margin: 0 20px 14px 0;
      color: #868686;
      cursor: pointer;

      &:hover {
        background: #EBEEF2;
      }
    }
  }

  .hr-line {
    height: 1px;
    background: #F3F3F3;
  }

}

.p1 {
  position: relative;
  padding-left: 10px;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 16px;
    background: #0071FA;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
}

.comment {
  padding: 32px 0;
  border-bottom: 1px solid #F3F3F3;

  &:hover {
    .btn {
      display: flex;
    }
  }

  .img {
    width: 45px;
    height: 45px;
    border-radius: 23px;
    margin-right: 14px;
  }

  .btn {
    position: absolute;
    display: none;
    right: 0;
    top: -10px;
  }

  .bottom {
    position: relative;
  }

  .reply-wrap {
    background: #F3F3F3;
    margin-left: 60px;
    margin-top: 20px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background: #F3F3F3;
      transform: rotate(45deg);
      left: 40px;
      top: -10px;
    }

    .reply {
      padding: 20px;
    }
  }
}

.visitor {
  background: white;
  border-radius: 5px;

  .p1 {
    &::before {
      width: 3px;
      height: 24px;
    }
  }

  .light {
    color: #0071FA;
    margin-right: 3px;
  }

  .tag1 {
    width: 71px;
    height: 24px;
    background: #F7F7F7;
    color: #56689B;
  }

  .visitor-item {
    border-bottom: 1px solid #F3F3F3;

    &:last-of-type {
      border-bottom: 0;
    }
  }

  .more {
    border-top: 1px solid #F3F3F3;
    padding: 18px 0;
    text-align: center;
    color: #8C8C8C;
  }
}

.side {
  position: absolute;
  top: 60px;
  width: 60px;
  left: -66px;

  .side-item {
    display: flex;
    flex-direction: column;
    background: white;
    margin-bottom: 6px;
    color: #040404;
    justify-content: center;
    align-items: center;
    height: 70px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #e9e9e9;
    }

    .img1 {
      width: 25px;
      height: 24px;
    }

    .img2 {
      width: 22px;
      height: 22px;
    }
  }
}
</style>