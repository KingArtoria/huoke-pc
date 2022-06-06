<template>
  <div class="empty-wrap">
    <img :src="loadImg('zanwushuju@2x (1).png')" alt="" class="empty-img">
    <p class="empty-text">暂无数据</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils'
</script>

<style lang="scss" scoped>
.empty-wrap {
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty-img {
    width: 181px;
    height: 128px;
  }

  .empty-text {
    font-size: 16px;
    color: #ADADAD;
    margin-top: 20px;
  }
}
</style>