<template>
  <div class="download">
    <div class="name">火客 APP</div>
    <div class="code"></div>
    <div class="text">手机版下载</div>
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="scss" scoped>
.download {
  width: 305px;
  height: 448px;
  background-size: cover;
  background: url('@/assets/xaizait@2x.webp') no-repeat;
  background-size: cover;

  .name {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #0081FF;
    padding-top: 12px;
    text-align: center;
  }

  .text {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FEFFFF;
    margin-top: 44px;
    text-align: center;
  }
}
</style>