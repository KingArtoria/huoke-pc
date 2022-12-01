<template>
  <!-- 导航 -->
  <nav class="nav">
    <div class="center">
      <slot name="title">
        <span class="brand" @click="navToIndex">用火客，必定获客</span>
      </slot>
      <ul class="flex nav-items">
        <li v-if="!isLogin" class="nav-item flex items-center">
          <span>请<a href="javascript:;" class="link mr-26" @click="navToLogin('login')">登录</a><a href="javascript:;" class="link mr-20" @click="navToLogin('register')">注册</a></span>
        </li>
        <li class="nav-item relative" @mouseover="optionsVisible = true" @mouseleave="optionsVisible = false">
          <span class="item-text" @click="navToUser">个人中心</span>
          <Transition name="fade">
            <ul v-show="optionsVisible" class="profile-options">
              <li v-for="item in profileOptions" :key="item.path" class="option" @click="clickOption(item)">{{ item.label }}</li>
            </ul>
          </Transition>
        </li>
        <!-- 普通会员 -->
        <li class="nav-item drop">
          <span class="item-text">普通会员</span>
          <div class="vip-wrap super">
            <div class="top">
              <p class="title">限时抢购</p>
              <div class="flex justify-between content">
                <p class="flex items-end">
                  <span class="time">一年普通会员</span>
                  <span class="price"><span class="money">998</span>元/年</span>
                </p>
                <div class="btn" @click="navToBuy('normal')">立即开通</div>
              </div>
              <p class="present ml">每月赠送道具卡（置顶卡*1、变色卡*1）</p>
            </div>
            <!-- <div class="more">
              <p class="more-text ml">更多会员套餐</p>
              <div class="meal-list">
                <div class="meal">
                  <div class="tag app-flex-center">超值优惠</div>
                  <p class="meal-price">
                    <span>3个月</span>
                    <span class="price-money">￥<span class="num">298</span></span>
                  </p>
                </div>
                <div class="meal">
                  <div class="tag app-flex-center">超值优惠</div>
                  <p class="meal-price">
                    <span>12个月</span>
                    <span class="price-money">￥<span class="num">998</span></span>
                  </p>
                </div>
              </div>
            </div> -->
          </div>
        </li>
        <!-- 超级会员 -->
        <li class="nav-item drop">
          <span class="item-text">超级会员</span>
          <div class="vip-wrap super">
            <p class="title">本站力推</p>
            <div class="flex justify-between content">
              <p class="flex items-end">
                <span class="time">一年超级会员</span>
                <span class="price"><span class="money">1998</span>元/年</span>
              </p>
              <div class="btn" @click="navToBuy('super')">立即开通</div>
            </div>
            <p class="desc ml">专属客服，专属资源</p>
            <p class="present ml">每月赠送道具卡（置顶卡*1、变色卡*1、超级置顶卡*1）</p>
          </div>
        </li>
        <!-- 企业会员 -->
        <li class="nav-item drop">
          <span class="item-text">企业会员</span>
          <div class="vip-wrap super company">
            <p class="title">企业专享</p>
            <div class="flex justify-between content">
              <p class="flex items-end">
                <span class="time">一年企业会员</span>
                <span class="price"><span class="money">3998</span>元/年</span>
              </p>
              <div class="btn" @click="navToBuy('enterprise')">立即开通</div>
            </div>
            <p class="desc ml">专属客服，专属资源，多设备登录</p>
            <p class="present ml">每月赠送道具卡（置顶卡*1、变色卡*1、超级置顶卡*1）</p>
          </div>
        </li>
        <li class="nav-item"><span class="item-text" @click="navToBuy('black')">黑卡</span></li>
        <!-- <li class="nav-item"><span class="item-text">帮助中心</span></li> -->
        <!-- <li class="nav-item"><span class="item-text">APP下载</span></li> -->
        <li class="nav-item dn-app-wrap">
          <span class="item-text">APP下载</span>
          <Download class="dn-app" />
        </li>
        <li class="nav-item relative" @mouseover="messageBoxVisible = true" @mouseleave="messageBoxVisible = false">
          <el-badge :value="messageCount" :hidden="messageCount === 0" class="h-full">
            <span class="item-text" @click="navToMessage">消息</span>
          </el-badge>
          <Transition name="fade">
            <MessageBox v-show="messageBoxVisible" @change="msgChange" />
          </Transition>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getUser, logout } from '@/utils/index';
import MessageBox from '@/views/index/components/MessageBox.vue';
import { computed, ref } from 'vue';
import Download from './Download.vue';

const router = useRouter();
const isLogin = computed(() => {
  return !!getUser();
});
// 跳转到购买页面
const navToBuy = (tab: string) => {
  router.push({
    path: '/buy',
    query: {
      tab,
    },
  });
};
// 跳转到个人中心
const navToUser = () => {
  router.push({
    path: `/user/profile`,
  });
};
// 跳转到登录
const navToLogin = (tab: string) => {
  router.push({
    path: '/login',
    query: {
      tab,
    },
  });
};
// 回到首页
const navToIndex = () => {
  router.push('/');
};

