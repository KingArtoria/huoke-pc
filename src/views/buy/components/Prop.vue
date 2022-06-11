<template>
  <div class="page">
    <p class="flex justify-end items-center color-848484 pt-20 pr-40">
      <span class="link" @click="navToItem">我的道具</span>
      <span class="line"></span>
      <span class="link">兑换记录</span>
    </p>
    <!-- 积分兑换 -->
    <div class="conversion">
      <div class="grid grid-cols-3 gap-y-16">
        <!-- coupons_id: 13
discount: "1.00"
endtime: null
id: 18
image: "/pic/icon/chakank.png"
key: "DJ_DCCKZY"
mark: "v41"
num: 10
price: "118.00"
remark: "增加一次查看联系方式次数"
status: 1
title: "单次查看资源卡（10张）"
type: "DJK" -->
        <div v-for="item in items" class="flex items-start item">
          <div class="img-wrap app-flex-center">
            <img :src="item.image" alt="" class="img">
          </div>
          <div class="flex-1">
            <p class="title">{{ item.title }}</p>
            <p class="desc overflow-clip">{{ item.remark }}</p>
            <p class="price">￥{{ item.price }}</p>
            <button class="btn" @click="doBuy(item)">购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils'
import { useRouter } from 'vue-router';
import { goodslistAPI } from '@/utils/api'
import { GOOD_TYPE, DOMAIN } from '@/utils/const'
const call = defineEmits(['close'])
// 积分兑换的道具
const items = ref<any>([])
// 获取道具
goodslistAPI({
  type: GOOD_TYPE.DJK
}).then(res => {
  res.data.data.forEach((v: any) => {
    v.image = DOMAIN + v.image
  })
  items.value = res.data.data
})
// 关闭窗口
const close = () => {
  call('close')
}
// 签到成功
const successVisible = ref(false)
// 跳转到我的道具页面
const router = useRouter()
const navToItem = () => {
  router.push({
    path: '/user/item'
  })
}
// 购买道具卡
const doBuy = (item: any) => {

}
</script>

<style lang="scss" scoped>
.page {
  background: white;
}

.conversion {
  padding: 20px;

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
  }

  .item:hover {
    background: #F0F7FF;
    border-radius: 5px;
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
    font-size: 18px;
    color: #F70029;
    margin-bottom: 10px;
  }


}

.btn {
  font-size: 14px;
  color: #fff;
  width: 66px;
  height: 26px;
  background: #1F73F1;
  border-radius: 15px;
}

.line {
  width: 1px;
  height: 13px;
  background: #e0e0e0;
  margin: 0 26px;
}

.link {
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
  color: #1F73F1;
}
</style>