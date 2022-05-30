<template>
  <div class="item">
    <div class="photo-wrap">
      <img :src="host + item.head" alt="" class="photo">
    </div>
    <div class="flex-1 overflow-hidden">
      <div class="top">
        <p class="title" :style="{color: item.color}" :title="item.title">{{ item.title }}</p>
        <p class="flex sub-title">
          <span>{{ item.nick_name }}</span>
          <span v-if="item.position" class="line"></span>
          <span>{{ item.position }}</span>
          <span v-if="item.company" class="line"></span>
          <span>{{ item.company }}</span>
          <img src="" alt="" class="vip-icon">
          <span class="date">{{ fmtDate(item.addtime) }}</span>
        </p>
        <div class="type">{{ fmtType(item.type) }}</div>
      </div>
      <div class="bottom">
        <span v-if="item.settcycle_id" class="tag">{{ item.settcycle_id }}</span>
        <span v-if="item.settmod_id" class="tag">结算方式：{{ item.settmod_id }}</span>
        <span v-if="item.promotion" class="tag">{{ item.promotion }}</span>
        <span>合作区域：{{ item.area }}</span>
        <span class="right flex items-center">
          <el-icon class="icon">
            <View />
          </el-icon>
          <span>{{ item.viewcount }}</span>
        </span>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { COOPERATION_TYPES } from '@/utils/const'
import { matchLabel } from '@/utils/index'
defineProps<{
  item: any
}>()
// 图片地址前缀
const host = 'https://admin.bdhuoke.com/'
// 格式化日期
const fmtDate = (val: string) => {
  return val ? dayjs(val).format('YYYY-MM-DD-HH:mm') : ''
}
// 格式化合作类型
const fmtType = (val: number) => {
  return val ? matchLabel(val, COOPERATION_TYPES) : val
}
</script>

<style lang="scss" scoped>
.item {
  padding: 26px 19px 32px 15px;
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
    padding-top: 5px;

    .photo {
      width: 45px;
      height: 45px;
      border-radius: 23px;
    }
  }

  .title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #3A3A3A;
    margin-bottom: 14px;
    line-height: 29px;
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
    bottom: 3px;
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

  .date {
    margin-left: 8px;
  }
}
</style>