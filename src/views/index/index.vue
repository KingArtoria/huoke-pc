<template>
  <div class="app-page">
    <header></header>
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
                <span class="truncate">{{ item.name }}</span>
                <span class="time">{{ item.time }}</span>
              </li>
            </ul>
          </div>
          <img :src="vipImg" alt="" class="vip-img">
        </div>
        <!-- 今日热门 -->
        <div class="top">
          <img :src="topImg" alt="" class="top-img">
          <div class="top-content">
            <div>
              <p class="title">
                【柯莉银】爆款、新品自带流量热度的优势品牌产品，寻实力销售渠道支持一件代发，代销分销集采优先！
              </p>
              <p class="flex">
                <span>杨悦</span>
                <span class="line"></span>
                <span>产品经理</span>
                <span class="line"></span>
                <span>徐州星跃联动网络</span>
              </p>
            </div>
          </div>
        </div>
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
import arrowImg from '@/assets/XIAYY@2x.png'
import { getVipOrder, getBanner, getMenu } from '@/utils/api'
import { ref } from 'vue'
import List from './components/List.vue'
import photoImg from '@/assets/default.png'
import vipImg from '@/assets/huiyuan-rk@2x.png'
import topImg from '@/assets/jinrrm@2x.png'

// 分类菜单
const navItems = ref([])
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
const vipUserList = ref([
  { name: '用户彼得沃克斯芬克斯开通了年会员年会员年会员', time: '刚刚' },
  { name: '用户彼得沃克斯芬克斯开通了年会员', time: '刚刚' },
  { name: '用户彼得沃克斯芬克斯开通了年会员', time: '1小时前' },
  { name: '用户彼得沃克斯芬克斯开通了年会员', time: '1小时前' },
])
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

      &:first-of-type {
        margin-right: 34px;
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
        width: 50px;
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
      padding: 46px 14px;
      background: white;
    }
  }

}
</style>
