<template>
  <div class="app-page">
    <header class="nav"></header>
    <div class="grid">
      <div>

      </div>
      <aside>
        <!-- 今日热门 -->
        <div class="top">
          <div class="top-content">
            <div v-for="item in todayHot" class="top-item">
              <p class="title">
                {{ item.title }}
              </p>
              <p class="flex desc">
                <span class="truncate">{{ item.nick_name }}</span>
                <span v-if="item.position" class="line"></span>
                <span class="truncate">{{ item.position }}</span>
                <span v-if="item.company" class="line"></span>
                <span class="truncate">{{ item.company }}</span>
              </p>
            </div>
          </div>
        </div>
        <Download class="download" />
      </aside>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Download from '@/components/Download.vue';
import { getHot } from '@/utils/api'
// 今日热门
const todayHot = ref<any>([])
getHot().then(res => {
  todayHot.value = (res.data.data || []).slice(0, 2)
})
</script>

<style lang="scss" scoped>
.download {
  margin-top: 35px;
}
</style>