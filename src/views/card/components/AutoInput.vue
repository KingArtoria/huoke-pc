<template>
  <div class="input-wrap">
    <p class="label" :class="{ show: print }">{{ value || placeholder }}</p>
    <textarea v-show="!print" type="text" v-model="value" :placeholder="placeholder" class="input" rows="1"></textarea>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  value?: string,
  placeholder?: string,
  print: boolean
}>()
const value = ref(props.value)
</script>

<style lang="scss" scoped>
.input-wrap {
  position: relative;

  .label {
    visibility: hidden;
    border: 1px solid transparent;
    line-height: inherit;

    &.show {
      visibility: visible;
    }
  }
}

.input {
  border: 0;
  outline: 0;
  background: initial;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 1px solid transparent;
  resize: none;
  word-break: break-all;
  line-height: inherit;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    border-color: #0171FB;
  }
}
</style>