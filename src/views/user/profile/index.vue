<template>
  <div class="p-34 bg-white fs-16">
    <p class="fs-18 mb-28">个人中心</p>
    <div class="tip flex items-center">
      您的账号未实名认证：不能在本站进行平台交易，为了不影响你的使用体验，请及时进行实名认证。
    </div>
    <!-- 用户信息  -->
    <div class="user-info flex mt-28">
      <!-- 头像 -->
      <img :src="loadImg('banner_big2@2x.png')" alt="" class="head-img mr-10">
      <div class="mt-8">
        <!-- 姓名 -->
        <div class="flex items-end">
          <span class="fs-18 font-bold">姓名</span>
          <div class="div1 app-flex-center">未实名认证</div>
          <img src="" alt="">
          <img :src="loadImg(isBindPhone ? 'shoujih_yt@2x.png' : 'shoujhhwt@2x.png')" alt="" class="bind-img">
          <img :src="loadImg(isBindWx ? 'weixinhyt@2x.png' : 'wxh_wtx@2x.png')" alt="" class="bind-img">
        </div>
        <p class="desc my-10 flex items-center">
          <span>BD经理</span>
          <span class="line"></span>
          <span>互联网</span>
          <span class="line"></span>
          <span>徐州网络科技公司</span>
        </p>
        <p class="desc">毕业院校：中国美术学院</p>
      </div>
      <button class="btn app-flex-center" @click="navToForm">编辑资料</button>
    </div>
    <!-- 联系方式 -->
    <div class="contact flex items-center my-16">
      <span class="color-1B1B1B mr-50 ml-10">联系方式：</span>
      <div class="grid grid-cols-3 gap-x-80">
        <span class="color-818181">手机号：131****5213</span>
        <span class="color-818181">微信号：131****5213</span>
        <span>
          <span class="color-1B1B1B mr-30">邀请码：</span>
          <span class="color-1F73F1">DHSKSKA</span>
        </span>
      </div>
    </div>
    <img :src="loadImg('weikaitong-grzx@2x.png')" alt="" class="img1">
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils';
import { useRouter } from 'vue-router';
// 账号是否绑定手机号
const isBindPhone = ref(true)
// 账号是否绑定微信
const isBindWx = ref(true)
const router = useRouter()
// 跳转到编辑资料页面
const navToForm = () => {
  router.push({
    path: '/user/profile-form'
  })
}
</script>

<style lang="scss" scoped>
.tip {
  height: 49px;
  background: #E5F1FF;
  border: 1px solid #6BA5E8;
  padding: 0 15px;
  color: #0076FF;
  font-size: 16px;
}

.user-info {
  .div1 {
    width: 77px;
    height: 20px;
    background: #FFFFFF;
    border: 1px solid #BFBFBF;
    border-radius: 10px;
    font-size: 12px;
    color: #8E8D8D;
    margin: 0 10px 0 15px;
  }

  .head-img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }

  .bind-img {
    width: 24px;
    height: 24px;
    margin-left: 15px;
  }

  .desc {
    color: #7E7E7E;
    font-size: 15px;
  }

  .line {
    width: 1px;
    height: 12px;
    background: #7E7E7E;
    margin: 0 8px;
  }

  .btn {
    width: 90px;
    height: 35px;
    background: #FFFFFF;
    border: 1px solid #9B9B9B;
    border-radius: 18px;
    color: #929292;
    font-size: 16px;
    margin-left: auto;
    margin-top: 10px;
  }
}

.contact {
  height: 43px;
  background: #F5F5F5;
}

.img1 {
  margin: 0 auto;
}
</style>