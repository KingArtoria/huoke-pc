<template>
  <div class="page">
    <template v-if="!isBuy">
      <p class="flex justify-end items-center color-848484 pt-20 pr-40">
        <span class="link" @click="navTo('/user/item?tab=owner')">我的道具</span>
        <span class="line"></span>
        <span class="link" @click="navTo('/user/item?tab=record')">兑换记录</span>
      </p>
      <!-- 积分兑换 -->
      <div class="conversion">
        <div class="grid grid-cols-3 gap-y-16">
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
    </template>
    <!-- 道具卡购买 -->
    <div v-if="isBuy">
      <p class="flex justify-end items-center color-848484 pt-20 pr-40">
        <span class="link" @click="isBuy = !isBuy">返回</span>
      </p>
      <div class="conversion buy">
        <div class="flex items-start item">
          <div class="img-wrap app-flex-center">
            <img :src="good.image" alt="" class="img">
          </div>
          <div class="flex-1 h-80 flex flex-col justify-center">
            <p class="title">{{ good.title }}</p>
            <p class="desc">{{ good.remark }}</p>
          </div>
        </div>
        <div class="mt-20 mb-40">
          <span>总计金额</span>
          <span class="money">￥{{ good.price }}</span>
        </div>
        <PayMode :goodsId="good.id" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { goodslistAPI } from '@/utils/api'
import { GOOD_TYPE, DOMAIN } from '@/utils/const'
import PayMode from './PayMode.vue'

// 积分兑换的道具
const items = ref<any>([])
// 道具卡购买
const isBuy = ref(false)
// 获取道具
goodslistAPI({
  type: GOOD_TYPE.DJK
}).then(res => {
  res.data.data.forEach((v: any) => {
    v.image = DOMAIN + v.image
  })
  items.value = res.data.data
})

// 跳转到我的道具页面
const router = useRouter()
const navTo = (path: string) => {
  router.push(path)
}
// 购买的物品
const good = ref<any>({})
// 购买道具卡
const doBuy = (item: any) => {
  good.value = item
  isBuy.value = true
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

.buy {
  .img-wrap {
    width: 80px;
    height: 80px;
  }

  .item {
    padding-left: 0;
  }

  .money {
    color: #F70029;
    font-size: 20px;
    margin-left: 10px;
  }

  .desc {
    width: 100%;
  }
}
</style>