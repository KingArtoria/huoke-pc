<template>
  <div class="input-wrap">
    <p v-if="print" class="print">{{ value }}</p>
    <template v-else>
      <p class="label">{{ value || placeholder }}</p>
      <textarea type="text" v-model="value" :placeholder="placeholder" class="input"></textarea>
    </template>
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

  .print {
    padding: 3px;
  }

  .label {
    visibility: hidden;
    border: 1px solid transparent;
    padding: 2px;
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

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    border-color: #0171FB;
  }
}
</style>