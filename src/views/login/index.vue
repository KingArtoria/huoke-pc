<template>
  <div class="bg-white">
    <div class="head">
      <img :src="loadImg('logo_wa@2x.png')" alt="" class="logo cursor-pointer" @click="router.push('/')">
    </div>
    <div class="content app-img">
      <Login />
    </div>
  </div>
</template>
<script setup lang="ts">
import { loadImg } from '@/utils';
import Login from './components/Login.vue';
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped>
.head {
  width: 1382px;
  margin: 0 auto;
  height: 120px;
  display: flex;
  align-items: center;
}

.content {
  background-image: url('@/assets/banner_dl@2x.webp');
  background-size: 100% 102%;
  height: 660px;
  position: relative;
}

.logo {
  width: 172px;
  height: 66px;
}
</style>   