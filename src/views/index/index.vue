<template>
  <header class="header">
    <div class="app-page">
      <div class="title">合作分类</div>
      <div class="nav-item">
        <span>平台交易</span>
        <img :src="newImg" alt="" class="tag">
      </div>
      <div class="nav-item">
        <span>资质办理</span>
        <img :src="newImg" alt="" class="tag">
      </div>
      <div class="nav-item">
        <span>商务名片</span>
        <img :src="newImg" alt="" class="tag">
      </div>
      <div class="nav-item">
        <span>业务订阅</span>
      </div>
      <div class="nav-item">
        <span>找人脉</span>
      </div>
      <div class="nav-item">
        <span>查企业</span>
      </div>
    </div>

  </header>
  <div class="app-page">
    <div class="main">
      <section class="section">
        <!-- 导航 -->
        <div class="nav-wrap">
          <!-- 菜单 -->
          <div class="nav" @mouseleave="isShowChildren = false">
            <div v-for="item in navItems.slice(0, 6)" class="nav-item" @mouseover="showChildren(item)">
              <div class="flex">
                <span class="nav-title">{{ item.name }}</span>
                <el-icon class="nav-icon">
                  <ArrowRight />
                </el-icon>
              </div>
              <span v-for="sub in item.son.slice(0, 2)" class="sub-item">{{ sub.name }}</span>
            </div>
            <div class="all">显示全部&gt;&gt;</div>
            <!-- 展示 -->
            <div v-show="isShowChildren" class="children">
              <p class="title">{{ itemDetail.name }}</p>
              <div class="item-wrap">
                <span v-for="sub in itemDetail.son" class="item">{{ sub.name }}</span>
              </div>
            </div>
          </div>
          <div>
            <!-- 轮播图 -->
            <div class="carousel">
              <el-carousel v-if="banner.length" height="450px">
                <el-carousel-item v-for="item in banner" :key="item.id">
                  <img :src="item.pic" alt="" class="banner-img">
                </el-carousel-item>
              </el-carousel>
            </div>
            <!-- 图片 -->
            <div class="ad">
              <img :src="adImg1" alt="" class="app-full-img">
            </div>
          </div>
        </div>
        <!-- 列表 -->
        <List />
        <!-- 底部 -->
        <div class="main-bottom">
          <img :src="bottomImg1" alt="" class="img">
          <img :src="bottomImg2" alt="" class="img">
          <img :src="bottomImg3" alt="" class="img">
        </div>
      </section>

      <aside class="aside">
        <!-- 用户信息 -->
        <div class="user">
          <div class="flex">
            <img :src="photoImg" alt="" class="user-photo">
            <div>
              <p class="text">hi，欢迎来到BD火客</p>
              <div class="tag app-flex-center">待企业认证</div>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="btn app-flex-center">登录</div>
            <div class="btn app-flex-center">注册</div>
          </div>
        </div>
        <!-- 会员 -->
        <div class="vip">
          <div class="vip-info">
            <p class="title">VIP会员可获得全站权益</p>
            <p class="sub-title">每日不限发布、不限查看、不限拓展人脉</p>
            <p class="text">已累计<span class="light">8555554</span>位会员</p>
          </div>
          <div class="vip-list">
            <ul>
              <li v-for="item in vipUserList" class="record flex justify-between">
                <span class="truncate">{{ `${item.nick_name}开通了${item.title}` }}</span>
                <span class="time">{{ item.end_time }}</span>
              </li>
            </ul>
          </div>
          <img :src="vipImg" alt="" class="vip-img">
        </div>
        <!-- 今日热门 -->
        <div class="top">
          <img :src="topImg" alt="" class="top-img">
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
        <!-- 推荐人脉 -->
        <div class="recommend">
          <img :src="recommendImg" alt="" class="img">
          <div class="wrap">
            <div v-for="item in people" class="item">
              <div class="flex">
                <img :src="item.head" alt="" class="photo">
                <div>
                  <p class="title">{{ item.company }}</p>
                  <p class="sub">
                    <span>{{ item.nick_name }}</span>
                    <span class="line"></span>
                    <span>{{ item.position }}</span>
                  </p>
                </div>
              </div>
              <div class="flex bottom justify-between">
                <span><span class="light">{{ item.count }}</span>条合作信息</span>
                <!-- <span class="tag app-flex-center">互联网</span> -->
              </div>
            </div>
          </div>
        </div>
        <!-- 下载app -->
        <div class="download">
          <div class="name">火客 APP</div>
          <div class="code"></div>
          <div class="text">手机版下载</div>
        </div>
      </aside>
    </div>
    <div class="fix left">
      <img :src="adImg" alt="" class="ad-img">
      <div class="close">关闭</div>
    </div>
    <div class="fix right">
      <img :src="adImg" alt="" class="ad-img">
      <div class="close">关闭</div>
    </div>
    <!-- 联系客服 -->
    <div class="concat">
      <ul>
        <li class="concat-item">
          <img :src="signImg" alt="" class="normal img">
          <img :src="signImgActive" alt="" class="active img">
          <span>签到</span>
        </li>
        <li class="concat-item">
          <img :src="concatImg" alt="" class="normal img">
          <img :src="concatImgActive" alt="" class="active img">
          <span>客服</span>
        </li>
        <li class="concat-item">
          <img :src="propImg" alt="" class="normal img">
          <img :src="propImgActive" alt="" class="active img">
          <span>道具</span>
        </li>
        <li class="concat-item">
          <img :src="feedbackImg" alt="" class="normal img">
          <img :src="feedbackImgActive" alt="" class="active img">
          <span>反馈</span>
        </li>
      </ul>
      <img :src="preferenceImg" alt="" class="vip-img">
    </div>
  </div>
