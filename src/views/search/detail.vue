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
            <div class="tag mb-20">广告甲方</div>
            <p class="detail-title fs-22 mb-32">2021年6月份APP即将上线啦寻渠道招募商家，无费用入住，坐享2年分润</p>
            <div class="flex items-center div1">
              <img src="" alt="" class="head-img">
              <span>杨月</span>
              <span class="line"></span>
              <span>产品经理</span>
              <span class="line"></span>
              <span>徐州牛牛网络科技</span>
              <img src="" alt="" class="ml-10 mr-24">
              <button class="btn primary mr-22">+添加好友</button>
              <button class="btn info">发消息</button>
              <span class="right flex items-center">
                <el-icon class="icon">
                  <View />
                </el-icon>
                <span>999</span>
              </span>
            </div>
            <div class="grid grid-cols-3 fields gap-y-22 mt-20 mb-30">
              <p>
                <span class="label">合作类型：</span>
                <span class="value">开卡</span>
              </p>
              <p>
                <span class="label">合作地区：</span>
                <span class="value">开卡</span>
              </p>
              <p>
                <span class="label">发布时间：</span>
                <span class="value">开卡</span>
              </p>
              <p>
                <span class="label">结算方式：</span>
                <span class="value">开卡</span>
              </p>
              <p>
                <span class="label">结算周期：</span>
                <span class="value">开卡</span>
              </p>
              <p>
                <span class="label">推广方式：</span>
                <span class="value">开卡</span>
              </p>
              <p>
                <span class="label">结算单价：</span>
                <span class="value">开卡</span>
              </p>
            </div>
            <div class="flex items-center justify-between">
              <span class="leader">联系方式</span>
              <span class="fs-14">安全提醒：请严格审核对发信息再开始合作</span>
            </div>
            <!-- 联系方式 -->
            <div v-if="!contactVisible" class="contract-type flex items-center justify-center my-30">
              <div class="btn cursor-pointer" @click="contactVisible = true">点击查看联系方式</div>
            </div>
            <div v-else class="contract-type show my-30">
              <div class="flex justify-center show1">
                <div class="flex items-center">
                  <img :src="loadImg('dianh@2x.png')" alt="" class="img">
                  <span class="line"></span>
                  <span>18805208888</span>
                </div>
                <div class="flex items-center show2">
                  <img :src="loadImg('wechat@2x.png')" alt="" class="img">
                  <span class="line"></span>
                  <span>XYLD8888</span>
                </div>
                <div class="flex items-center">
                  <img :src="loadImg('QQ@2x.png')" alt="" class="img">
                  <span class="line"></span>
                  <span>819241819</span>
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
              <span class="leader">需求详情标准</span>
            </div>
            <div class="mt-32 mb-48 div2">
              <p>1、提供优质流量资源,寻运营商号卡,电商,教育等甲方,可按表单线索合作</p>
              <p>2、寻求微信支付后流量、短信流量、电子发票流量等各种出</p>
            </div>
            <div class="text-center">
              <p class="text1 fs-16 mb-38">扫一扫下方二维码，下载BD火客AP，商务合作更快捷</p>
              <img :src="loadImg('erwm.png')" alt="" class="code-img">
            </div>
          </div>
        </div>
      </div>
      <aside class="aside">
        <!-- 今日热门 -->
        <div class="top">
          <div class="top-content">
            <div v-for="item in todayHot" class="top-item">
              <p class="title">
                {{ item.title }}
              </p>
              <p class="flex desc">
                <span class="truncate">{{ item.nick_name }}</span>
                <span v-if="item.position" class="line"></span>
                <span class="truncate">{{ item.position }}</span>
                <span v-if="item.company" class="line"></span>
                <span class="truncate">{{ item.company }}</span>
              </p>
            </div>
          </div>
        </div>
        <Download class="download" />
      </aside>
    </div>
  </div>
  <Tip v-if="vipTipVisible" @close="vipTipVisible = false" />
  <UserList v-if="userListVisible" @close="userListVisible = false" />
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import Download from '@/components/Download.vue';
import { getHot } from '@/utils/api'
import { useRoute } from 'vue-router';
import iconImg from '@/assets/baozhang@2x.png'
import { loadImg } from '@/utils'
import Tip from './components/Tip.vue';
import UserList from './components/UserList.vue';
const route = useRoute()
// 今日热门
const todayHot = ref<any>([])
getHot().then(res => {
  todayHot.value = (res.data.data || []).slice(0, 2)
})
const { id } = route.query
const detailData = ref<any>({})
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
// 开通会员提示
const vipTipVisible = ref(false)
// 浏览用户窗口
const userListVisible = ref(false)
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

  .line {
    width: 1px;
    height: 14px;
    background: #8B8B8B;
    margin: 0 8px;
  }

  .head-img {
    width: 45px;
    height: 45px;
    margin-right: 13px;
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
</style>