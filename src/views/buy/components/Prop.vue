<template>
  <div class="page">
    <p class="flex justify-end items-center color-848484 pt-20 pr-40">
      <span class="link">我的道具</span>
      <span class="line"></span>
      <span class="link">兑换记录</span>
    </p>
    <!-- 积分兑换 -->
    <div class="conversion">
      <div class="grid grid-cols-3 gap-y-16">
        <div v-for="item in items" class="flex items-start item">
          <div class="img-wrap app-flex-center">
            <img :src="loadImg(item.img)" alt="" class="img">
          </div>
          <div class="flex-1">
            <p class="title">{{ item.title }}</p>
            <p class="desc overflow-clip">{{ item.desc }}</p>
            <p class="price">￥{{ item.price }}</p>
            <button class="btn">购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils'
const call = defineEmits(['close'])
// 积分兑换的道具
const items = [
  { img: 'chakank@3x@2x.png', title: '单次查看联系方式', desc: '仅限一次使用查看联系方式', price: 5 },
  { img: 'zhidingk@3x@2x.png', title: '广告甲方置顶卡', desc: '置顶一条已发布广告甲方内容', price: 5 },
  { img: 'zdka@3x@2x.png', title: '流量乙方置顶卡', desc: '置顶一条已发布流量乙方内容', price: 5 },
  { img: 'huiyuan@3x@2x.png', title: '一天会员卡', desc: '普通会员一天试用', price: 350 },
  { img: 'renmai@3x@2x.png', title: '加人脉卡（5次）', desc: '5次免费加人脉', price: 350 },
  { img: 'bianse@3x@2x.png', title: '标题变色卡', desc: '仅限一次使用查看联系方式', price: 350 },
  { img: 'sytjzdi@3x@2x.png', title: '首页推荐置顶卡', desc: '仅限一次使用查看联系方式', price: 350 },
  { img: '9zhegk@3x@2x.png', title: '9折购半年会员', desc: '仅限一次使用查看联系方式', price: 350 },
  { img: '组 254@2x.png', title: '8.5折购一年会员', desc: '仅限一次使用查看联系方式', price: 350 },
  { img: 'sycjzd@3x@2x.png', title: '首页超级置顶卡', desc: '置顶一条已发布内容在首页推荐栏并带 有超级置顶标志', price: 350 },
]
// 关闭窗口
const close = () => {
  call('close')
}
// 签到成功
const successVisible = ref(false)
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