<template>
  <!-- 通知栏 -->
  <Header v-if="isShowHeader" />

  <div id="main">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
  
  <!-- 侧边和广告 -->
  <Aside v-if="isShowHeader" />

  <!-- 底部 -->
  <Footer />
</template>
<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Aside from './components/Aside.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
// 通知栏在某些页面不显示
const isShowHeader = computed(() => {
  return !['/login'].includes(route.path)
})
</script>
