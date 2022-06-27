<template>
  <div>私信</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import useGoEasy from '@/composables/useGoEasy'
const GoEasy = useGoEasy()
// 建立连接
GoEasy.connect({
  id: '3265',
  data: { 'nickname': '田杏' },
  onSuccess() {
    console.log('链接成功');

  },
  onFailed(err: any) {
    console.log(err.code, err.content);

  },
  onProgress() {
    console.log('连接中');

  }
})
</script>

<style lang="scss" scoped>
</style>