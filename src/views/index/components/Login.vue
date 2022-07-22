<template>
  <div class="mask">
    <div class="content">
      <Login />
      <el-icon class="close" @click="call('update:modelValue', false)">
        <CircleClose />
      </el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import Login from '@/views/login/components/Login.vue';
defineProps<{
  modelValue: boolean
}>()
const call = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .close {
    position: absolute;
    right: -50px;
    color: #dfdfdf;
    top: 0;
    font-size: 30px;
    cursor: pointer;
  }

  ::v-deep(.box) {
    position: relative;
    top: 0;
    right: 0;
    padding-top: 1px;
  }
}
</style>   