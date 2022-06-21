<template>
  <div>
    <div class="content">
      <div class="content_1">
        <div style="color:#202020">结果：找到 ' </div>
        <div style="color:#0171FB">{{ title }}</div>
        <div style="color:#202020"> ' 相关内容10个</div>
      </div>
      <img src="../../assets/banner-huy@2x.png" class="content_2">
      <div class="content_3">
        <div class="content_3_1">
          <div class="content_3_1_1">所在地区:</div>
          <div class="content_3_1_2">
            <div class="content_3_1_2_1" v-for="(item, index) in province" :key="index"
              :style="`background:${item['background']};color:${item['color']}`" @click="selectItem(item)">{{
                  item['name']
              }}
            </div>
          </div>
        </div>
        <div class="content_3_1">
          <div class="content_3_1_1">所在地区:</div>
          <div class="content_3_1_2">
            <div class="content_3_1_2_1" v-for="(item, index) in industry" :key="index"
              :style="`background:${item['background']};color:${item['color']}`" @click="selectIndustryItem(item)">{{
                  item['name']
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getIndustryListAPI, provinceAPI } from "@/utils/api";
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
const title = ref('')
const province = ref([])
const industry = ref([])
title.value = useRoute().query.title as string
provinceAPI().then(res => {
  res.data.data.unshift({ id: 0, name: '全部' })
  res.data.data.forEach((item: any) => {
    item.background = 'transparent'
    item.color = '#525252'
  });
  res.data.data[0].background = '#016BFF'
  res.data.data[0].color = '#fff'
  province.value = res.data.data
})
const selectItem = (item: any) => {
  province.value.forEach((value: any) => {
    value.background = 'transparent'
    value.color = '#525252'
  });
  item.background = '#016BFF'
  item.color = '#fff'
}
getIndustryListAPI().then(res => {
  res.data.data.unshift({ id: 0, name: '全部' })
  res.data.data.forEach((item: any) => {
    item.background = 'transparent'
    item.color = '#525252'
  });
  res.data.data[0].background = '#016BFF'
  res.data.data[0].color = '#fff'
  industry.value = res.data.data
})
const selectIndustryItem = (item: any) => {
  industry.value.forEach((value: any) => {
    value.background = 'transparent'
    value.color = '#525252'
  });
  item.background = '#016BFF'
  item.color = '#fff'
}
</script>

<style lang="scss" scoped>
@import './list.scss';
</style>