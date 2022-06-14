<template>
  <el-dialog v-model="modelValue" width="790px" :close-on-click-modal="false" :before-close="close">
    <template #header>
      <p class="title">选择合作对象</p>
    </template>
    <div class="center">
      <div class="flex items-center mb-30">
        <div class="input-wrap">
          <img :src="loadImg('sousu_xzhzdx@2x.png')" alt="" class="icon">
          <input v-model="searchText" type="text" class="input" placeholder="搜索用户名/手机号">
        </div>
        <div class="mx-20">
          <el-button type="text">搜索</el-button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-10">
        <div v-for="item in users" class="item flex" @click="select(item)">
          <img :src="item.img" alt="" class="img">
          <div class="flex-1">
            <p class="flex items-end">
              <span>张三</span>
              <img src="" alt="">
            </p>
            <p class="fs-13 color-8D8D8D mt-10">
              <span>公司</span>
              <span>-</span>
              <span>职位</span>
            </p>
          </div>
          <button class="select-btn">选择</button>
          <!-- <div>
            <p class="label">{{ item.title }}</p>
            <p class="desc">{{ item.desc }}</p>
          </div> -->
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils';

defineProps<{
  modelValue: boolean
}>()
const call = defineEmits(['update:modelValue'])
// 关闭窗口
const close = () => {
  call('update:modelValue', false)
}
const users = [
  { img: loadImg('ggjf@2x.png'), title: '需求', desc: '我是广告甲方，寻CPS、CPA、CPC等合作', type: 1 },
  { img: loadImg('llyf@2x.png'), title: '供应', desc: '我是流量乙方，自有渠道，寻广告甲方', type: 2 },
  { img: loadImg('yzhy_@2x.png'), title: '优质货源', desc: '我有优质货源，寻销售渠道合作', type: 3 },
  { img: loadImg('xsqd@2x.png'), title: '销售渠道', desc: '我有销售渠道，寻优质货源', type: 4 },
  { img: loadImg('zyhh@2x.png'), title: '资源互换', desc: '善用彼此资源，创造共同利益', type: 5 },
  { img: loadImg('llhh_j@2x.png'), title: '流量互换', desc: '善用彼此资源，创造共同利益 ', type: 6 },
  { img: loadImg('zsjm_j@2x.png'), title: '招商加盟', desc: '全国招商加盟，寻求合作机会', type: 7 },
  { img: loadImg('xianxgg@2x.png'), title: '线下广告', desc: '我有线下媒体广告位，寻广告甲方', type: 8 },
  { img: loadImg('xianxicd@2x.png'), title: '线下场地', desc: '我有线下场地，寻活动合作等', type: 9 },
  { img: loadImg('mffl+j@2x.png'), title: '免费福利', desc: '免费提供各种体验卡、小礼品抵用券等', type: 10 },
  // { img: loadImg('xmtzr@2x.png'), title: '新媒体转让', desc: '我有新媒体账号，微博、痘印、微信公众号等', type: 11 },
  // { img: loadImg('wazzr@2x.png'), title: '网站转让', desc: '我有网站需要转让', type: 12 },
  // { img: loadImg('ymzr_j@2x.png'), title: '域名转让', desc: '免费提供各种体验卡、小礼品抵用券等', type: 13 },
  { img: loadImg('sy_hwyw@2x.png'), title: '海外项目', desc: '海外支付、流量变现、拉新等', type: 11 },
]
const searchText = ref('')
const doSearch = () => {

}
const select = (item: any) => {

}
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
  padding: 16px;
  border: 1px solid #E7E7E7;
  border-radius: 3px;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;

  .select-btn {
    width: 69px;
    height: 25px;
    border: 1px solid #BDBDBD;
    border-radius: 13px;
    color: #BDBDBD;
    position: absolute;
    top: 26px;
    right: 26px;
    transition: all 0.3s;
  }

  &:hover {
    box-shadow: 0px 1px 7px 0px rgba(187, 187, 187, 0.32);
    border-color: #8DBBFF;

    .select-btn {
      border-color: #0C6CFD;
      color: #0C6CFD;
    }
  }

  .img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-right: 10px;
  }
}

.color-8D8D8D {
  color: #8D8D8D;
}

.input-wrap {
  flex: 1;
  height: 41px;
  background: #F8F8F8;
  border: 1px solid #EEEEEE;
  display: flex;
  align-items: center;
  padding: 14px;

  .icon {
    width: 15px;
    height: 15px;
    margin-right: 14px;
  }

  .input {
    flex: 1;
    background-color: #F8F8F8;
    outline: none;
  }
}

::v-deep(.el-button--text) {
  font-size: 16px;
}
</style>