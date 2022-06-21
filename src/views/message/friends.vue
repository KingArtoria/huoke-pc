<template>
  <div class="bg-white">
    <div class="pt-24 px-10 flex items-center justify-between">
      <p class="title">好友共 <span class="color-0078FF">{{ friends.length }}</span> 人</p>
      <div class="flex justify-center">
        <el-input v-model="searchText" placeholder="查找好友" />
        <button class="search-btn" @click="doSearch">搜索</button>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-10 px-10 mt-40">
      <div v-for="(item, index) in friends" class="item" :key="index">
        <div class="flex">
          <img :src="loadImg('banner_big@2x.webp')" alt="" class="w-50 h-50 app-round mr-22">
          <div class="flex-1">
            <p class="color-303030 mb-10 pr-70">{{ item.name }}</p>
            <p class="color-6A6A6A fs-12 mb-6">{{ item.posi }}</p>
            <p class="color-6A6A6A fs-12">{{ item.comp }}</p>
          </div>
        </div>
        <div class="bottom flex justify-between items-center mt-30">
          <span class="color-56689B">{{ item.count }}条合作信息</span>
          <el-popover placement="bottom" :width="78" trigger="hover">
            <template #reference>
              <span class="color-0078FF flex items-center cursor-pointer">
                <span class="mr-8">管理</span>
                <el-icon>
                  <CaretBottom />
                </el-icon>
              </span>
            </template>
            <ul>
              <li class="action-item">备注</li>
              <li class="action-item">删除</li>
            </ul>
          </el-popover>
        </div>
        <button class="btn">发信息</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils';
const friends = ref([])
// 查询关键词
const searchText = ref('')
const doSearch = () => { }
</script>

<style lang="scss" scoped>
@import './friends.scss';
</style>