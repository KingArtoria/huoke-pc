<template>
  <div ref="templateRef" class="template mx-auto">
    <div class="company absolute">
      <AutoInput class="company-name" value="公司名称" placeholder="公司名称" :print="isPrint" />
    </div>
    <div class="code absolute">
      <div class="code-temp"></div>
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

  </div>
  <img :src="img" alt="">
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AutoInput from './AutoInput.vue';
import { loadImg } from '@/utils';
import useTemplate from '../composables/useTemplate'

const templateRef = ref()
const img = ref('')
const { isPrint, save } = useTemplate(templateRef)

defineExpose({
  save
})
</script>

<style lang="scss" scoped>
.template {
  background: url('@/assets/shuban3.png') no-repeat;
  width: 355px;
  height: 632px;
  color: #fff;
  position: relative;
}

.logo {
  top: 88px;
  left: 98px;
}

.code {
  top: 35px;
  right: 24px;

  .code-temp {
    width: 67px;
    height: 68px;
    border: 1px solid red;
  }
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
  writing-mode: tb;
  z-index: 1;
}

.info {
  line-height: 20px;
  font-size: 12px;
}

.company {
  top: 185px;
  left: 50%;
  transform: translateX(-50%);

  .company-name {
    font-size: 14px;
  }
}
</style>