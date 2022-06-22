<template>
  <div v-if="visible" class="code absolute" :style="{ left, top }">
    <img :src="src" alt="" :style="{ width, height }" class="cursor-pointer">
    <div v-if="!isPrint" class="close app-flex-center" @click="removeImg">x</div>
    <div class="mask app-flex-center">
      <button class="change-btn" @click="callImg">替换</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
  width: string, // 图片宽度
  height: string, // 图片高度
  left: string, // 图片x轴位置
  top: string, // 图片y轴位置
  src: string, // 图片地址
  isPrint: boolean,
}>()

const call = defineEmits(['change'])
const callImg = () => {
  call('change')
}
const visible = ref(true)
const removeImg = () => {
  visible.value = false
}
</script>

<style lang="scss" scoped>
.code {
  border: 2px solid transparent;
  padding: 6px;

  &:hover {
    border-color: #0171FB;

    .mask {
      display: flex;
    }
  }

  .close {
    position: absolute;
    width: 26px;
    height: 26px;
    color: white;
    background-color: #0171FB;
    border-radius: 50%;
    top: -33px;
    right: -26px;
    cursor: pointer;
  }
}

.mask {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);

  .change-btn {
    width: 80px;
    height: 30px;
    background: #0171FB;
    border-radius: 3px;
    color: white;
  }
}
</style>