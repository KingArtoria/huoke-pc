<template>
  <div class="item">
    <div class="photo-wrap">
      <img :src="host + item.head" alt="" class="photo">
    </div>
    <div class="flex-1 overflow-hidden">
      <div class="top">
        <p class="title" :title="item.title">{{ item.title }}</p>
        <p class="flex sub-title">
          <span>杨月</span>
          <span class="line"></span>
          <span>产品经理</span>
          <span class="line"></span>
          <span>公司</span>
          <img src="" alt="" class="vip-icon">
          <span class="date">2021-06-29</span>
        </p>
        <div class="type">广告甲方</div>
      </div>
      <div class="bottom">
        <span class="tag">日结</span>
        <span class="tag">结算方式：CPS</span>
        <span class="tag">地推</span>
        <span>合作区域：全国</span>
        <span class="right flex items-center">
          <el-icon class="icon">
            <View />
          </el-icon>
          <span>255</span>
        </span>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
  item: any
}>()
// 图片地址前缀
const host = 'https://admin.bdhuoke.com/'
</script>

<style lang="scss" scoped>
.item {
  padding: 28px 19px 32px 15px;
  display: flex;
  background-color: white;
  border-bottom: 1px solid #F6F6F6;
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0px 0px 27px 0px rgba(134, 177, 255, 0.53);
    transform: translateZ(0);
  }

  .photo-wrap {
    margin-right: 10px;

    .photo {
      width: 45px;
      height: 45px;
      border-radius: 23px;
    }
  }

  .title {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #3A3A3A;
    margin-bottom: 14px;
  }

  .top {
    padding-bottom: 20px;
    border-bottom: 1px solid #F6F6F6;
    position: relative;
  }

  .type {
    padding: 6px;
    border: 1px solid #1F73F1;
    border-radius: 5px;
    position: absolute;
    right: 0;
    bottom: 2px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #1F73F1;
  }

  .bottom {
    margin-top: 16px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #949494;
  }

  .right {
    margin-left: auto;
    color: #C1C1C1;

    .icon {
      color: #D8D8D8;
      margin-right: 6px;
    }
  }

  .tag {
    padding: 5px 9px;
    background: #E9F3FF;
    border-radius: 3px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #56689B;
    margin-right: 30px;
  }

  .sub-title {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #B7B7B7;
  }

  .line {
    width: 1px;
    height: 14px;
    background: #B7B7B7;
    margin: 0 9px;
  }
}
</style>