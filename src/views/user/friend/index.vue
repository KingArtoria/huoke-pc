<template>
  <div class="p-34 bg-white">
    <p class="fs-18">我的好友</p>
    <div class="tabbar flex mt-38">
      <div v-for="tab in tabItems" class="tab-item app-flex-center"
        :class="[tab.value, { active: tab.value === activeTab }]" @click="activeTab = tab.value">
        {{ tab.label }}
      </div>
      <div v-if="activeTab === 1" class="flex items-center ml-auto pr-16">
        <div>
          <el-input v-model="searchText" placeholder="查找好友" clearable />
        </div>
        <button class="search-btn" @click="doSearch">搜索</button>
      </div>
    </div>
    <Friends ref="friendsRef" v-if="activeTab === 1" />
    <Recommends v-if="activeTab === 2" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Friends from './components/Friends.vue';
import Recommends from './components/Recommends.vue';

const friendsRef = ref()
const tabItems = [
  { label: '我的好友', value: 1 },
  { label: '可能认识', value: 2 },
]
const activeTab = ref(1)

// 查询关键词
const searchText = ref('')
const doSearch = () => {
  if (friendsRef) {
    friendsRef.value.search(searchText.value)
  }
}
</script>

<style lang="scss" scoped>
.tabbar {
  background: #FCFCFC;
  border: 1px solid #F3F3F3;
  height: 49px;

  .tab-item {
    width: 170px;
    height: 45px;
    font-size: 16px;
    color: #666;
    width: 183px;
    cursor: pointer;

    &.active,
    &:hover {
      color: #0172FF;
      background: white;
      border-top: 2px solid #0D86FF;
    }
  }
}

.search-btn {
  width: 84px;
  height: 29px;
  background: #1F73F1;
  border: 1px solid #1F73F1;
  border-radius: 5px;
  color: #fff;
  margin-left: 12px;
}
</style>