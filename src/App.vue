<template>
  <!-- 通知栏 -->
  <Header v-if="isShowHeader" />

  <RouterView />

  <!-- 底部 -->
  <Footer />
</template>
<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
// 通知栏在某些页面不显示
const isShowHeader = computed(() => {
  return !['/login'].includes(route.path)
})
</script>

<style>
</style>
