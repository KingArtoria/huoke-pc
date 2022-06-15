<template>
  <div v-if="items.length" class="grid  grid-cols-2 gap-x-36 gap-y-20 pt-20">
    <div v-for="item in items" :key="item.id" class="flex items-start item">
      <div class="img-wrap app-flex-center">
        <img :src="loadImg(item.img)" alt="" class="img">
      </div>
      <div class="flex-1">
        <p class="title">{{ item.title }}</p>
        <p class="desc">{{ item.desc }}</p>
        <p class="price">拥有:{{ item.count }}张</p>
        <button class="btn">使用</button>
      </div>
    </div>
  </div>
  <Empty v-else />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { userCouponsAPI } from '@/utils/api'
import { loadImg } from '@/utils'
import Empty from '@/components/Empty.vue';

// 我的道具
const items = ref<any>([])
userCouponsAPI().then(res => {
  items.value = res.data.data.user_coupons
})
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
  width: 156px;
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