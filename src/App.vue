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

const route = useRoute()
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
</script>
<script lang="ts">
let temp = null;
(function (y, un, q, u, e) {
  window[un] =
    window[un] ||
    function (y) {
      window[un].company_id = window[un].company_id || y;

    };
  u = document.createElement("script");
  u.src = q + "?v=" + new Date().getUTCDate();
  u.async = true;
  e = document.getElementsByTagName("script")[0];
  e.parentNode.insertBefore(u, e);
})(window, "_YUNQUE", "//dist.yunque360.com/bundle.js");
_YUNQUE("cjn1jvhb8io60d");
</script>
    