</template>

<script setup lang="ts">
import adImg1 from '@/assets/ggwzs_h@2x.png'
import { getVipOrder, getBanner, getMenu, getRecommendList, getHot } from '@/utils/api'
import { ref } from 'vue'
import List from './components/List.vue'
import photoImg from '@/assets/default.png'
import vipImg from '@/assets/huiyuan-rk@2x.png'
import topImg from '@/assets/jinrrm@2x.png'
import recommendImg from '@/assets/tuijianrenma@2x.png'
import bottomImg1 from '@/assets/pingtaijiapy@2x.png'
import bottomImg2 from '@/assets/yaoqihy@2x.png'
import bottomImg3 from '@/assets/heika@2x.png'
import adImg from '@/assets/guangg@2x.png';
import signImg from '@/assets/qiandoa_lan@2x.png';
import signImgActive from '@/assets/qiandoa_bai@2x.png';
import concatImg from '@/assets/kefu_lan@2x.png';
import concatImgActive from '@/assets/kefu_bai@2x.png';
import propImg from '@/assets/daoju_lan@2x.png';
import propImgActive from '@/assets/daoju_bai@2x.png';
import feedbackImg from '@/assets/fankui_lan@2x.png';
import feedbackImgActive from '@/assets/fankui_bai@2x.png';
import preferenceImg from '@/assets/xianshith@2x.png'
import newImg from '@/assets/NEW@2x.png';

// 分类菜单
const navItems = ref<any>([])
getMenu().then(res => {
  navItems.value = res.data.data
})
const isShowChildren = ref(false)
const itemDetail = ref({
  name: '',
  son: []
})
const showChildren = (item: any) => {
  itemDetail.value = item
  isShowChildren.value = true
}

// 轮播图
const banner = ref<any>([])
getBanner().then(res => {
  banner.value = res.data.data
})

// 开通会员的用户
const vipUserList = ref<any>([])
getVipOrder().then(res => {
  vipUserList.value = (res.data.data || []).slice(0, 5)
})

// 今日热门
const todayHot = ref<any>([])
getHot().then(res => {
  todayHot.value = (res.data.data || []).slice(0, 2)
})

// 推荐人脉
const people = ref<any>([])
getRecommendList().then(res => {
  people.value = (res.data.data || []).slice(0, 3).map((v: any) => {
    v.head = 'https://admin.bdhuoke.com/' + v.head
    return v;
  })
})

