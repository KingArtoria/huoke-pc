<template>
  <div class="mask">
    <div class="content">
      <header class="header">
        <div class="flex items-center header-wrap">
          <div class="flex flex-col items-center head-item">
            <p class="label">我的积分</p>
            <p>{{ score }}</p>
          </div>
          <div class="line"></div>
          <div class="flex flex-col items-center head-item">
            <p class="label">我的VIP时长</p>
            <p>{{ vipDays }}天</p>
          </div>
        </div>
        <img :src="closeImg" alt="" class="close" @click="close">
      </header>
      <!-- 签到领积分 -->
      <div class="day">
        <div class="leader">签到领积分</div>
        <div class="day-wrap flex justify-between">
          <div v-for="item in signDay" class="item">
            <div class="top flex items-center justify-center" :class="{ active: item.isSign, 'is-gift': item.isGift }">
              <img v-if="item.isSign" :src="signImg" alt="" class="sign-img">
              <img v-if="item.isGift" :src="giftImg" alt="" class="gift-img">
              <span v-if="!item.isSign && !item.isGift">+{{ item.score }}</span>
            </div>
            <p class="text">{{ item.day }}天</p>
          </div>
        </div>
      </div>
      <!-- 积分兑换 -->
      <div class="conversion">
        <div class="leader">积分兑换</div>
        <div class="grid grid-cols-3 gap-y-16">
          <div v-for="item in items" :key="item.id" class="flex items-center item">
            <div class="img-wrap app-flex-center">
              <img :src="DOMAIN + item.image" alt="" class="img">
            </div>
            <div class="flex-1">
              <p class="title">{{ item.title }}</p>
              <p class="desc overflow-clip">{{ item.remark }}</p>
              <p class="score">{{ item.integral }} <span>积分</span></p>
              <button class="btn app-flex-center" @click="exchange(item)">兑换</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 签到成功 -->
  <div v-if="successVisible" class="success-mask">
    <div class="success">
      <img :src="blackCloseImg" alt="" class="close" @click="successVisible = false">
      <p class="title">签到成功</p>
      <div class="img-wrap">
        <p class="sub-title">恭喜您获得{{ todayScore }}积分</p>
      </div>
      <div class="btn-wrap">
        <button class="btn" @click="successVisible = false">知道了</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import closeImg from '@/assets/close_jf@2x.webp'
import signImg from '@/assets/xuan_x@2x.webp'
import giftImg from '@/assets/diqit@2x.webp'
import blackCloseImg from '@/assets/close_qdcg@2x.webp'
import { getSignInfoAPI, setPunchCardAPI, getCouponsAPI, setCouponsAPI } from '@/utils/api'
import { DOMAIN } from '@/utils/const'
import { ElMessage, ElMessageBox } from 'element-plus';
import { once, removeToekn } from '@/utils';
import { useRouter } from 'vue-router';


const call = defineEmits(['close'])
// 用户积分
const score = ref(0)
// 今日签到积分
const todayScore = ref(0)
// 用户VIP天数
const vipDays = ref(0)
// 签到天数
const signDay = ref([
  { day: 1, isSign: false, score: 0, isGift: false },
  { day: 2, isSign: false, score: 0, isGift: false },
  { day: 3, isSign: false, score: 0, isGift: false },
  { day: 4, isSign: false, score: 0, isGift: false },
  { day: 5, isSign: false, score: 0, isGift: false },
  { day: 6, isSign: false, score: 0, isGift: false },
  { day: 7, isSign: false, score: 0, isGift: true },
])
// 积分兑换的道具
const items = ref<any>([])
getCouponsAPI().then(res => {
  items.value = res.data.data
})
// 关闭窗口
const close = () => {
  call('close')
}
// 签到成功
const successVisible = ref(false)
const router = useRouter()
// 签到信息
const signInfo = () => {
  getSignInfoAPI().then(res => {
    const { integral, is_sign, integrallsst, dayslog, vip_surplus } = res.data.data
    score.value = integral
    vipDays.value = parseInt(vip_surplus)
    // 今日未签到
    if (is_sign === 0) {
      setPunchCardAPI().then(() => {
        todayScore.value = integrallsst[dayslog].number
        successVisible.value = true
        signInfo()
      })
    }
    const _dayslog = is_sign === 1 ? dayslog + 1 : dayslog
    signDay.value.forEach((val: any, ind: number) => {
      val.isSign = ind < _dayslog
      val.score = integrallsst[ind].number
    })
  }).catch(() => {
    // 清除token
    removeToekn()
    router.replace('/login')
  })
}
signInfo()

// 兑换道具
const exchange = once((done: Function, payload: any) => {
  if (score.value < payload.integral) {
    ElMessage.error('积分不足')
    done()
    return
  }
  ElMessageBox.confirm('确定兑换吗？', '提示', {
    confirmButtonText: "确定",
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    setCouponsAPI({ coupons_id: payload.id }).then(() => {
      ElMessage.success('兑换成功')
      // 刷新数据
      signInfo()
      done()
    }).catch(() => {
      done()
    })
  }).catch(() => {
    done()
  })
})
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
    // height: 673px;
    background: #F4F4F4;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

}

.header {
  background: url('@/assets/qiandao_banner@2x.webp') no-repeat;
  background-size: cover;
  height: 100px;
  position: relative;
  font-size: 30px;
  font-family: PingFang SC;
  color: #FFFFFF;

  .header-wrap {
    width: 500px;
    margin: 0 auto;
    height: 100%;

    .head-item {
      width: 50%;
    }
  }

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
  margin: 0 20px;
  background: white;
  border-radius: 9px;

  .grid {
    padding: 20px 10px 30px 10px;
  }

  .img-wrap {
    width: 87px;
    height: 88px;
    background: #F6F6F6;
    border-radius: 50%;
    margin-right: 6px;

    .img {
      width: 75px;
      height: 47px;
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
    background: url('@/assets/libao@2x.webp') no-repeat;
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