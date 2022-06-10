<template>
  <!-- 导航栏 -->
  <Nav v-if="isShowNav" />
  <!-- 通知栏 -->
  <Header v-if="isShowHeader" />

  <div id="main">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>

  <!-- 侧边和广告 -->
  <Aside v-if="isShowNav" />

  <!-- 底部 -->
  <Footer />
</template>
<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Aside from './components/Aside.vue';
import Nav from './components/Nav.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
// 通知栏在某些页面不显示
const isShowHeader = computed(() => {
  return !['/login', '/message'].some((path: string) => route.path.startsWith(path))
})
const isShowNav = computed(() => {
  return !['/login'].includes(route.path)
})
</script>