// 广告
const isShowLeft = ref(true)
const isShowRight = ref(true)
</script>

<style lang="scss" scoped>
.fix {
  width: 200px;
  height: 200px;
  background: red;
  top: 56px;
  width: 100px;
  background: white;
  z-index: 10;
  position: fixed;

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }

  .ad-img {
    height: 300px;
  }

  .close {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #545454;
    line-height: 33px;
    text-align: center;
  }
}

.side-banner {
  position: fixed;
  top: 56px;
  width: 100px;
  background: white;
  z-index: 1;
  display: block !important;

  .ad-img {
    height: 300px;
  }

  &.left-ad {
    left: 0;
  }

  &.right-ad {
    right: 0;
  }
}

.main {
  display: flex;

  .section {
    width: 1064px;
    margin-right: 12px;
  }

  .aside {
    flex: 1;
  }
}

.nav-wrap {
  display: grid;
  column-gap: 9px;
  grid-template-columns: 238px 819px;

  .nav {
    height: 525px;
    background-color: white;
  }

  .carousel {
    height: 450px;
    background-color: white;
    margin-top: 8px;

    .banner-img {
      width: 100%;
      height: 100%;
    }
  }

  .ad {
    background-color: white;
    height: 59px;
    margin-top: 8px;
  }
}

.nav {
  position: relative;

  .nav-item {
    padding: 18px 0 16px 20px;
    border-bottom: 1px solid #F5F5F5;

    &:hover {
      background: #0071FA;

      .nav-title {
        color: white;
      }

      .sub-item {
        color: white;
      }

      .nav-icon {
        color: white;
      }
    }
  }

  .children {
    width: 609px;
    height: 525px;
    position: absolute;
    left: 238px;
    top: 0;
    z-index: 1;
    padding: 21px 26px;
    border: 1px solid #0071fa;
    background: white;

    .item-wrap {
      display: flex;
      flex-wrap: wrap;
    }

    .title {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #0071fa;
      margin-bottom: 26px;
    }

    .item {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #737373;
      cursor: pointer;
      margin: 0 23px 27px 0;

      &:hover {
        color: #0071FA;
        text-decoration: underline;
      }
    }
  }

  .nav-title {
    margin: 0 11px 14px 0;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #2A2A2A;
  }

  .sub-item {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #737373;
    margin-left: 16px;
    position: relative;
    cursor: pointer;

    &:first-of-type {
      margin-left: 0;
    }

    &:not(:last-of-type)::after {
      content: '';
      position: absolute;
      width: 1px;
      height: 11px;
      background: #CFCFCF;
      top: 50%;
      transform: translateY(-50%);
      right: -8px;
    }
  }

  .nav-icon {
    margin-top: 2px;
    font-size: 13px;
    color: #787878;
  }

  .all {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #0071FA;
    margin-top: 14px;
    padding-left: 20px;
  }
}

.list-wrap {
  margin-top: 20px;
}

