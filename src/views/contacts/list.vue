<template>
  <div>
    <div class="content">
      <img :src="loadImg('banner-huy@2x.webp')" class="content_2 cursor-pointer" @click="nav('/buy')">
      <div class="content_3">
        <div class="content_3_1">
          <div class="content_3_1_1">所属行业:</div>
          <div class="content_3_1_2">
            <div class="content_3_1_2_1" v-for="(item, index) in industry" :key="index"
              :style="`background:${item['background']};color:${item['color']}`" @click="selectIndustryItem(item)">{{
                  item['name']
              }}
            </div>
          </div>
        </div>
        <div class="content_3_1 mt-24">
          <div class="content_3_1_1">所在地区:</div>
          <div class="content_3_1_2">
            <div class="content_3_1_2_1" v-for="(item, index) in province" :key="index"
              :style="`background:${item['background']};color:${item['color']}`" @click="selectItem(item)">{{
                  item['name']
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="content_4">
        <networkVue v-for="(item, index) in recommend" :key="index" :item="item"
          @addFriendapply="addFriendapply" />
      </div>
      <div class="content_5" @click="getRecommendListSpecial">换一批</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addFriendapplyAPI, getIndustryListAPI, getRecommendList, provinceAPI } from "@/utils/api";
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
// @ts-ignore
import networkVue from "@/components/Network.vue";
import { ElMessage } from "element-plus";
import { loadImg } from "@/utils";

const title = useRoute().query.keyword as string
const province = ref([])
const industry = ref([])
const recommend = ref([])
const params = ref({ limit: 15, industry_one: 0, city: 0, title })
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
  params.value.city = item.id
  getRecommendListSpecial()
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
  params.value.industry_one = item.id
  getRecommendListSpecial()
}
const getRecommendListSpecial = () => {
  getRecommendList(params.value).then(res => {
    res.data.data.forEach((item: any) => {
      item.position == "" && (item.position = "暂未填写")
      item.company == "" && (item.company = "暂未填写")
    });
    recommend.value = res.data.data
  })
}
getRecommendListSpecial()
const addFriendapply = (item: any) => {
  addFriendapplyAPI({ toid: item.member_id }).then(res => {
    if (res.data.code != 1) return ElMessage.error(res.data.msg)
    ElMessage.success(res.data.msg)
  })
}

const router = useRouter()
const nav = (path: string) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>
@import './list.scss';
</style>