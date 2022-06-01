<template>
  <div class="app-mask">
    <div class="content">
      <el-icon class="close" @click="close">
        <Close />
      </el-icon>
      <header class="header">
        <p class="title">开通会员免费查看</p>
        <p class="sub-title">普通用户只可查看最新3个浏览用户</p>
        <p class="sub-title">会员用户可查看所有浏览用户</p>
      </header>
      <section class="section">
        <p class="title">免费查看机会就要溜走啦</p>
        <p class="sub-title">开通会员免费查看，畅享会员权益</p>
        <button class="btn primary">开通会员查看所有</button>
        <button class="btn info">残忍拒绝只看 3 个</button>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const call = defineEmits(['close'])
// 关闭窗口
const close = () => {
  call('close')
}
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  background: url('@/assets/tc-llkhy@2x.png') no-repeat;
  background-size: cover;
  width: 453px;
  height: 521px;
  top: 282px;
  left: 50%;
  transform: translateX(-50%);

  .close {
    position: absolute;
    top: 66px;
    right: 64px;
    font-size: 18px;
    color: white;
    cursor: pointer;
  }
}

.header {
  position: relative;
  text-align: center;

  .title {
    margin: 75px 0 21px;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
  }

  .sub-title {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #A8AAB8;
    line-height: 21px;
  }


}

.section {
  text-align: center;

  .title {
    margin: 68px 0 16px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #17161E;
  }

  .sub-title {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #17161E;
    margin-bottom: 35px;
  }
}

.btn {
  width: 303px;
  height: 60px;
  text-align: center;
  border-radius: 30px;
  margin-bottom: 16px;
  line-height: 60px;

  &.primary {
    background: linear-gradient(90deg, #FCE8C8 0%, #E6C383 100%);
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #17161E;
  }

  &.info {
    border: 1px solid #B9B9B9;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #9E9DA3;
  }
}
</style>