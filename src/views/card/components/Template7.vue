<template>
  <div ref="templateRef" class="template mx-auto">

    <div class="name absolute">
      <AutoInput class="user-name" value="姓名" placeholder="姓名" :print="isPrint" />
      <AutoInput class="position absolute" value="职位" placeholder="职位" :print="isPrint" />
    </div>
    <div class="info-wrap">
      <div class="flex info">
        <span class="flex-shrink-0">电话：</span>
        <AutoInput value="电话" placeholder="电话" :print="isPrint" />
      </div>
      <div class="flex info">
        <span class="flex-shrink-0">地址：</span>
        <AutoInput value="地址" placeholder="地址" :print="isPrint" />
      </div>
      <div class="flex info">
        <span class="flex-shrink-0">邮箱：</span>
        <AutoInput value="@email.com" placeholder="邮箱" :print="isPrint" />
      </div>
      <div class="flex info">
        <span class="flex-shrink-0">业务：</span>
        <AutoInput value="业务" placeholder="业务" :print="isPrint" />
      </div>
    </div>
    <div class="company absolute">
      <AutoInput value="公司名称" placeholder="公司名称" :print="isPrint" />
    </div>
    <CodeImg width="68px" height="68px" top="35px" left="264px" :src="src[0] || img1" :is-print="isPrint"
      @change="callImg(0)" />
  </div>
  <img :src="img" alt="">
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AutoInput from './AutoInput.vue';
import { loadImg } from '@/utils';
import useTemplate from '../composables/useTemplate'
import CodeImg from './CodeImg.vue';

withDefaults(defineProps<{
  src: any, // 图片地址
}>(), {
  src: []
})
const call = defineEmits(['change'])
const callImg = (index: number) => {
  call('change', index)
}
const img1 = loadImg('code.png')
const templateRef = ref()
const img = ref('')
const { isPrint, save } = useTemplate(templateRef)

defineExpose({
  save
})
</script>

<style lang="scss" scoped>
.template {
  background: url('@/assets/shubna-1.png') no-repeat;
  width: 355px;
  height: 632px;
  color: #076E59;
  position: relative;
}

.logo {
  top: 193px;
  left: 50%;
  transform: translateX(-50%);
}

.name {
  margin: 0 auto;
  top: 245px;
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);

  .user-name {
    font-size: 28px;
    color: #9E1A00;
  }

}

.position {
  font-size: 15px;
  z-index: 1;
  color: #000;
  margin-top: 20px;
}

.info {
  line-height: 24px;
  font-size: 14px;
}

.info-wrap {
  position: absolute;
  left: 82px;
  top: 329px;
  width: 180px;
}

.company {
  top: 571px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #9E1A00;
}
</style>