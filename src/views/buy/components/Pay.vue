<template>
  <el-dialog v-model="modelValue" width="670px" :close-on-click-modal="false" :before-close="close">
    <template #header>
      <p class="title">打开微信扫一扫</p>
    </template>
    <div class="flex items-center flex-col">
      <img :src="codeUrl" alt="" class="img">
      <p class="desc">为使购买的产品或服务立即生效，支付完成后，请务必点击下方完成支付按钮</p>
      <button class="btn" @click="done">完成支付</button>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import QRCode from 'qrcode';
import { ElMessage } from 'element-plus';
const props = defineProps<{
  modelValue: boolean,
  payUrl: string, // 支付二维码`
}>()
const call = defineEmits(['update:modelValue', 'success'])
const close = () => {
  call('update:modelValue', false)
}
// 二维码图片
const codeUrl = ref('')
onMounted(() => {
  QRCode.toDataURL(props.payUrl).then((url: string) => {
    codeUrl.value = url
  })
})

// 完成支付
const done = () => {
  call('success')
  close()
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #696969;
  text-align: center;
}

.img {
  width: 245px;
  height: 245px;
}

.desc {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #0A7BF5;
  margin: 20px 0 30px;
}

.btn {
  width: 153px;
  height: 47px;
  background: #0A7BF5;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
}
</style>