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
      <li class="concat-item" @click="signVisible = true">
        <img :src="signImg" alt="" class="normal img">
        <img :src="signImgActive" alt="" class="active img">
        <span>签到</span>
      </li>
      <!-- <el-popover placement="left" :width="300" trigger="hover">
        <template #reference>
          <li class="concat-item">
            <img :src="concatImg" alt="" class="normal img">
            <img :src="concatImgActive" alt="" class="active img">
            <span>客服</span>
          </li>
        </template>
        <div class="p-20">
          <p class="fs16">技术咨询：<span class="color-066FFF">15190664662</span></p>
          <p class="fs16 mt-12">商务合作：<span class="color-066FFF">15190664662</span></p>
          <div class="grid grid-cols-2 gap-x-34 mt-30">
            <div class="flex flex-col items-center">
              <img src="" alt="" class="code-img">
              <span class="mt-14">（技术咨询）</span>
            </div>
            <div class="flex flex-col items-center">
              <img src="" alt="" class="code-img">
              <span class="mt-14">（商务合作）</span>
            </div>
          </div>
        </div>
      </el-popover> -->
      <li class="concat-item" @click="navTo('/user/item')">
        <img :src="propImg" alt="" class="normal img">
        <img :src="propImgActive" alt="" class="active img">
        <span>道具</span>
      </li>
      <li class="concat-item" @click="openFeedback">
        <img :src="feedbackImg" alt="" class="normal img">
        <img :src="feedbackImgActive" alt="" class="active img">
        <span>反馈</span>
      </li>
    </ul>
    <img :src="preferenceImg" alt="" class="vip-img" @click="navTo('/buy')">
  </div>
  <!-- 签到 -->
  <Sign v-if="signVisible" @close="signVisible = false" />
  <!-- 反馈 -->
  <Feedback ref="feedbackRef" />
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

// 广告
const isShowLeft = ref(true)
const isShowRight = ref(true)
// 签到
const signVisible = ref(false)
// 反馈
const feedbackRef = ref()
const openFeedback = () => {
  feedbackRef.value.open()
}
const router = useRouter()
const navTo = (path: string) => {
  router.push(path)
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