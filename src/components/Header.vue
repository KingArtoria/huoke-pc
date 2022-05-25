<template>
  <div class="header">
    <!-- 导航 -->
    <nav class="nav">
      <div class="center">
        <span class="brand">用火客，必定获客</span>
        <ul class="grid auto-cols-max grid-flow-col nav-items">
          <li class="nav-item">
            <span>请<a href="javascript:;">登录</a><a href="javascript:;">注册</a></span>
          </li>
          <li class="nav-item">个人中心</li>
          <li class="nav-item">普通会员</li>
          <li class="nav-item">超级会员</li>
          <li class="nav-item">企业会员</li>
          <li class="nav-item">黑卡</li>
          <li class="nav-item">帮助中心</li>
          <li class="nav-item">APP下载</li>
          <li class="nav-item">消息</li>
        </ul>
      </div>

    </nav>
    <!-- banner -->
    <div class="banner center">
      <img :src="bannerImg" alt="" class="banner-img">
    </div>
    <!-- 搜索 -->
    <div class="search center">
      <div class="logo">
        <img :src="logo" alt="" class="logo-img">
      </div>
      <div class="search-wrap">
        <div class="input-wrap">
          <div class="select"></div>
          <input type="text" class="input" placeholder="输入关键词进行搜索">
          <div class="search-btn app-flex-center">搜索</div>
        </div>
        <div class="grid auto-cols-max grid-flow-col links">
          <a href="javascript:;">加粉</a>
          <a href="javascript:;">地推</a>
          <a href="javascript:;">拉新</a>
          <a href="javascript:;">淘口令</a>
          <a href="javascript:;">阅读激励量</a>
          <a href="javascript:;">PC-阅读量</a>
          <a href="javascript:;">快应用</a>
        </div>
      </div>
      <div class="text app-flex-center">或</div>
      <div class="btn app-flex-center">免费发布合作信息</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import bannerImg from '@/assets/dingbbanner@2x.png'
import logo from '@/assets/huoke@2x.png'

// 搜索类型
const searchType = ref('找项目')
// 关键词
const keyword = ref('')
</script>

<style lang="scss" scoped>
.header {
  background-color: white;
}

.nav {
  height: 56px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #5C5C5C;
  background: #F8F8F8;

  .center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
}

.nav-items {
  column-gap: 40px;
}

.center {
  width: 1382px;
  margin: 0 auto;
}

.banner {
  margin: 10px auto;

  .banner-img {
    width: 100%;
    height: 70px;
  }
}

.search {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;

  .logo {
    margin-top: -14px;
  }

  .logo-img {
    width: 155px;
    height: 72px;
  }

  .btn {
    width: 229px;
    height: 44px;
    background: #FF6F0F;
    border-radius: 0px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }
}

.search-wrap {
  flex: 1;
  margin-left: 60px;

  .input-wrap {
    display: flex;
    justify-content: space-between;
    height: 44px;
    border: 2px solid #0071FA;
  }

  .input {
    flex: 1;
    padding: 14px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 400;
    border: 0;
    outline: 0;

    &::placeholder {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #9D9D9D;
    }
  }

  .search-btn {
    width: 98px;
    height: 100%;
    background: #0071FA;
    border-radius: 0px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;
  }

  .links {
    column-gap: 32px;
    margin-top: 4px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #9D9D9D;
  }
}

.text {
  height: 44px;
  width: 86px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: #0071FA;
}
</style>
