<template>
  <div>
    <div class="banner">
      <img :src="loadImg('guanyuwomen.png')" alt="">
      <div class="center absolute">
        <router-link to="/" class="home">回首页</router-link>
      </div>
    </div>
    <div class="bg-white">
      <div class="center flex flex-col items-center part1">
        <h1 class="title">公司介绍</h1>
        <p class="color-939393 mt-30 fs-18">Company Introduction</p>
        <div class="line"></div>
        <div class="flex mt-100">
          <div class="grid _grid">
            <img :src="loadImg('tu1.png')" alt="" class="col-span-2">
            <img :src="loadImg('tu2.png')" alt="">
            <img :src="loadImg('tu3.png')" alt="">
          </div>
          <div class="introduce">
            <p class="introduce-title">徐州星跃联动网络科技有限公司</p>
            <p class="introduce-desc">
              火客是一家集资源整合，优质货源，销售渠道，资源互换，招商加盟，线下广告，线下场地，免费福利，新媒体账号转让，网站转让，域名转让，异业合作，项目对接，流量变现，投放广告等一体的综合性资源平台，平台成立至今成交项目达上万余个，在广告主寻找乙方以及流量主寻找甲方的对接中体现出了强大的资源整合实力。
            </p>
            <p class="introduce-light">
              我们激情四射，底蕴丰厚；我们活力无限，耐得住寂寞；<br>
              我们满怀理想，脚踏实地，讲求效率，关注实现；<br>
              我们创想无限，我们拒绝平庸！
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="center flex flex-col items-center part2">
      <h1 class="title">联系我们</h1>
      <p class="color-939393 mt-30 fs-18">Contact Us</p>
      <div class="line"></div>
      <div class="inline-block mx-auto mt-60 mobile">
        <p class="flex mb-20">
          <span class="app-flex-center">
            <img :src="loadImg('dianhua.png')" alt="" class="mr-14">
          </span>
          <span>联系电话：0516-8389-8991</span>
        </p>
        <p class="flex mb-20">
          <span class="app-flex-center">
            <img :src="loadImg('email.png')" alt="" class="mr-14">
          </span>
          <span>电子邮箱：gaojiuan@163.com</span>
        </p>
        <p class="flex">
          <span class="app-flex-center">
            <img :src="loadImg('wechat.png')" alt="" class="mr-14">
          </span>
          <span>微信：18511169119 田先生</span>
        </p>
      </div>
      <img :src="loadImg('ditu.png')" alt="" class="mt-50">
    </div>
  </div>
</template>
<script setup lang="ts">
import { loadImg } from '@/utils';
</script>

<style lang="scss" scoped>
.banner {
  background-size: cover;
  position: relative;
  .center {
    position: absolute;
    top: 0;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}

.center {
  width: var(--main-width);
  position: relative;
  margin: 0 auto;
}

.home {
  position: absolute;
  color: white;
  top: 22px;
}

._grid {
  display: grid;
  width: 472px;
  grid-template-columns: 272px 169px;
  column-gap: 30px;
  row-gap: 25px;
  margin-right: 120px;
  // margin-top: 101px;
}

.color-939393 {
  color: #939393;
}

.part1 {
  padding: 130px 0 105px;
}

.part2 {
  padding: 70px 0 105px;
}

.line {
  width: 135px;
  height: 4px;
  background: #2473E3;
  margin-top: 28px;
}

.title {
  font-weight: 800;
  font-size: 38px;
}

.introduce {
  width: 550px;

  &-title {
    margin: 12px 0 39px;
    font-size: 38px;
    font-weight: 500;
    color: #333;
  }

  &-desc {
    color: #909090;
    font-size: 16px;
    line-height: 37px;
  }

  &-light {
    margin-top: 70px;
    padding: 14px 18px;
    font-size: 16px;
    color: #2473E3;
    line-height: 35px;
    background: #E6F0FF;
    border-radius: 7px;
    overflow: hidden;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 6px;
      background: #2473E3;
      left: 0;
      top: 0;
      bottom: 0;
    }
  }
}

.mobile {
  font-size: 16px;
  color: #757777;
}
</style>