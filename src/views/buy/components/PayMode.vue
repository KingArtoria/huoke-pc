<template>
  <p class="mt-36 mb-30 fs-18">选择支付方式</p>
  <div class="flex">
    <div class="pay-mode app-flex-center mr-36" :class="{ active: activePayMode === 'alipay' }"
      @click="activePayMode = 'alipay'">
      <img :src="loadImg('zhifub@2x.png')" alt="" class="img1">
    </div>
    <div class="pay-mode app-flex-center" :class="{ active: activePayMode === 'weixin' }"
      @click="activePayMode = 'weixin'">
      <img :src="loadImg('weixin_pay@2x.png')" alt="" class="img2">
    </div>
  </div>
  <div class="flex items-center mt-60">
    <el-checkbox v-model="isAgree" size="large" />
    <span class="color-4C4C4C ml-6">我已阅读并同意</span>
    <span class="color-0076FF">《BD火客付费会员协议》</span>
  </div>
  <button class="btn app-flex-center fs-20 text-white mt-60" @click="doPay">立即支付</button>
  <Pay v-model="payVisible" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils/index'
import Pay from './Pay.vue'
const props = defineProps<{
  money: number, // 金额
}>()

const activePayMode = ref('alipay')
// 是否同意协议
const isAgree = ref(false)
const payVisible = ref(false)
// 支付
const doPay = () => {
  payVisible.value = true
}
</script>

<style lang="scss" scoped>
.tip {
  background: #FFF8ED;
  padding: 20px;
  color: #4C4C4C;
  line-height: 29px;

  .light {
    color: #046FF9;
  }
}

.pay-mode {
  width: 198px;
  height: 79px;
  background: #FFFFFF;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  cursor: pointer;

  &.active,
  &:hover {
    border: 2px solid #0078FF;
  }

  .img1 {
    width: 125px;
    height: 44px;
  }

  .img2 {
    width: 154px;
    height: 42px;
  }
}

.btn {
  width: 197px;
  height: 60px;
  background: #0A7BF5;
  border-radius: 4px;
}
</style>