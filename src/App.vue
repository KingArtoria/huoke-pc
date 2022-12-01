<template>
  <!-- 导航栏 -->
  <Nav v-if="isShowNav && store.refreshNav" />
  <!-- 通知栏 -->
  <Header v-if="isShowHeader" />

  <div id="main">
    <router-view v-slot="{ Component }" :key="key">
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
import { useStore } from '@/store'
import useYunQue from './composables/useYunQue';
sessionStorage.setItem('_audit', '1')
const route = useRoute()
// 123123211
setTimeout(() => {
  sessionStorage.setItem('_keyWord', route.query.KeyWord)
}, 1000)
console.log(sessionStorage.getItem('_keyWord'))
// 通知栏在某些页面不显示
const isShowHeader = computed(() => {
  return !['/login', '/message', '/card', '/about'].some((path: string) => route.path.startsWith(path))
})
const isShowNav = computed(() => {
  return !['/login', '/card', '/about'].includes(route.path)
})
const store = useStore()
const key = computed(() => {
  return route.fullPath
})
useYunQue()
// window._agl = window._agl || [];
// (() => {
//   _agl.push(['production', '_f7L2XwGXjyszb4d1e2oxPybgD']);
//   (() => {
//     var agl = document.createElement('script');
//     agl.type = 'text/javascript';
//     agl.async = true;
//     agl.src = 'https://fxgate.baidu.com/angelia/fcagl.js?production=_f7L2XwGXjyszb4d1e2oxPybgD';
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(agl, s);
//   })();
// })();
</script>
    