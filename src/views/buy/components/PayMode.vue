<template>
  <p class="mt-36 mb-30 fs-18">选择支付方式</p>
  <div class="flex">
    <!-- <div class="pay-mode app-flex-center mr-36" :class="{ active: activePayMode === 'zfb_web' }"
      @click="activePayMode = 'zfb_web'">
      <img :src="loadImg('zhifub@2x.webp')" alt="" class="img1">
    </div> -->
    <div class="pay-mode app-flex-center" :class="{ active: activePayMode === 'wx_web' }"
      @click="activePayMode = 'wx_web'">
      <img :src="loadImg('weixin_pay@2x.webp')" alt="" class="img2">
    </div>
  </div>
  <div class="flex items-center mt-60">
    <el-checkbox v-model="isAgree" size="large">
      <span class="color-4C4C4C">我已阅读并同意</span>
      <span class="color-0076FF" @click="protocolVisible = true">《BD火客付费会员协议》</span>
    </el-checkbox>
  </div>
  <button class="btn app-flex-center fs-20 text-white mt-60" @click="doPay">立即支付</button>
  <Pay v-if="payVisible" v-model="payVisible" :pay-url="code_url" @success="successVisible = true" />
  <Protocol v-if="protocolVisible" v-model="protocolVisible" title="《BD火客付费会员协议》" url="http://hyxy.bdhuoke.com" />
  <Success v-if="successVisible" v-model="successVisible" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg, once } from '@/utils/index'
import Pay from './Pay.vue'
import { alipay_webAPI, goodsorderaddAPI, wxpay_webAPI } from '@/utils/api';
import { ElMessage } from 'element-plus';
import Protocol from '@/components/Protocol.vue';
import Success from './Success.vue';

const props = defineProps<{
  goodsId: number, // 金额
}>()

const protocolVisible = ref(false)
const successVisible = ref(false)
const activePayMode = ref('wx_web')
// 是否同意协议
const isAgree = ref(false)
const payVisible = ref(false)
// 微信支付二维码
const code_url = ref('')
// 支付
const doPay = once(async (done: Function) => {
  if (!isAgree.value) {
    ElMessage.error('请阅读并同意《BD火客付费会员协议》')
    done()
    return
  }
  // 创建订单
  let res = await goodsorderaddAPI({ paytype: activePayMode.value, goods_id: props.goodsId })
  const order_sn = res.data.data.sn
  // 发起支付
  const method = activePayMode.value === 'zfb_web' ? alipay_webAPI : wxpay_webAPI
  res = await method({ order_sn })
  // 支付宝返回form表单，微信支付返回json
  if (activePayMode.value === 'zfb_web') {
    const newWindow: any = window.open('', '_blank');
    newWindow.document.write(res.data);
    newWindow.focus();
  } else {
    // 生成二维码
    code_url.value = res.data.data.code_url
    payVisible.value = true
  }
  done()
})
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