.aside {
  .user {
    padding: 21px 0 0 22px;
    background: white;
    margin-top: 3px;

    .user-photo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 20px;
    }

    .text {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 300;
      color: #1B1B1B;
      margin: 13px 0 11px 0;
    }

    .tag {
      width: 77px;
      height: 22px;
      background: #EAEAEA;
      border-radius: 11px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 300;
      color: #BBBBBB;
    }

    .btn {
      width: 79px;
      height: 31px;
      background: #0071FA;
      border-radius: 5px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      margin: 25px 0 31px;
      cursor: pointer;

      &:first-of-type {
        margin-right: 34px;
      }

      &:hover {
        background: #348fff;
      }
    }
  }

  .vip {
    .vip-info {
      text-align: center;
      padding: 19px 0 17px 0;
      background: #EEF6FF;

      .title {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1B1B1B;
      }

      .sub-title {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #6C6C6C;
        margin: 15px 0 16px 0;
      }

      .text {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #0071FA;

        .light {
          font-size: 26px;
          color: #FF7800;
          font-weight: 500;
        }
      }
    }

    .vip-list {
      padding: 20px 20px 20px 14px;
      background: white;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #6C6C6C;
      overflow: hidden;
      height: 161px;

      .record {
        margin-bottom: 16px;

        &:last-of-type {
          margin-bottom: 0;
        }
      }

      .truncate {
        width: 220px;
      }

      .time {
        flex-shrink: 0;
        width: 55px;
        text-align: right;
      }
    }

    .vip-img {
      width: 306px;
      height: 74px;
    }
  }

  .top {
    margin-top: 41px;

    .top-img {
      width: 305px;
      height: 112px;
    }

    .top-content {
      padding: 26px 14px;
      background: white;
    }
    .desc {
      width: 277px;
    }
    .top-item {
      border-bottom: 1px solid rgba(234, 234, 234, 0.32);
      cursor: pointer;

      &:last-of-type {
        border-bottom: 0;
      }
    }

    .top-item:hover {

      .line {
        background: #0071FA;
      }

      .title,
      .flex {
        color: #0071FA;
      }

      .title {
        text-decoration: underline;
      }
    }

    .title {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #303030;
      margin-bottom: 16px;
      margin-top: 20px;
      line-height: 18px;
    }

    .flex {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #B7B7B7;
      margin-bottom: 26px;
    }

    .line {
      width: 1px;
      height: 14px;
      background: #B7B7B7;
      margin: 0 9px;
    }
  }

  .recommend {
    margin-top: 35px;

    .img {
      width: 305px;
      height: 112px;
    }

    .wrap {
      padding: 0 12px;
      background: white;
    }

    .item {
      padding: 20px 0;
      border-bottom: 1px solid rgba(234, 234, 234, 0.32);

      &:last-of-type {
        border-bottom: 0;
      }
    }

    .photo {
      width: 45px;
      height: 45px;
      border-radius: 23px;
      margin-right: 10px;
    }

    .title {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #4B4B4B;
      margin-bottom: 11px;
    }

    .sub {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #B7B7B7;
      display: flex;
    }

    .line {
      width: 1px;
      height: 14px;
      background: #B7B7B7;
      margin: 0 9px;
    }

    .bottom {
      margin-top: 11px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #949494;
    }

    .light {
      color: #0071FA;
      margin-right: 3px;
    }

    .tag {
      width: 71px;
      height: 24px;
      background: #F7F7F7;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #56689B;
    }
  }

  .download {
    width: 305px;
    height: 448px;
    margin-top: 35px;
    background-size: cover;
    background: url('@/assets/xaizait@2x.png') no-repeat;
    background-size: cover;

    .name {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #0081FF;
      padding-top: 12px;
      text-align: center;
    }

    .text {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FEFFFF;
      margin-top: 44px;
      text-align: center;
    }
  }
}

.main-bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 17px;

  .img {
    height: 110px;
  }
}

.concat {
  position: fixed;
  right: 13px;
  top: 401px;
  width: 55px;

  .concat-item {
    padding: 12px 0 16px 0;
    background: white;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #0071FA;
    text-align: center;
    cursor: pointer;

    .img {
      width: 28px;
      height: 28px;
      margin: 0 auto 7px;
    }

    .active {
      display: none;
    }

    &:hover {
      background: #0071FA;
      color: white;

      .normal {
        display: none;
      }

      .active {
        display: block;
      }
    }
  }

  .vip-img {
    width: 55px;
    height: 65px;
    margin-top: 11px;
    cursor: pointer;
  }
}

.header {
  border-bottom: 2px solid #0071FA;
  background: white;
  padding-top: 32px;

  .app-page {
    display: flex;
  }

  .title {
    width: 238px;
    height: 43px;
    background: #0071FA;
    border-radius: 5px 5px 0px 0px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    padding: 11px 0 0 21px;
  }

  .nav-item {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #484848;
    position: relative;
    padding-bottom: 10px;
    margin-left: 58px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    cursor: pointer;

    .tag {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 29px;
      height: 16px;
      top: -7px;
    }
  }
}
</style>
