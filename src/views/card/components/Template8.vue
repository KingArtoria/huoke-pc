<template>
  <div ref="templateRef" class="template mx-auto">
    <div class="company absolute">
      <AutoInput class="company-name" value="公司名称" placeholder="公司名称" :print="isPrint" />
    </div>
    <AutoInput class="position absolute" value="职位" placeholder="职位" :print="isPrint" />
    <div class="name absolute">
      <AutoInput class="user-name" value="姓名" placeholder="姓名" :print="isPrint" />
      <div class="ml-30">
        <div class="flex info mt-20">
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
  background: url('@/assets/shuban-4.png') no-repeat;
  width: 355px;
  height: 632px;
  color: #fff;
  position: relative;
}

.logo {
  top: 88px;
  left: 98px;
}

.name {
  left: 33px;
  top: 453px;
  width: 300px;

  .user-name {
    font-size: 24px;
  }

}

.position {
  top: 505px;
  left: 33px;
  font-size: 12px;
  width: 16px;
  z-index: 1;
}

.info {
  line-height: 20px;
  font-size: 12px;
  color: #D7CBBF;
}

.company {
  top: 413px;
  left: 30px;

  .company-name {
    font-size: 14px;
  }
}
</style>