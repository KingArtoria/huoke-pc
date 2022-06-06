<template>
  <div class="page">
    <p class="flex justify-end">
      <span class="link">我的道具</span>
      <span class="line"></span>
      <span class="link">兑换记录</span>
    </p>
    <!-- 积分兑换 -->
    <div class="conversion">
      <div class="leader">积分兑换</div>
      <div class="grid grid-cols-3 gap-y-16">
        <div v-for="item in items" class="flex items-center item">
          <div class="img-wrap"></div>
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
const call = defineEmits(['close'])
// 积分兑换的道具
const items = [
  { img: '', title: '单次查看联系方式', desc: '置顶一条已发布内容在首页 推荐栏并带有超级置顶标志', price: 350 },
  { img: '', title: '广告甲方置顶卡', desc: '置顶一条已发布广告甲方内容', price: 350 },
  { img: '', title: '流量乙方置顶卡', desc: '置顶一条已发布流量乙方内容', price: 350 },
  { img: '', title: '一天会员卡', desc: '普通会员一天试用', price: 350 },
  { img: '', title: '加人脉卡（5次）', desc: '5次免费加人脉', price: 350 },
  { img: '', title: '标题变色卡', desc: '仅限一次使用查看联系方式', price: 350 },
]
// 关闭窗口
const close = () => {
  call('close')
}
// 签到成功
const successVisible = ref(false)
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);

  .content {
    position: absolute;
    width: 842px;
    height: 673px;
    background: #F4F4F4;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

}

.header {
  background: url('@/assets/qiandao_banner@2x.png') no-repeat;
  background-size: cover;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 30px;
  font-family: PingFang SC;
  // font-weight: bold;
  color: #FFFFFF;

  .close {
    position: absolute;
    width: 15px;
    height: 15px;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  .line {
    width: 1px;
    height: 54px;
    background: #FFFFFF;
    margin: 0 80px;
  }

  .label {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 20px;
  }
}

.day {
  margin: 18px 20px;
  background: white;
  border-radius: 9px;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }

  .day-wrap {
    padding: 35px 35px 20px 35px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 1px;
      background: #F4F4F4;
      left: 35px;
      right: 35px;
      top: 60px;
    }
  }

  .sign-img {
    width: 21px;
    height: 15px;
  }

  .gift-img {
    width: 28px;
    height: 40px;
  }

  .top {
    width: 48px;
    height: 48px;
    background: #D8E2EF;
    border-radius: 50%;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #6485B1;

    &.active {
      background: linear-gradient(0deg, #43B4FE 0%, #2589FC 100%);
      color: white;
    }

    &.is-gift {
      background: #FFEEC1;
    }
  }

  .text {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #525252;
    margin-top: 18px;
  }
}

.leader {
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #696969;
  position: relative;
  padding: 10px 0 0 20px;

  &::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 13px;
    background: #1F73F1;
    border-radius: 2px;
    left: 9px;
  }
}

.conversion {
  // margin: 0 20px;
  // background: white;
  // border-radius: 9px;

  .grid {
    // padding: 20px 10px 30px 10px;
  }

  .img-wrap {
    width: 109px;
    height: 109px;
    background: #F6F6F6;
    border-radius: 50%;
    margin-right: 16px;
  }

  .item {
    padding: 16px 10px 5px 5px;
  }

  .item:hover {
    background: #F0F7FF;
    border-radius: 5px;
  }

  .title {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #323232;
  }

  .desc {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #848484;
    margin: 6px 0;
    min-height: 30px;
    width: 156px;
    line-height: 17px;
  }

  .score {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1F73F1;
  }


}

.btn {
  padding: 5px 17px;
  background: #EAF2FF;
  border: 1px solid #1F73F1;
  border-radius: 5px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #1F73F1;
  margin-top: 6px;
}

.success-mask {
  position: fixed;
  z-index: 11;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .success {
    position: absolute;
    width: 399px;
    height: 401px;
    background: #FFFFFF;
    box-shadow: 0px 0px 49px 0px rgba(73, 73, 73, 0.26);
    border-radius: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .title {
    margin: 33px 0 0;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #424242;
    text-align: center;
  }

  .img-wrap {
    width: 374px;
    height: 226px;
    margin: 0 auto;
    background: url('@/assets/libao@2x.png') no-repeat;
    background-size: cover;
  }

  .sub-title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #959595;
    margin-top: 21px;
    text-align: center;
  }

  .btn-wrap {
    margin-top: 35px;
    text-align: center;
  }

  .close {
    width: 13px;
    height: 13px;
    position: absolute;
    top: 21px;
    right: 21px;
    cursor: pointer;
  }
}
</style>