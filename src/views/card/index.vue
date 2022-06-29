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
        <img :src="loadImg('nianka.png')" alt="" class="cursor-pointer" @click="nav('/buy')">
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
          <div v-for="item in templates" class="card flex items-center justify-center"
            :class="{ horizontal: item.style === 'horizontal' }">
            <img :src="loadImg(item.preview)" alt="" class="preview-img">
            <div v-if="item.value !== activeTemplate.value" class="mask app-flex-center">
              <button class="change-btn" @click="activeTemplate = item">立即更换</button>
            </div>
          </div>
        </div>
        <!-- 图片 -->
        <div v-if="activeToolbar === 'img'">
          <div class="grid grid-cols-2 gap-x-4 gap-y-10 px-10 py-20">
            <div v-for="item in uploadImgs" class="img-wrap flex items-center justify-center">
              <img :src="item.src" alt="">
              <div :style="{ display: isShowSelect ? 'flex' : 'none' }" class="mask app-flex-center">
                <button class="change-btn" @click="setActiveImg(item)">替换</button>
              </div>
            </div>
            <div v-if="uploadImgs.length > 0" class="img-wrap flex items-center justify-center" @click="doUpload">
              <el-icon class="add-icon">
                <Plus />
              </el-icon>
            </div>
          </div>
          <div v-if="uploadImgs.length === 0" class="empty flex flex-col items-center pt-50">
            <img :src="loadImg('kong.png')" alt="" class="empty-img">
            <button class="empty-btn mt-10" @click="doUpload">上传图片</button>
          </div>
        </div>
        <input type="file" ref="fileRef" accept="image/*" class="hidden" />
        <!-- 我的 -->
        <div v-if="activeToolbar === 'user'">
          <div class="grid grid-cols-2 gap-x-4 gap-y-10 px-10 py-20">
            <div v-for="item in userCards" class="user-card flex items-center justify-center"
              :class="{ active: item.id === activeCard.id }" @click="activeCard = item">
              <img :src="item.url" alt="" class="preview-img">
            </div>
          </div>
          <Empty v-if="userCards.length === 0" />
        </div>
      </div>
      <div class="workspace flex-1 relative h-full">
        <div v-if="activeToolbar === 'template' || activeToolbar === 'img'" class="pt-80">
          <component ref="templateRef" :is="activeTemplate.component" :src="materialImgs" @change="chooseImg">
          </component>
        </div>
        <div v-if="activeToolbar === 'user'">
          <div class="pt-80 flex justify-center">
            <img :src="activeCard.url" alt="" />
          </div>
        </div>
      </div>
      <div class="side bg-white h-full">
        <div class="pt-50 px-30">
          <div v-if="activeCard.id" class="flex justify-center mb-30">
            <button v-if="activeToolbar === 'user'" class="del-btn" @click="delUserCard">删除</button>
          </div>
          <p class="fs-12 color-7D7D7D line-height-22">*依据国家相关法律法规，禁止上传包含色情、违法、侵权等性质内容，违规内容将会删除处理。</p>
          <p class="primary fs-13 mt-26 line-height-22">普通用户有3次制作名片模板机会，
            会员用户不限制作名片模板。</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue';
