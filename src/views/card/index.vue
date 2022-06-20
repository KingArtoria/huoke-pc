<template>
  <div class="page flex flex-col">
    <Nav>
      <template #title>
        <span class="link primary" @click="navToHome">返回首页</span>
      </template>
    </Nav>
    <header class="bg-white flex justify-between header">
      <div class="flex-1 flex justify-between py-10">
        <div class="flex ml-30 items-center">
          <img :src="loadImg('huoke.png')" class="logo-img" alt="">
          <span class="dot ml-10 mr-6"></span>
          <span class="primary fs-20">商务名片</span>
        </div>
        <img :src="loadImg('nianka.png')" alt="">
      </div>
      <div class="btn-wrap flex justify-end">
        <button class="btn" @click="submit">保存并下载</button>
      </div>
    </header>
    <section class="flex flex-1">
      <div class="toolbar bg-white h-full">
        <div v-for="item in toolbar" class="flex flex-col items-center mt-30 cursor-pointer"
          @click="switchToolbar(item)">
          <img :src="loadImg(item.value === activeToolbar ? item.activeIcon : item.icon)" alt="">
          <span class="mt-12" :class="item.value === activeToolbar ? 'primary' : 'color-595959'">{{ item.text }}</span>
        </div>
      </div>
      <div class="menu bg-white h-full">
        <!-- 模板 -->
        <div v-if="activeToolbar === 'template'" class="grid grid-cols-2 gap-x-4 gap-y-10 px-10 py-20">
          <div v-for="item in templates" class="card flex items-center">
            <img :src="loadImg(item.preview)" alt="" class="preview-img">
            <div class="mask app-flex-center">
              <button class="change-btn">立即更换</button>
            </div>
          </div>
        </div>
        <!-- 图片 -->

        <!-- 我的 -->
      </div>
      <div class="workspace flex-1 relative h-full">
        <div v-if="activeToolbar === 'template'">
          <component ref="templateRef" :is="activeTemplate.component" class="mt-80 mx-auto"></component>
        </div>
      </div>
      <div class="side bg-white h-full">
        <div v-if="activeToolbar === 'template'" class="pt-50 px-30">
          <p class="fs-12 color-7D7D7D line-height-22">*依据国家相关法律法规，禁止上传包含色情、违法、侵权等性质内容，违规内容将会删除处理。</p>
          <p class="primary fs-13 mt-26 line-height-22">普通用户有3次制作名片模板机会，
            会员用户不限制作名片模板。</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Nav from '@/components/Nav.vue';
import { useRouter } from 'vue-router';
import { loadImg, once } from '@/utils';
import Template1 from './components/Template1.vue';

const router = useRouter()
const navToHome = () => {
  router.push('/')
}
const toolbar = ref([
  { text: '模板', value: 'template', icon: 'muban-l.png', activeIcon: 'muban.png' },
  { text: '图片', value: 'img', icon: 'tupian.png', activeIcon: 'tupianl.png' },
  { text: '我的', value: 'user', icon: 'shangchuan.png', activeIcon: 'shangchuan-l.png' },
])
const activeToolbar = ref('template')
const switchToolbar = (item: any) => {
  activeToolbar.value = item.value
}

// 模板
const templates = ref([
  // { value: 1, material: 'mingpian-2.png', preview: 'heng4.png', visible: false, width: '990px', height: '627px' },
  // { value: 2, material: 'mingpian-3.png', preview: 'heng2.png', visible: false, },
  { value: 1, component: Template1, preview: 'heng4.png' },
  { value: 2, component: Template1, preview: 'heng2.png' },
])
const activeTemplate = ref(templates.value[0])
const changeVisible = (item: any) => {
  if (item.value !== activeTemplate.value.value) {
    item.visible = true
  }
}
const templateRef = ref()
const submit = once((done: Function) => {
  templateRef.value.save().then(() => {
    done()
  })
})
</script>

<style lang="scss" scoped>
.primary {
  color: var(--primary);
}

.color-595959 {
  color: #595959;
}

.color-7D7D7D {
  color: #7D7D7D;
}

.link {
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.logo-img {
  width: 130px;
  height: 30px;
}

.dot {
  width: 5px;
  height: 5px;
  background: #0071FA;
  border-radius: 50%;
}

.page {
  min-width: var(--main-width);
  height: 100vh;
}

.btn-wrap {
  width: 270px;

  .btn {
    display: block;
    width: 190px;
    height: 100%;
    background: #0171FB;
    color: white;
    font-size: 16px;
  }
}

.header {
  border-bottom: 1px solid #F1F1F1;
}

.toolbar {
  width: 86px;
  border-right: 1px solid #F1F1F1;
}

.menu,
.side {
  width: 270px;
}

.menu {
  .card {
    height: 200px;
    border: 1px solid #D9D9D9;
    border-radius: 3px;
    padding: 10px 0;
    position: relative;
    cursor: pointer;

    &:hover {
      .mask {
        display: flex;
      }
    }

    .preview-img {
      max-height: 100%;
      max-width: 100%;
    }

    .mask {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.2);
    }

    .change-btn {
      width: 80px;
      height: 30px;
      background: #0171FB;
      border-radius: 3px;
      color: white;
    }
  }
}

.line-height-22 {
  line-height: 22px;
}

.area {
  background-repeat: no-repeat;
}
</style>