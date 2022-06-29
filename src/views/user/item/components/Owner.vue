<template>
  <div>
    <div v-if="items.length" class="grid grid-cols-2 gap-x-36 gap-y-20">
      <div v-for="item in items" :key="item.id" class="flex items-start item">
        <div class="img-wrap app-flex-center">
          <img :src="DOMAIN + item.image" alt="" class="img">
        </div>
        <div class="flex-1">
          <p class="title">{{ item.title }}</p>
          <p class="desc">{{ item.remark }}</p>
          <p class="price">拥有:{{ item.num }}张</p>
          <button class="btn" @click="useItem(item)">使用</button>
        </div>
      </div>
    </div>
    <Empty v-else />
    <SelectProject v-if="projectVisible" v-model="projectVisible" :coupons="couponsId" @update="showSuccess" />
    <Success v-if="successVisible" v-model="successVisible" :type="couponsId" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { userCouponsAPI } from '@/utils/api'
import Empty from '@/components/Empty.vue';
import { DOMAIN } from '@/utils/const'
import SelectProject from './SelectProject.vue';
import Success from './Success.vue';

interface IItem {
  id: number; // 道具id
  image: string; // 道具图片
  num: number; // 道具数量
  remark: string; // 道具描述
  title: string; // 道具名称
}

// 我的道具
const items = ref<IItem[]>([])
// 获取道具
const getData = () => {
  userCouponsAPI().then(res => {
    items.value = res.data.data.user_coupons
  })
}
getData()
const projectVisible = ref(false)
const successVisible = ref(false)
const couponsId = ref()
// 使用道具
const useItem = (item: any) => {
  couponsId.value = item.id
  projectVisible.value = true
}
// 弹出成功提示
const showSuccess = () => {
  getData()
  successVisible.value = true
}
</script>

<style lang="scss" scoped>
.img-wrap {
  width: 109px;
  height: 109px;
  background: #F6F6F6;
  border-radius: 50%;
  margin-right: 16px;

  .img {
    width: 92px;
    height: 58px;
  }
}

.item {
  padding: 16px 10px 5px 5px;
  border: 1px solid #D2D2D2;
  border-radius: 3px;
}

.item:hover {
  border: 1px solid #C8E3FC;
  box-shadow: 0px 0px 18px 0px rgba(35, 123, 255, 0.21);
}

.title {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #323232;
}

.desc {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #848484;
  margin: 10px 0;
  line-height: 17px;
}

.price {
  font-size: 16px;
  color: #1F73F1;
  margin-bottom: 10px;
}

.btn {
  font-size: 14px;
  color: #fff;
  width: 66px;
  height: 26px;
  background: #1F73F1;
  border-radius: 15px;
}
</style>