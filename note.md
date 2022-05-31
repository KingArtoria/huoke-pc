# 页面模板
<template>
  <div></div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
</script>

<style lang="scss" scoped>
</style>

# 弹窗模板
<template>
  <el-dialog v-model="visible" width="1000px" :close-on-click-modal="false" :before-close="close">
    <template #header>
      <p class="title">意见反馈</p>
    </template>
  </el-dialog>
</template>
  <script setup lang="ts">
import { ref } from 'vue';
// 控制窗口显示/隐藏
const visible = ref(false)
// 打开窗口
const open = () => {
  visible.value = true
}
// 关闭窗口
const close = () => {
  visible.value = false
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped>
</style>