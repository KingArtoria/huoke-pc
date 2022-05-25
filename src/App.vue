<template>
  <!-- 通知栏 -->
  <Banner v-if="isShowBanner" />

  <RouterView />

  <!-- 底部 -->
  <Footer />
</template>
<script setup lang="ts">
import Banner from './components/Banner.vue';
import Footer from './components/Footer.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
// 通知栏在某些页面不显示
const isShowBanner = computed(() => {
  return !['/login'].includes(route.path)
})
</script>

<style>
</style>
