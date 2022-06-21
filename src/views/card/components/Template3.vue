<template>
  <div ref="templateRef" class="template mx-auto">
    <div class="company absolute">
      <AutoInput class="company-name" value="公司名称" placeholder="公司名称" :print="isPrint" />
      <AutoInput class="company-en" value="company english name" placeholder="company english name" :print="isPrint" />
    </div>
    <div class="code absolute">
      <div class="code-temp"></div>
    </div>
    <div class="name absolute flex items-end">
      <AutoInput class="user-name" value="姓名" placeholder="姓名" :print="isPrint" />
      <AutoInput class="position" value="职位" placeholder="职位" :print="isPrint" />
    </div>
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
  background: url('@/assets/mingpian1-2.png') no-repeat;
  width: 990px;
  height: 627px;
  color: #000000;
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
  left: 55px;
  top: 279px;

  .user-name {
    font-size: 51px;
  }

  .position {
    font-size: 29px;
    margin-left: 30px;
  }
}

.info {
  top: 371px;
  left: 58px;
  font-size: 21px;
  line-height: 34px;
  width: 450px;
}

.company {
  top: 66px;
  left: 56px;

  .company-name {
    font-size: 38px;
  }

  .company-en {
    font-size: 20px;
    margin-top: 12px;
  }
}
</style>