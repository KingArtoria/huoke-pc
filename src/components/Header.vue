<template>
  <div class="header">
    <!-- banner -->
    <div class="banner center cursor-pointer" @click="nav('/buy')">
      <img :src="bannerImg" alt="" class="banner-img">
    </div>
    <!-- 搜索 -->
    <div class="search center">
      <div class="logo">
        <img :src="loadImg('huoke.webp')" alt="" class="logo-img cursor-pointer" @click="navToIndex">
      </div>
      <div class="search-wrap">
        <div class="input-wrap">
          <div class="select" @mouseover="searchTypeVisible = true" @mouseleave="searchTypeVisible = false">
            <div class="trigger">
              <span>{{ searchType }}</span>
              <el-icon class="icon">
                <ArrowDown />
              </el-icon>
            </div>
            <div v-show="searchTypeVisible" class="select-area">
              <div v-for="item in typeOptions.filter(v => !v.isSelect)" class="option" @click="setSearchType(item)">{{
                  item.label
              }}</div>
            </div>
          </div>
          <input v-model="keyword" type="text" class="input" placeholder="输入关键词进行搜索" @keyup.enter="doSearch">
          <div class="search-btn app-flex-center" @click="doSearch">搜索</div>
        </div>
        <div class="grid auto-cols-max grid-flow-col links">
          <a v-for="item in keywordLink" href="javascript:;" class="link" @click="handleLink(item)">{{ item }}</a>
        </div>
      </div>
      <div class="text app-flex-center">或</div>
      <div class="btn app-flex-center" @click="openPublish">免费发布合作信息</div>
    </div>
  </div>
  <!-- 发布合作信息 -->
  <Publish ref="publishRef" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import bannerImg from '@/assets/dingbbanner@2x.webp'
import { useRouter } from 'vue-router';
import Publish from './Publish.vue';
import { loadImg } from '@/utils';

const router = useRouter()
// 搜索类型
const searchType = ref('找项目')
const typeOptions = ref([
  { label: '找项目', value: '/search', isSelect: true },
  { label: '找人脉', value: '/contacts-list', isSelect: false },
])
const searchTypeVisible = ref(false)
// 关键词
const keyword = ref('')
// 快捷搜索关键词
const keywordLink = ['加粉', '地推', '拉新', '淘口令', '阅读激励量', 'PC-阅读量', '快应用']
const handleLink = (text: string) => {
  keyword.value = text
  doSearch()
}
const setSearchType = (item: any) => {
  searchTypeVisible.value = false
  typeOptions.value.forEach(v => v.isSelect = false)
  item.isSelect = true
  searchType.value = item.label
}
// 搜索
const doSearch = () => {
  const select = typeOptions.value.find((v: any) => v.isSelect)
  router.push({
    path: select ? select.value : '/search',
    query: {
      keyword: keyword.value
    }
  })
}
// 发布合作信息
const publishRef = ref()
const openPublish = () => {
  publishRef.value.open()
}

// 跳转到首页
const navToIndex = () => {
  router.push({
    path: '/'
  })
}
// 跳转到购买会员页面
const nav = (path: string) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>
.header {
  background-color: white;
  padding-bottom: 32px;
}

.center {
  width: 1382px;
  margin: 0 auto;
}

.banner {
  padding: 10px 0;

  .banner-img {
    width: 100%;
    height: 70px;
  }
}

.search {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;

  .btn {
    width: 229px;
    height: 44px;
    background: #FF6F0F;
    border-radius: 0px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;

    &:hover {
      background: #ff8e42;
    }
  }
}

.search-wrap {
  flex: 1;
  margin-left: 70px;

  .input-wrap {
    display: flex;
    justify-content: space-between;
    height: 44px;
    border: 2px solid #0071FA;
  }

  .input {
    flex: 1;
    padding: 14px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 400;
    border: 0;
    outline: 0;

    &::placeholder {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #9D9D9D;
    }
  }

  .search-btn {
    width: 98px;
    height: 100%;
    background: #0071FA;
    border-radius: 0px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;

    &:hover {
      background: #0e7aff;
    }
  }

  .links {
    column-gap: 32px;
    margin-top: 6px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #9D9D9D;

    .link {
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.text {
  height: 44px;
  width: 86px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 300;
  color: #0071FA;
}

.select {
  position: relative;
  width: 90px;
  background-color: white;
  color: #0071FA;
  line-height: 40px;
  text-align: center;

  .trigger {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    border-right: 1px solid #CFCFCF;
  }

  .icon {
    margin-left: 7px;
    font-size: 13px;
    color: #0071FA;
  }

  .select-area {
    position: absolute;
    width: 94px;
    background: white;
    z-index: 2;
    left: -2px;
    border-bottom: 2px solid #0071FA;
  }

  .option {
    height: 40px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #959595;
    text-align: center;
    border-left: 2px solid #0071FA;
    border-right: 2px solid #0071FA;
    cursor: pointer;

    &:hover {
      color: #0071FA;
      background: #EDF0F2;
    }
  }
}
</style>
