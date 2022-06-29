<template>
  <div class="page">
    <div class="wrap flex">
      <img :src="loadImg('huizh@2x.webp')" alt="" class="img2">
      <div class="flex-1">
        <p class="title">火客黑卡</p>
        <p class="sub-title">开通火客黑卡，送专属定制纯金名片，超多黑卡用户专享特权</p>
        <p class="desc">*黑卡为火客平台最高权益会员 </p>
      </div>
      <div class="right flex flex-col">
        <span class="text-center text"><span class="fs-38">19,999</span><span class="fs-28"> 元 / 年</span></span>
        <button v-if="isApply" class="btn btn2 mt-24">已申请</button>
        <button v-else class="btn btn1 mt-24" @click="applyVisible = true">申请黑卡</button>
      </div>
    </div>
    <img :src="loadImg('heikaquanyi@2x.webp')" alt="" class="img1">
    <BlackCardApply v-if="applyVisible" v-model="applyVisible" @success="isApply = true" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils';
import BlackCardApply from './BlackCardApply.vue';
const applyVisible = ref(false)
// 黑卡申请状态
const isApply = ref(false)
</script>

<style lang="scss" scoped>
.page {
  background: url('@/assets/bg-hk@2x.webp') no-repeat;
  background-size: cover;
  height: 1833px;
}

::v-deep(.el-dialog__header) {
  display: none;
}

::v-deep(.el-dialog__body) {
  padding: 0;
}

.img1 {
  width: 1158px;
  height: 1310px;
  margin: 0 auto;
}

.wrap {
  padding: 90px 92px 25px 62px;

  .img2 {
    width: 218px;
    height: 175px;
    margin-right: 45px;
  }

  .title {
    margin: 14px 0 18px;
    font-size: 32px;
    font-weight: bold;
    color: #F5DDAB;
  }

  .sub-title {
    font-size: 18px;
    color: #D2BE93;
  }

  .desc {
    color: #887754;
    font-size: 16px;
    margin-top: 46px;
  }

  .btn {
    width: 332px;
    height: 80px;
    font-size: 30px;
    border-radius: 40px;
    color: #2F2F2F;

    &.btn1 {
      background: linear-gradient(90deg, #FFEBD3 0%, #E1AD7D 100%);
    }

    &.btn2 {
      background: linear-gradient(90deg, #FFEBD3 0%, #E1AD7D 100%);
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        background: #441300;
        opacity: 0.29;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }

  .text {
    color: #E4B587;
  }
}
</style>