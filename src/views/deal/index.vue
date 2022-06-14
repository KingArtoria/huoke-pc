<template>
  <div class="pb-60">
    <div class="bg">
      <div class="app-page">
        <div class="relative div1">
          <button class="btn" @click="navTo('/deal-form')">发起交易</button>
          <div class="flex items-center color-616161 fs-16">
            <img :src="loadImg('jydt@2x.png')" alt="" class="img1 mr-22">
            <span class="mr-60">
              <span class="font-bold color-393939">田**</span>
              与
              <span class="font-bold color-393939">赖**</span>
              达成合作交易
            </span>
            <span>金额<span class="color-FB0101 ml-10">￥300</span></span>
          </div>
          <img :src="loadImg('gzzb@2x.png')" alt="" class="right">
        </div>
      </div>
    </div>
    <div class="app-page">
      <p class="title">交易流程</p>
      <div class="bg-white pt-50 pb-70 flex flex-col items-center">
        <img :src="loadImg('jiaoylc@2x.png')" alt="" class="img2 mb-30">
        <div class="grid grid-cols-4 gap-x-100 div2">
          <div class="text-center">
            <p class="mb-20 fs-18">发起交易</p>
            <div class="color-616161 fs-16">
              <p>交易一方发起资金</p>
              <p>托管担保业务</p>
            </div>
          </div>
          <div class="text-center">
            <p class="mb-20 fs-18">支付担保金</p>
            <div class="color-616161 fs-16">
              <p>担保甲方将双方拟定担保金</p>
              <p>转入平台指定官方账户</p>
            </div>
          </div>
          <div class="text-center">
            <p class="mb-20 fs-18">合作完成</p>
            <div class="color-616161 fs-16">
              <p>双方根据合作内容</p>
              <p>完成业务</p>
            </div>
          </div>
          <div class="text-center">
            <p class="mb-20 fs-18">返还担保金</p>
            <div class="color-616161 fs-16">
              <p>担保结束后，平台扣取3%</p>
              <p>担保手续费后原路返还打款账户</p>
            </div>
          </div>
        </div>
      </div>
      <p class="title">担保规则</p>
      <div class="bg-white px-38 pt-30 pb-30 color-616161">
        <div class="div3">
          <p>1.担保双方为自愿委托火客平台对其合作项目进行资金托管担保，并应遵循平台担保方式及相关规范。</p>
          <p>2.双方拟定担保保证金出资金额，出资方为本次担保甲方，其另外一方为担保乙方。</p>
          <p>3.按照平台规定由担保甲方将双方拟定担保金转入平台指定官方账户，并由平台确认资金到账情况。</p>
          <p>4.甲乙双方明确本次担保业务相关内容及担保责任，本次担保需由担保双方确认无误后担保保证金方可进行返还，若甲乙双方任何一方对担保内容有异议，火客平台有权对本
            次担保保证金给予暂时扣留，任何异议部分需双方商议结束或者提供有效法律证据给予解除扣留担保保证金。</p>
          <p>5.本次担保保证金只作为担保业务，担保结束后，平台会自动扣取<span>3%</span>担保手续费（双方拟定担保保证金的3%），剩余担保保证金会原路返还至原担保甲方打款账户。</p>
          <p>6.甲乙双方担保的相关业务合同金额需由甲乙双方结清，本平台暂不支持担保金做为业务结算资金进行支付！</p>
        </div>
        <p class="color-FB0101 mt-10">注：担保金不可以作为业务结算资金进行支付</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils';
import { useRouter } from 'vue-router';
const router = useRouter()
const navTo = (path: string) => {
  router.push({
    path
  })
}
</script>

<style lang="scss" scoped>
.bg {
  height: 305px;
  background: url('@/assets/ptjy-banner@2x.png') no-repeat;
  background-size: cover;
}

.color-616161 {
  color: #616161;
}

.color-393939 {
  color: #393939;
}

.color-FB0101 {
  color: #FB0101;
}

.btn {
  margin-top: 165px;
  margin-bottom: 55px;
  width: 200px;
  height: 46px;
  background: #0171FB;
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
}

.img1 {
  width: 91px;
  height: 22px;
}

.div1 {
  padding: 0 133px 0 118px;

  .right {
    position: absolute;
    top: 22px;
    right: 133px;
    width: 159px;
    height: 263px;
  }
}

.title {
  padding: 40px 0 26px;
  font-size: 34px;
  text-align: center;
}

.img2 {
  width: 980px;
  height: 37px;
}

.div2 {
  width: 1160px;

  .color-616161 {
    line-height: 1.7;
  }
}
.div3 {
  font-size: 16px;
  line-height: 3.5;
}
</style>