import Nav from '@/components/Nav.vue';
import { useRouter } from 'vue-router';
import { loadImg, once } from '@/utils';
import Template1 from './components/Template1.vue';
import Template2 from './components/Template2.vue';
import Template3 from './components/Template3.vue';
import Template4 from './components/Template4.vue';
import Template5 from './components/Template5.vue';
import Template6 from './components/Template6.vue';
import Template7 from './components/Template7.vue';
import Template8 from './components/Template8.vue';
import { createVisitingcardAPI, delVistingcardAPI, myVisitingcardAPI } from '@/utils/api';
import { ElMessage, ElMessageBox } from 'element-plus';
import Empty from '@/components/Empty.vue';

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
  { value: 1, component: Template1, preview: 'heng4.png', style: 'horizontal' },
  { value: 2, component: Template2, preview: 'heng2.png', style: 'horizontal' },
  { value: 3, component: Template3, preview: 'heng3.png', style: 'horizontal' },
  { value: 4, component: Template4, preview: 'heng1.png', style: 'horizontal' },
  { value: 5, component: Template5, preview: 'shu2.png', style: 'vertical' },
  { value: 6, component: Template6, preview: 'shu3.png', style: 'vertical' },
  { value: 7, component: Template7, preview: 'shu1.png', style: 'vertical' },
  { value: 8, component: Template8, preview: 'shu4.png', style: 'vertical' },
])
const activeTemplate = ref(templates.value[0])
const templateRef = ref()
const submit = once((done: Function) => {
  nextTick(() => {
    templateRef.value.save().then((url: string) => {
      createVisitingcardAPI({ url }).then(() => {
        ElMessage.success('保存成功')
        done()
      }).catch(() => {
        done()
      })
    })
  })
})

// 用户上传的图片素材
const uploadImgs = ref<any>([])
// 传递给模板的图片素材
const materialImgs = ref<any>()
// 标识要替换的图片在模板里是哪一个
const curMaterialIndex = ref(0)
// 是否在左侧用户上传的图片素材区显示替换按钮
const isShowSelect = ref(false)
// 模板中的图片点击了替换按钮
const chooseImg = (index: number = 0) => {
  curMaterialIndex.value = index
  activeToolbar.value = 'img'
  isShowSelect.value = true
}
const setActiveImg = (item: any) => {
  if (!materialImgs.value) {
    materialImgs.value = []
  }
  materialImgs.value[curMaterialIndex.value] = item.src
}
const fileRef = ref()
onMounted(() => {
  fileRef.value.addEventListener('change', handleFile)
})
onBeforeUnmount(() => {
  fileRef.value.removeEventListener('change', handleFile)
})
const handleFile = (e: any) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = (file: any) => {
    uploadImgs.value.push({
      file,
      src: file.target.result,
      value: new Date().getTime()
    })
  }
}
const doUpload = () => {
  fileRef.value.click()
}

// 用户名片
const userCards = ref<any>([])
const activeCard = ref<any>({})
const getUserCards = () => {
  myVisitingcardAPI().then(res => {
    userCards.value = res.data.data
    if (userCards.value.length) {
      activeCard.value = userCards.value[0]
    }
  })
}
watch(activeToolbar, () => {
  if (activeToolbar.value === 'user') {
    getUserCards()
  }
})
const delUserCard = once((done: Function) => {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: "确定",
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    delVistingcardAPI({ id: activeCard.value.id }).then(() => {
      ElMessage.success('删除成功')
      // 刷新数据
      activeCard.value = {}
      getUserCards()
      done()
    }).catch(() => {
      done()
    })
  }).catch(() => {
    done()
  })
})
const nav = (path: string) => {
  router.push(path)
}
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

    &.horizontal {
      height: 150px;
    }

    &:hover {
      .mask {
        display: flex;
      }
    }
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

.line-height-22 {
  line-height: 22px;
}

.area {
  background-repeat: no-repeat;
}

.empty {
  &-btn {
    width: 122px;
    height: 40px;
    background: #0171FB;
    border-radius: 3px;
    color: white;
  }

  &-img {
    width: 226px;
    height: 147px;
  }
}

.img-wrap {
  height: 126px;
  border: 1px solid #D9D9D9;
  border-radius: 3px;
  padding: 4px;
  position: relative;
  cursor: pointer;
}

.add-icon {
  color: #D9D9D9;
  font-size: 50px;
}

.user-card {
  height: 168px;
  border: 1px solid #D9D9D9;
  border-radius: 3px;
  cursor: pointer;
  padding: 6px;

  &.active {
    border-color: #0171FB;
  }
}

.del-btn {
  width: 190px;
  height: 60px;
  background: #FF5959;
  border-radius: 5px;
  font-size: 16px;
  color: white;
}
</style>