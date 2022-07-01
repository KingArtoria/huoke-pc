<template>
  <el-dialog v-model="modelValue" width="700px" :close-on-click-modal="false" :before-close="close">
    <template #header>
      <p class="title">通知</p>
    </template>
    <div>
      <div class="flex justify-center">
        <img :src="loadImg('finish.webp')" alt="" class=" mt-80">
      </div>
      <p class=" text-center my-50 fs-16">{{ tipMap[type] }}</p>
      <div class="flex justify-center mb-20">
        <button class="tip-btn" @click="close">好的</button>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { loadImg } from '@/utils/index'

defineProps<{
  modelValue: boolean,
  type: number, // 成功提示类型
}>()
const call = defineEmits(['update:modelValue', 'update'])
// 关闭窗口
const close = () => {
  call('update:modelValue', false)
}
const tipMap: any = {
  13: '已增加一次查看联系方式次数',
  15: '合作信息已刷新',
  14: '合作信息已超级置顶',
  11: '合作信息已置顶',
  9: '合作信息已在广告甲方页置顶',
  12: '合作信息已在流量乙方页置顶',
  1: '合作信息标题已变色',
  10: '已增加一次加人脉次数'
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

.tip-btn {
  width: 123px;
  height: 37px;
  background: #1F73F1;
  border: 1px solid #1F73F1;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
}
</style>