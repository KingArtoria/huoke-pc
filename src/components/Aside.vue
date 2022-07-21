<template>
  <div v-if="isShowLeft" class="fix left">
    <img :src="adImg" alt="" class="ad-img">
    <div class="close" @click="isShowLeft = false">关闭</div>
  </div>
  <div v-if="isShowRight" class="fix right">
    <img :src="adImg" alt="" class="ad-img">
    <div class="close" @click="isShowRight = false">关闭</div>
  </div>
  <!-- 联系客服 -->
  <div class="concat">
    <ul>
      <li class="concat-item" @click="openDialog('sign')">
        <img :src="signImg" alt="" class="normal img">
        <img :src="signImgActive" alt="" class="active img">
        <span>签到</span>
      </li>
      <li class="concat-item" @click="navTo('/user/item')">
        <img :src="propImg" alt="" class="normal img">
        <img :src="propImgActive" alt="" class="active img">
        <span>道具</span>
      </li>
      <li class="concat-item" @click="openDialog('feedback')">
        <img :src="feedbackImg" alt="" class="normal img">
        <img :src="feedbackImgActive" alt="" class="active img">
        <span>反馈</span>
      </li>
      <el-popover placement="left">
        <template #reference>
          <li class="concat-item" @click="openDialog('feedback')">
            <img :src="loadImg('gongzhongh.png')" alt="" class="normal img">
            <img :src="loadImg('gongzhongh-bai.png')" alt="" class="active img">
            <span>公众号</span>
          </li>
        </template>
        <img :src="loadImg('public-code.jpg')" alt="">
      </el-popover>

    </ul>
    <img :src="preferenceImg" alt="" class="vip-img" @click="navTo('/buy')">
  </div>
  <!-- 签到 -->
  <Sign v-if="signVisible" @close="signVisible = false" />
  <!-- 反馈 -->
  <Feedback v-if="feedbackVisible" v-model="feedbackVisible" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import adImg from '@/assets/guangg@2x.webp';
import signImg from '@/assets/qiandoa_lan@2x.webp';
import signImgActive from '@/assets/qiandoa_bai@2x.webp';
import concatImg from '@/assets/kefu_lan@2x.webp';
import concatImgActive from '@/assets/kefu_bai@2x.webp';
import propImg from '@/assets/daoju_lan@2x.webp';
import propImgActive from '@/assets/daoju_bai@2x.webp';
import feedbackImg from '@/assets/fankui_lan@2x.webp';
import feedbackImgActive from '@/assets/fankui_bai@2x.webp';
import preferenceImg from '@/assets/xianshith@2x.webp'
import Sign from '@/components/Sign.vue'
import Feedback from '@/components/Feedback.vue'
import { useRouter } from 'vue-router';
import { getUser, loadImg } from '@/utils';
import { ElMessage } from 'element-plus';

// 广告
const isShowLeft = ref(true)
const isShowRight = ref(true)
// 签到
const signVisible = ref(false)
// 反馈
const feedbackVisible = ref(false)
const router = useRouter()
const navTo = (path: string) => {
  router.push(path)
}

// 检查登录
const isLogin = getUser()
const openDialog = (type: string) => {
  if (!isLogin) {
    ElMessage.error('请先登录');
    router.replace('/login')
    return
  }
  switch (type) {
    case 'sign':
      signVisible.value = true
      break
    case 'sign':
      feedbackVisible.value = true
      break
  }
}
</script>

<style lang="scss" scoped>
.fix {
  width: 200px;
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
    height: 20px;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
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

.color-066FFF {
  color: #066FFF;
}

.code-img {
  width: 113px;
  height: 113px;
}
</style>