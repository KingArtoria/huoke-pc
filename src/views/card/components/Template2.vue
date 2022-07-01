<template>
  <div ref="templateRef" class="template mx-auto">
    <div class="name absolute">
      <AutoInput class="user-name" value="姓名" placeholder="姓名" :print="isPrint" />
      <AutoInput class="position" value="职位" placeholder="职位" :print="isPrint" />
    </div>
    <div class="line absolute"></div>
    <div class="info absolute">
      <div class="flex">
        <span class="flex-shrink-0">电话：</span>
        <AutoInput value="电话" placeholder="电话" :print="isPrint" />
      </div>
      <div class="flex">
        <span class="flex-shrink-0">邮箱：</span>
        <AutoInput value="@email.com" placeholder="邮箱" :print="isPrint" />
      </div>
      <div class="flex">
        <span class="flex-shrink-0">地址：</span>
        <AutoInput value="地址" placeholder="地址" :print="isPrint" />
      </div>
      <div class="flex">
        <span class="flex-shrink-0">业务：</span>
        <AutoInput value="业务" placeholder="业务" :print="isPrint" />
      </div>
    </div>
    <CodeImg width="113px" height="113px" top="48px" left="823px" :src="src[0] || img1" :is-print="isPrint"
      @change="callImg(0)" />
    <CodeImg top="89px" left="98px" :src="src[1] || img2" :is-print="isPrint" @change="callImg(1)" />
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
const img1 = loadImg('code.webp')
const img2 = loadImg('logo1.webp')
const templateRef = ref()
const { isPrint, save, img } = useTemplate(templateRef)

defineExpose({
  save
})
</script>

<style lang="scss" scoped>
.template {
  background: url('@/assets/mingpian-3.webp') no-repeat;
  width: 990px;
  height: 627px;
  color: #F4F4F4;
  position: relative;
}

.logo {
  top: 88px;
  left: 98px;
}

.code {
  top: 48px;
  right: 54px;

  .code-temp {
    width: 113px;
    height: 116px;
    border: 1px solid red;
  }
}

.name {
  left: 125px;
  top: 447px;

  .user-name {
    font-size: 51px;
    color: #F4F4F4;
  }

  .position {
    font-size: 29px;
    margin-top: 30px;
  }
}

.line {
  width: 2px;
  height: 174px;
  background: linear-gradient(0deg, #FFFFFF 0%, #FFFFFF 100%);
  left: 397px;
  top: 417px;
}

.info {
  top: 346px;
  left: 479px;
  font-size: 21px;
  color: white;
  line-height: 40px;
  width: 450px;
}
</style>