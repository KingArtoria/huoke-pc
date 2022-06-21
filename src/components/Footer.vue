<template>
  <div class="footer">
    <div class="main">
      <div class="col grid grid-cols-5">
        <div>
          <p class="title">关于我们</p>
          <div class="grid gap-y-16">
            <router-link class="sub-title" to="/about">平台简介</router-link>
            <a class="sub-title" href="#">加入我们</a>
            <a class="sub-title" href="#">新闻公告</a>
          </div>
        </div>
        <div>
          <p class="title">用户帮助</p>
          <div class="grid gap-y-16">
            <a class="sub-title" href="#">常见问题</a>
            <a class="sub-title" href="#">用户协议</a>
            <a class="sub-title" href="#">信息举报</a>
          </div>
        </div>
        <div>
          <p class="title">市场合作</p>
          <div class="grid gap-y-16">
            <a class="sub-title" href="#">联系我们</a>
            <a class="sub-title" href="#">合作伙伴</a>
          </div>
        </div>
        <div>
          <p class="title">使用攻略</p>
          <div class="grid gap-y-16">
            <a class="sub-title" href="#">如何找合作</a>
            <a class="sub-title" href="#">如何找人脉</a>
            <a class="sub-title" href="#">信息找需求</a>
            <a class="sub-title" href="#">如何发供应</a>
          </div>
        </div>
        <div>
          <p class="title">联系我们</p>
          <div class="grid gap-y-16">
            <span class="sub-title" href="#">客服热线：156566555</span>
            <div>
              <div class="code-img"></div>
              <p class="text-center">BD火客</p>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <!-- 友情链接 -->
      <div class="link-wrap">
        <p class="title">友情链接</p>
        <div class="grid auto-cols-max grid-flow-col links">
          <a class="sub-title" href="#">平台简介</a>
          <a class="sub-title" href="#">平台简介</a>
          <a class="sub-title" href="#">平台简介</a>
          <a class="sub-title" href="#">平台简介</a>
          <a class="sub-title" href="#">平台简介</a>
          <a class="sub-title" href="#">平台简介</a>
        </div>
      </div>
      <div class="line"></div>
      <div class="info">徐州星跃联动网络科技有限公司版权所有 Copyright 2021-2031 silatech All Rseerved</div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
</script>

<style lang="scss" scoped>
.footer {
  height: 430px;
  background-color: #33383E;

  .main {
    width: 1382px;
    margin: 0 auto;
  }

  .title {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }

  .sub-title {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #A7A7A7;
    cursor: pointer;
    margin-left: 3px;
  }
}

.col {
  padding: 54px 80px 60px;

  .title {
    margin-bottom: 23px;
  }
}

.line {
  height: 1px;
  background: #434951;
}

.link-wrap {
  padding: 24px 80px 35px;

  .title {
    margin-bottom: 28px;
  }

  .links {
    column-gap: 40px;
    row-gap: 16px;
  }
}

.info {
  text-align: center;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #DBE1E9;
  margin-top: 20px;
}

.code-img {
  width: 68px;
  height: 68px;
}
</style>