<template>
  <el-dialog v-model="modelValue" width="530px" :close-on-click-modal="false" :before-close="close">
    <div class="content">
      <img :src="loadImg('heika_k@2x.webp')" alt="" class="logo-img">
      <input type="text" class="input" placeholder="请输入您的姓名">
      <input type="text" class="input" placeholder="请输入您的联系方式">
      <button class="apply-btn" @click="submit">提交申请</button>
      <img :src="loadImg('round_close (1)@2x.webp')" alt="" @click="close" class="close-img">
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils/index'
import { ElMessage } from 'element-plus'
defineProps<{
  modelValue: boolean
}>()
const call = defineEmits(['update:modelValue'])
const close = (done?: any) => {
  if (done && typeof done === 'function') {
    done(true)
  } else {
    call('update:modelValue', false)
  }
}
const formData = ref({
  name: '', // 姓名
  phone: '', // 联系方式
})
let loading = false
const submit = () => {
  if (loading) return
  if (!formData.value.name) return ElMessage.info('请输入您的姓名')
  if (!formData.value.phone) return ElMessage.info('请输入您的联系方式')
  loading = true
}
</script>

<style lang="scss" scoped>
.content {
  height: 503px;
  background: url('@/assets/tanchuang-hk@2x.webp') no-repeat;
  background-size: cover;
  position: relative;

  .logo-img {
    width: 484px;
    height: 194px;
    margin: 18px auto;
  }

  .input {
    display: block;
    width: 446px;
    height: 58px;
    background: #FFFFFF;
    border: 1px solid #B9B9B9;
    margin: 0 auto 13px;
    outline: 0;
    padding: 0 20px;
    color: #262626;
    font-size: 18px;

    &:focus {
      border: 1px solid #F7DDBD;
      box-shadow: 0px 1px 7px 0px rgba(194, 142, 79, 0.21);
    }

    &::placeholder {
      color: #939393;
      font-size: 16px;
    }
  }

  .apply-btn {
    width: 169px;
    height: 58px;
    background: linear-gradient(90deg, #FFE5B8 0%, #FEC47D 100%);
    box-shadow: 0px 3px 21px 0px rgba(194, 142, 79, 0.47);
    border-radius: 29px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #783D1F;
    margin: 35px auto 0;
    display: block;
  }

  .close-img {
    position: absolute;
    bottom: -86px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
}
</style>