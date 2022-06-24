<template>
  <div ref="templateRef" class="template mx-auto">
    <div class="company absolute">
      <AutoInput class="company-name" value="公司名称" placeholder="公司名称" :print="isPrint" />
    </div>
    <div class="code absolute">
      <div class="code-temp"></div>
    </div>
    <div class="name absolute flex items-end">
      <AutoInput class="user-name" value="姓名" placeholder="姓名" :print="isPrint" />
      <AutoInput class="position" value="职位" placeholder="职位" :print="isPrint" />
    </div>
    <div class="flex info info-1">
      <span class="flex-shrink-0">电话：</span>
      <AutoInput value="电话" placeholder="电话" :print="isPrint" />
    </div>
    <div class="flex info info-3">
      <span class="flex-shrink-0">地址：</span>
      <AutoInput value="地址" placeholder="地址" :print="isPrint" />
    </div>
    <div class="flex info info-2">
      <span class="flex-shrink-0">邮箱：</span>
      <AutoInput value="@email.com" placeholder="邮箱" :print="isPrint" />
    </div>
    <div class="flex info info-4">
      <span class="flex-shrink-0">业务：</span>
      <AutoInput value="业务" placeholder="业务" :print="isPrint" />
    </div>
    <CodeImg width="113px" height="113px" top="73px" left="832px" :src="src[0] || img1" :is-print="isPrint"
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
  background: url('@/assets/mingpian-1.png') no-repeat;
  width: 990px;
  height: 627px;
  color: #2C2A2B;
  position: relative;
}

.logo {
  top: 88px;
  left: 98px;
}

.name {
  left: 36px;
  top: 266px;

  .user-name {
    font-size: 37px;
  }

  .position {
    font-size: 22px;
    margin-left: 40px;
  }
}

.info {
  font-size: 24px;
  color: white;
  line-height: 45px;
  position: absolute;

  &-1 {
    left: 81px;
    top: 366px;
  }

  &-2 {
    left: 494px;
    top: 366px;
  }

  &-3 {
    left: 80px;
    top: 433px;

  }

  &-4 {
    left: 494px;
    top: 433px;
  }
}

.company {
  top: 90px;
  left: 37px;

  .company-name {
    font-size: 66px;
  }
}
</style>