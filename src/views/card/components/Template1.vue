<template>
  <div ref="templateRef" class="template">
    <div class="top flex">
      <div class="top-left flex flex-col justify-center">
        <AutoInput class="fs-25 company" value="公司名称" placeholder="公司名称" :print="isPrint" />
        <AutoInput class="fs-13 company-en" value="company english name" placeholder="company english name"
          :print="isPrint" />
      </div>
      <div class="top-right flex items-center">
        <div class="flex items-end">
          <AutoInput class="name color-C3995D" value="姓名" placeholder="姓名" :print="isPrint" />
          <AutoInput class="fs-20 ml-20 color-C3995D" value="职位" placeholder="职位" :print="isPrint" />
        </div>
      </div>
    </div>
    <div class="bottom">
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
import html2canvs from 'html2canvas'

const templateRef = ref()
const img = ref('')
const isPrint = ref(false)

const save = () => {
  return new Promise((resolve => {
    isPrint.value = true
    html2canvs(templateRef.value).then(canvas => {
      img.value = canvas.toDataURL('image/jpg')
      canvas.toBlob((blob: any) => {
        const file = new File([blob], '名片.jpg', { type: 'image/jpg' })
        const formData = new FormData()
        formData.append('pic', file)
        resolve()
      })
    })
  }))
}

defineExpose({
  save
})
</script>

<style lang="scss" scoped>
.template {
  background: url('@/assets/mingpian-2.png') no-repeat;
  width: 990px;
  height: 627px;
  color: #D8AD78;
  position: relative;
}

.color-C3995D {
  color: #C3995D;
}

.top {
  padding: 80px 10px 0 75px;
  height: 170px;

  .company-en {
    margin-top: 20px;
  }

  .name {
    font-size: 37px;
  }

  .top-left {
    width: 50%;
    padding-right: 40px;
  }

  .top-right {
    width: 50%;
    padding-left: 70px;
  }
}

.bottom {
  position: absolute;
  // margin: 178px 270px 0 111px;
  top: 348px;
  right: 270px;
  left: 111px;
  font-size: 19px;
  color: #D2A671;
  line-height: 34px;
}
</style>