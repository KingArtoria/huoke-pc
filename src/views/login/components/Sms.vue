<template>
  <div @click="getSms" class="sms-text" :class="{ active: isActive }">{{ text }}</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { smsApi } from '@/utils/api'
import { ElMessage } from 'element-plus'
const props = defineProps<{
  phone: string, // 手机号
  type: string, // 验证码类型
}>()
const text = ref('获取验证码')
const isActive = ref(false)
let second = 60
let timer: any = null;
const getSms = () => {
  if (isActive.value) return
  if (!/^1[0-9]{10}$/.test(props.phone)) return ElMessage.error('手机号格式有误')
  isActive.value = true
  fn()
  smsApi({
    phone: props.phone,
    type: props.type
  })
}

const fn = () => {
  text.value = `获取验证码(${second})`
  second--
  if (second < 0) {
    clearTimeout(timer)
    isActive.value = false
    second = 60
    text.value = '获取验证码'
  } else {
    timer = setTimeout(fn, 1000);
  }
}

</script>

<style lang="scss" scoped>
.sms-text {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #0071fb;
  cursor: pointer;
  position: absolute;
  right: 19px;
  top: 25px;

  &.active {
    color: #999;
  }
}
</style>