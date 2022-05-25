<template>
  <div class="app-page">
    <header></header>
    <div class="main">
      <section class="section">
        <!-- 导航 -->
        <div class="nav-wrap">
          <!-- 菜单 -->
          <div class="nav">
            <div v-for="item in navItems" class="nav-item">
              <div>
                <span class="nav-title">{{ item.title }}</span>
                <span>→</span>
              </div>
              <span v-for="sub in item.children" class="sub-item">{{ sub.label }}</span>
            </div>
          </div>
          <div>
            <!-- 轮播图 -->
            <div class="carousel"></div>
            <!-- 图片 -->
            <div class="ad">
              <img :src="adImg1" alt="" class="app-full-img">
            </div>
          </div>
        </div>
      </section>

      <aside class="aside">
        <!-- 用户信息 -->
        <div class="user"></div>
        <!-- 会员 -->
        <div class="vip"></div>
        <!-- 今日热门 -->
        <div class="top"></div>
        <!-- 推荐人脉 -->
        <div class="recommend"></div>
        <!-- 下载app -->
        <div class="download"></div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import adImg1 from '@/assets/ggwzs_h@2x.png'

const navItems = [
  {
    title: '广告甲方', children: [
      { label: '信用卡开卡', value: 0 },
      { label: '权益卡开卡', value: 1 },
    ]
  },
  {
    title: '广告甲方', children: [
      { label: '信用卡开卡', value: 0 },
      { label: '权益卡开卡', value: 1 },
    ]
  },
  {
    title: '广告甲方', children: [
      { label: '信用卡开卡', value: 0 },
      { label: '权益卡开卡', value: 1 },
    ]
  },
  {
    title: '广告甲方', children: [
      { label: '信用卡开卡', value: 0 },
      { label: '权益卡开卡', value: 1 },
    ]
  },
  {
    title: '广告甲方', children: [
      { label: '信用卡开卡', value: 0 },
      { label: '权益卡开卡', value: 1 },
    ]
  },
  {
    title: '广告甲方', children: [
      { label: '信用卡开卡', value: 0 },
      { label: '权益卡开卡', value: 1 },
    ]
  },
]
</script>

<style lang="scss" scoped>
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
  }

  .ad {
    background-color: white;
    height: 59px;
    margin-top: 8px;
  }
}

.nav {
  padding: 0 0 0 20px;

  .nav-item {
    padding: 20px 0 16px 0;
    border-bottom: 1px solid #F5F5F5;
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
}
</style>
