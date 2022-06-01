<template>
  <el-dialog :model-value="true" width="820px" :close-on-click-modal="false" :before-close="close">
    <template #header>
      <p class="title">浏览用户</p>
    </template>
    <p class="mb-14">浏览人数：500</p>
    <div class="grid grid-cols-2 gap-10">
      <div v-for="item in users" class="item flex items-center">
        <img :src="item.img" alt="" class="img">
        <div>
          <p class="flex items-end">
            <span class="mb-10 text">{{ item.name }}</span>
            <img src="" alt="" class="vip-img">
          </p>
          <p class="desc">
            <span>{{ companyShort(item.company) }}</span>
            <span class="ml-10">{{ item.posi }}</span>
          </p>
        </div>
        <button class="btn app-flex-center" @click="addFriend(item.id)">加好友</button>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils';
const call = defineEmits(['close'])
const users = [
  { img: loadImg('ggjf@2x.png'), name: '张三', vipType: 1, id: 1, company: '公司名称公司名称公司名称', posi: '商务经理' },
  { img: loadImg('ggjf@2x.png'), name: '张三', vipType: 1, id: 1, company: '公司名称公司名称公司名称', posi: '商务经理' },
  { img: loadImg('ggjf@2x.png'), name: '张三', vipType: 1, id: 1, company: '公司名称公司名称公司名称', posi: '商务经理' },
  { img: loadImg('ggjf@2x.png'), name: '张三', vipType: 1, id: 1, company: '公司名称公司名称公司名称', posi: '商务经理' },
  { img: loadImg('ggjf@2x.png'), name: '张三', vipType: 1, id: 1, company: '公司名称公司名称公司名称', posi: '商务经理' },

]
// 超过一定字数做截取
const companyShort = (val: string) => {
  if (val) {
    if (val.length > 8) {
      return val.substring(0, 8) + '...'
    }
  }
  return val
}
const close = () => {
  call('close')
}
// 添加好友
const loading = false
const addFriend = (id: number) => {
  if (loading) return
  // TODO 添加好友
}
defineExpose({
  open
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #696969;
  text-align: center;
}

.item {
  padding: 16px 25px 16px 17px;
  border: 1px solid #E6E6E6;
  transition: all 0.3s;

  &:hover {
    border-color: #8DBBFF;
    box-shadow: 0px 1px 7px 0px rgba(187, 187, 187, 0.32);
  }

  .img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-right: 9px;
  }

  .desc {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #8D8D8D;
  }

  .text {
    color: #303030;
  }

  .btn {
    margin-left: auto;
    width: 69px;
    height: 25px;
    border: 1px solid #1F73F1;
    border-radius: 13px;
    color: #1F73F1;
  }
}

.center {
  width: 802px;
  margin: 0 auto;
}
</style>