<template>
  <div class="p-30 bg-white">
    <!-- 会员特权 -->
    <div class="tip">
      <p class="title fs-16 color-4C4C4C mb-10">专属会员特权</p>
      <div class="fs-14">
        <slot name="tip"></slot>
      </div>
    </div>
    <p class="mt-36 mb-30 fs-18">选择套餐</p>
    <div class="flex">
      <div v-for="item in service" class="service" :class="{ active: item.id === activeService }"
        @click="activeService = item.id">
        <p class="flex justify-between items-end mt-26 mb-22">
          <span class="fs-16">{{ item.duration }}</span>
          <span class="fs-13">￥<span class="fs-30">{{ item.price }}</span></span>
        </p>
        <p class="prop-text">{{ item.prop }}</p>
        <div class="tag app-flex-center">{{ item.tag }}</div>
        <div class="check app-flex-center">
          <el-icon class="icon">
            <Check />
          </el-icon>
        </div>
      </div>
    </div>
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
  </div>
  <Pay v-model="payVisible" />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { loadImg } from '@/utils/index'
import Pay from './Pay.vue'
// 套餐
interface IService {
  duration: string // 时长
  price: number // 价格
  prop: string // 道具
  tag: string // 标签
  id: number // 套餐编号
}
const props = defineProps<{
  service: IService[]
}>()

const activeService = ref(0)
const activePayMode = ref('alipay')
watch(() => props.service, () => {
  if (props.service) {
    activeService.value = props.service[0].id
  }
}, { immediate: true })
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

.service {
  height: 105px;
  border-radius: 5px;
  border: 2px solid #DADADA;
  color: #616161;
  position: relative;
  margin-right: 36px;
  padding: 0 20px;
  cursor: pointer;
  transition: all 0.3s;

  &.active {
    border-color: #0078FF;
    color: #0078FF;

    .check {
      display: flex;
    }
  }

  &:hover {
    border-color: #0078FF;
    color: #0078FF;
  }

  .prop-text {
    color: #F54343;
    font-size: 13px;
  }

  .tag {
    width: 58px;
    height: 19px;
    background: #F66161;
    border-radius: 5px 0px 5px 0px;
    font-size: 12px;
    color: #fff;
    position: absolute;
    top: -4px;
    left: -2px;
  }

  .check {
    display: none;
    width: 30px;
    height: 19px;
    background: #0078FF;
    border-radius: 3px 3px 3px 10px;
    position: absolute;
    top: -2px;
    right: -2px;

    .icon {
      color: #fff;
      font-size: 16px;
    }
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