<template>
  <img v-if="fmtVipImg(item)" :src="fmtVipImg(item)" alt="" :class="vipType">
</template>
<script setup lang="ts">
import vipImg from '@/assets/puthy.webp'
import superVipImg from '@/assets/svip2.webp'
import blackVipImg from '@/assets/heikahuizhang@2x@2x.webp'
import companyVipImg from '@/assets/qiyehy@2x@2x.webp'
import { ref } from 'vue'
defineProps<{
  item: any
}>()
const vipType = ref('')
// vip图标
const fmtVipImg = (item: any) => {
  switch (true) {
    // 超级会员
    case item.is_super == 1:
      return superVipImg
    // 普通vip
    case item.is_vip == 1:
      return vipImg
    // 黑卡vip
    case item.is_black == 1:
      vipType.value = 'black'
      return blackVipImg
    // 企业vip
    case item.is_firm == 1:
      vipType.value = 'firm'
      return companyVipImg
    default:
      return ''
  }
}
</script>

<style lang="scss" scoped>
.black {
  width: 25px;
  height: 21px;
}

.firm {
  width: 19px;
  height: 17px;
}
</style>