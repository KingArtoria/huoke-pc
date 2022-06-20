<template>
  <div class="bg-white">
    <p class="title">全部通知</p>
    <div class="item relative">
      <img :src="loadImg('banner_big@2x.webp')" alt="" class="w-60 h-60 app-round mr-24">
      <div class="flex-1">
        <p class="flex items-end color-989898">
          <span class="fs-16 mr-20">好友请求</span>
          <span>2022-02-17 12:33</span>
        </p>
        <p class="fs-16 color-1b1b1b mt-16">英梨梨请求加您为好友,同行2个共同好友</p>
        <div class="right flex">
          <div class="right-item app-flex-center mr-40">
            <img :src="loadImg('jujue@2x.webp')" alt="" class="x-icon">
          </div>
          <div class="right-item app-flex-center">
            <img :src="loadImg('tongyi@2x.webp')" alt="" class="check-icon">
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <img :src="loadImg('banner_big@2x.webp')" alt="" class="w-60 h-60 app-round mr-24">
      <div class="flex-1">
        <p class="flex items-end color-989898">
          <span class="fs-16 mr-20">公告</span>
          <span>2022-02-17 12:33</span>
        </p>
        <p class="fs-16 color-1b1b1b mt-16">您有一个免费会员待领取，APP个人中心-分享好友查看邀请好友总数。</p>
        <img :src="loadImg('yqhy_banner@2x.webp')" alt="" class="mt-10">
      </div>
    </div>
    <div class="item">
      <img :src="loadImg('banner_big@2x.webp')" alt="" class="w-60 h-60 app-round mr-24">
      <div class="flex-1">
        <p class="flex items-end color-989898">
          <span class="fs-16 mr-20">公告</span>
          <span>2022-02-17 12:33</span>
        </p>
        <p class="fs-16 color-1b1b1b mt-16">发布优质项目，即可获得现金奖励，现金奖励将于次日11点到账用户钱包。</p>
        <img :src="loadImg('fbyzxm_banner@2x.webp')" alt="" class="mt-10">
      </div>
    </div>
    <div class="item"></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils';
</script>

<style lang="scss" scoped>
.item {
  padding: 28px 60px 40px 46px;
  border-bottom: 1px solid #f3f3f3;
  display: flex;

  .right {
    position: absolute;
    right: 60px;
  }

  .right-item {
    width: 47px;
    height: 31px;
    background: #F6F6F6;
    border-radius: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      background: #e9e9e9;
    }
  }

  .check-icon {
    width: 15px;
    height: 11px;
  }

  .x-icon {
    width: 12px;
    height: 11px;
  }
}

.title {
  font-size: 16px;
  color: #393939;
  padding: 18px 0 20px 46px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 15px;
    background: #1F73F1;
    left: 34px;
  }
}

.color-989898 {
  color: #989898;
}

.color-1b1b1b {
  color: #1b1b1b;
}
</style>