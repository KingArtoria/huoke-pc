<template>
  <div>
    <div class="content">
      <div class="content_1">
        <div style="color:#202020">结果：找到 ' </div>
        <div style="color:#0171FB">{{ title }}</div>
        <div style="color:#202020"> ' 相关内容10个</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
const title = ref('')
title.value = useRoute().query.title as string
</script>

<style lang="scss" scoped>
@import './list.scss';
</style>