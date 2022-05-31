<template>
  <el-dialog v-model="visible" width="920px" :close-on-click-modal="false" :before-close="close">
    <template #header>
      <p class="title">选择发布合作信息</p>
    </template>
    <div class="center">
      <div class="grid grid-cols-3 gap-y-15 gap-x-26">
        <div v-for="item in items" class="item flex">
          <img :src="item.img" alt="" class="img">
          <div>
            <p class="label">{{ item.title }}</p>
            <p class="desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils';
// 控制窗口显示/隐藏
const visible = ref(false)
// 打开窗口
const open = () => {
  visible.value = true
}
// 关闭窗口
const close = () => {
  visible.value = false
}
const items = [
  { img: loadImg('ggjf@2x.png'), title: '广告甲方', desc: '我是广告甲方，寻CPS、CPA、CPC等合作', type: 1 },
  { img: loadImg('ggjf@2x.png'), title: '流量乙方', desc: '我是流量乙方，自有渠道，寻广告甲方', type: 2 },
  { img: loadImg('ggjf@2x.png'), title: '优质货源', desc: '我有优质货源，寻销售渠道合作', type: 3 },
  { img: loadImg('ggjf@2x.png'), title: '销售渠道', desc: '我有销售渠道，寻优质货源', type: 4 },
  { img: loadImg('ggjf@2x.png'), title: '广告甲方', desc: '我是广告甲方，寻CPS、CPA、CPC等合作', type: 5 },
  { img: loadImg('ggjf@2x.png'), title: '广告甲方', desc: '我是广告甲方，寻CPS、CPA、CPC等合作', type: 6 },
  { img: loadImg('ggjf@2x.png'), title: '广告甲方', desc: '我是广告甲方，寻CPS、CPA、CPC等合作', type: 7 },
  { img: loadImg('ggjf@2x.png'), title: '广告甲方', desc: '我是广告甲方，寻CPS、CPA、CPC等合作', type: 8 },
  { img: loadImg('ggjf@2x.png'), title: '广告甲方', desc: '我是广告甲方，寻CPS、CPA、CPC等合作', type: 9 },
  { img: loadImg('ggjf@2x.png'), title: '广告甲方', desc: '我是广告甲方，寻CPS、CPA、CPC等合作', type: 10 },
  { img: loadImg('ggjf@2x.png'), title: '广告甲方', desc: '我是广告甲方，寻CPS、CPA、CPC等合作', type: 11 },
  { img: loadImg('ggjf@2x.png'), title: '广告甲方', desc: '我是广告甲方，寻CPS、CPA、CPC等合作', type: 12 },
  { img: loadImg('ggjf@2x.png'), title: '广告甲方', desc: '我是广告甲方，寻CPS、CPA、CPC等合作', type: 13 },
  { img: loadImg('ggjf@2x.png'), title: '广告甲方', desc: '我是广告甲方，寻CPS、CPA、CPC等合作', type: 14 },
]
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
  padding: 32px 12px 21px 14px;
  border: 1px solid #E7E7E7;
  border-radius: 3px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 16px rgba(14, 116, 255, 0.41);
    border-color: #7CC4FF;
  }

  .img {
    width: 40px;
    height: 40px;
    margin-right: 14px;
  }

  .label {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #1A1A1A;
    margin-bottom: 8px;
  }

  .desc {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #858585;
  }
}

.center {
  width: 802px;
  margin: 0 auto;
}
</style>