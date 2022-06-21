<template>
  <div ref="templateRef" class="template mx-auto">
    <div class="company absolute">
      <AutoInput class="company-name" value="公司名称" placeholder="公司名称" :print="isPrint" />
    </div>
    <div class="code absolute">
      <div class="code-temp"></div>
    </div>
    <div class="name absolute">
      <AutoInput class="user-name" value="姓名" placeholder="姓名" :print="isPrint" />
      <AutoInput class="position" value="职位" placeholder="职位" :print="isPrint" />
      <div class="flex info mt-26">
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
  background: url('@/assets/shuban_2.png') no-repeat;
  width: 355px;
  height: 632px;
  color: #010101;
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
  left: 26px;
  top: 410px;
  width: 300px;

  .user-name {
    font-size: 24px;
  }

  .position {
    font-size: 12px;
    margin-top: 4px;
  }
}

.info {
  line-height: 20px;
  font-size: 12px;
}

.company {
  top: 90px;
  left: 35px;

  .company-name {
    font-size: 13px;
    writing-mode: tb;
  }
}
</style>