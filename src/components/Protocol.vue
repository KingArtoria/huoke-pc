<template>
  <el-dialog v-model="modelValue" width="800px" :close-on-click-modal="false" :before-close="close" append-to-body>
    <template #header>
      <p class="title">{{ title }}</p>
    </template>
    <div>
      <iframe :src="url" class="w-full" style="height: 68vh"></iframe>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">

defineProps<{
  modelValue: boolean,
  title: string, // 协议标题
  url: string, // 协议网址
}>()
const call = defineEmits(['update:modelValue', 'update'])
// 关闭窗口
const close = () => {
  call('update:modelValue', false)
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
</style>