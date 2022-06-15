<template>
  <div class="p-34 bg-white">
    <p class="fs-18">担保记录</p>
    <!-- <div class="tabbar flex mt-38">
      <div v-for="tab in tabItems" class="tab-item app-flex-center"
        :class="[tab.value, { active: tab.value === activeTab }]">{{ tab.label
        }}</div>
    </div> -->
    <!-- <div class="p-20 item-wrap">
      
    </div> -->
    <div v-if="listData.length" class="p-20 item-wrap mt-38">
      <div v-for="item in listData" class="item p-20 bg-white mb-10">
        <p class="fs-16 mb-20">{{ item.details }}</p>
        <p class="mb-10">担保金额：<span class="color-FF0000">￥{{ item.price }}</span></p>
        <div class="line"></div>
        <p class="color-A0A0A0 mt-18">
          <span class="mr-60">付款方：{{ item.member_id }}</span>
          <span class="mr-60">收款方：{{ item.to_id }}</span>
          <span class="mr-60">发起时间：{{ item.createtime }}</span>
          <span class="mr-60">完成时间：{{ item.completetime }}</span>
        </p>
        <img :src="loadImg(stateMap[item.status])" alt="" class="img">
      </div>
      <!-- 分页 -->
      <footer class="footer flex justify-center">
        <el-pagination :current-page="page" :total="total" background layout="total, prev, pager, next, jumper"
          @current-change="changePage" />
      </footer>
    </div>
    <Empty v-else />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { memberGuaranteeAPI } from '@/utils/api'
import Empty from '@/components/Empty.vue';
import { loadImg } from '@/utils';

const listData = ref<any>([])
const total = ref(0)
const page = ref(1)
const stateMap: any = {
  1: 'yiwanc@2x.png',
  2: "yiwanc@2x (1).png",
  3: 'yiwanc@2x (2).png'
}
const getData = () => {
  memberGuaranteeAPI({ page: page.value, num: 10 }).then(res => {
    listData.value = res.data.data
    total.value = res.data.num
  })
}
getData()
// 翻页
const changePage = (pageIndex: number) => {
  page.value = pageIndex
  getData()
}
</script>

<style lang="scss" scoped>

.item-wrap {
  background: #F5F5F5;
}

.color-FF0000 {
  color: #FF0000;
}

.color-A0A0A0 {
  color: #A0A0A0;
}

.line {
  border-bottom: 1px solid #F6F6F6;
}

.item {
  position: relative;

  .img {
    width: 38px;
    height: 38px;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>