const messageBoxVisible = ref(false);
// 是否有消息
const messageCount = ref(0);
// 跳转到消息页面
const navToMessage = () => {
  router.push({
    path: '/message/inform',
  });
};
const msgChange = (msgCount: number) => {
  messageCount.value = msgCount;
};

// 个人中心下拉选项
const profileOptions = computed(() => {
  const options = [
    { label: '会员特权', path: '/user/vip' },
    { label: '我的道具', path: '/user/item' },
    { label: '我的好友', path: '/user/friend' },
  ];
  return options.concat(isLogin.value ? [{ label: '退出', path: 'logout' }] : []);
});
const optionsVisible = ref(false);
const clickOption = (item: any) => {
  optionsVisible.value = false;
  if (item.path === 'logout') {
    logout();
  } else {
    router.push(item.path);
  }
};
</script>

<style lang="scss" scoped>
.nav {
  height: 56px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #5c5c5c;
  background: #f8f8f8;
  border: 1px solid #e7e7e7;

  .center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .nav-item {
    height: 100%;
    position: relative;

    .item-text {
      padding: 0 20px;
      cursor: pointer;
      border-bottom: 1px solid transparent;
      height: 100%;
      display: flex;
      align-items: center;

      &:hover {
        color: #0076ff;
        border-color: #0071fa;
      }
    }
  }

  .brand {
    cursor: pointer;

    &:hover {
      color: #0076ff;
      text-decoration: underline;
    }
  }

  .drop:hover {
    .vip-wrap {
      display: block;
    }
  }

  .vip-wrap {
    position: absolute;
    display: none;
    left: 50%;
    transform: translateX(-50%);
    top: 35px;

    .ml {
      margin-left: 18px;
    }

    &.super {
      width: 481px;
      height: 216px;
      background: url('@/assets/svip_stc@2x.webp') no-repeat;
      background-size: contain;
      z-index: 10;
      padding: 20px;

      .title {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin: 3px 0 0 7px;
      }

      .content {
        margin: 23px 28px 0 18px;
      }

      .time {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #4e4e4e;
        margin-right: 26px;
      }

      .price {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ff7200;
      }

      .money {
        font-size: 36px;
      }

      .btn {
        width: 89px;
        height: 31px;
        background: linear-gradient(90deg, #ff934c 0%, #f05555 98%);
        border-radius: 5px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        line-height: 31px;
        cursor: pointer;
      }

      .desc {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #af7237;
        margin-top: 15px;
      }

      .present {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #fd4e25;
        margin-top: 36px;
      }
    }

    &.company {
      background: url('@/assets/qyhy_stc@2x.webp') no-repeat;
      background-size: contain;

      .price {
        color: #0078ff;
      }

      .btn {
        background: linear-gradient(90deg, #015eea 0%, #188aff 100%);
      }

      .desc {
        color: #0e76f6;
      }
    }

    &.normal {
      min-height: 362px;
      background: url('@/assets/pthy-stcc@2x.webp') no-repeat;
      background-size: contain;

      .meal-list {
        display: flex;
        flex-wrap: wrap;
        padding: 0 20px 20px;
        margin-top: 23px;
      }

      .meal {
        margin: 0 20px 20px 0;
        width: 180px;
        height: 79px;
        background: #ffffff;
        border: 1px solid #ebe8e9;
        border-radius: 5px;
        color: #767376;
        font-size: 16px;
        padding: 0 15px 0 12px;
      }

      .present {
        margin-top: 30px;
      }

      .more {
        background: white;
      }

      .more-text {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #242424;
        margin-top: 52px;
      }

      .tag {
        width: 58px;
        height: 19px;
        background: #f66161;
        border-radius: 5px 0px 5px 0px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-left: -12px;
      }

      .meal-price {
        margin-top: 13px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }

      .price-money {
        font-size: 13px;
      }

      .num {
        font-size: 30px;
        margin-left: 6px;
      }
    }
  }
}

.nav-items {
  height: 100%;
}

.center {
  width: 1382px;
  margin: 0 auto;
}

.link {
  color: #0071fa;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

::v-deep(.el-badge__content.is-fixed.is-dot) {
  top: 20px;
  right: 20px;
}

.dn-app-wrap {
  position: relative;

  &:hover {
    .dn-app {
      display: block;
    }
  }

  .dn-app {
    display: none;
    position: absolute;
    width: 305px;
    height: 290px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  }
}

::v-deep(.el-badge__content.is-fixed) {
  top: 20px;
  right: 20px;
}

.profile-options {
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 0 14px;
  overflow: hidden;

  .option {
    padding: 14px 4px;
    border-bottom: 1px solid #f0f0f0;
    color: #232323;
    font-size: 14px;
    cursor: pointer;

    &:last-of-type {
      border-bottom: 0;
    }

    &:hover {
      color: #0076ff;
    }
  }
}
</style>
