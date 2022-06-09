<template>
  <div class="app-page">

    <div v-if="keyword" class="tip">
      结果：招到"<span class="light">{{ keyword }}</span>"相关内容{{ total }}个
    </div>
    <!-- 搜索条件 -->
    <div class="search-wrap">
      <img src="" alt="" class="banner-img">
      <div class="grid">
        <!-- 一级分类 -->
        <div class="flex">
          <div class="flex-shrink-0 type-title">
            <span>项目分类：</span>
          </div>
          <div class="flex flex-wrap flex-1">
            <div v-for="item in primaryTypes" class="item" :class="{ active: params.type === item.value }"
              @click="params.type = item.value">{{ item.label }}</div>
          </div>
        </div>
        <!-- 次级分类（一级分类下可能会有多个次级分类） -->
        <div class="flex" v-for="(second, index) in secondTypes">
          <div class="flex-shrink-0 type-title">
            <span>{{ second.name }}：</span>
          </div>
          <div class="flex flex-wrap flex-1">
            <div v-for="item in second.items" class="item"
              :class="{ active: params['search' + (index + 1)] === item.id }"
              @click="params['search' + (index + 1)] = item.id">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div>
        <!-- 列表 -->
        <div class="list-wrap">
          <!-- 列表数据 -->
          <ListItem v-for="item in listData" :item="item" />
          <Empty v-if="listData.length === 0" />
        </div>

        <!-- 分页 -->
        <footer v-if="listData.length > 0" class="footer flex justify-center">
          <el-pagination :current-page="params.page" :total="total" background layout="total, prev, pager, next, jumper"
            @current-change="changePage" />
        </footer>
      </div>
      <!-- 侧边栏 -->
      <aside>
        <!-- 今日热门 -->
        <div class="top">
          <div class="top-header">今日推荐</div>
          <div class="top-content">
            <div v-for="item in todayHot" class="top-item">
              <p class="title">
                {{ item.title }}
              </p>
              <p class="flex desc">
                <span class="truncate">{{ item.nick_name }}</span>
                <span v-if="item.position" class="line"></span>
                <span class="truncate">{{ item.position }}</span>
                <span v-if="item.company" class="line"></span>
                <span class="truncate">{{ item.company }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 下载app -->
        <Download class="download" />
      </aside>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { searchApi, getHot } from '@/utils/api'
import ListItem from '@/components/ListItem.vue'
import Download from '@/components/Download.vue';
import { COOPERATION_TYPES } from '@/utils/const'
import Empty from '@/components/Empty.vue';

const route = useRoute()
// 搜索关键词
const keyword = ref('')
// 一级分类
const primaryTypes: ILV[] = [
  { label: '全部', value: 0 },
].concat(COOPERATION_TYPES)
// 二级分类（可能有多个）
const secondTypes = ref<any>([])
// 搜索条件
const params = ref<any>({
  title: '', // 关键词
  type: '', // 项目分类
  search1: '',
  search2: '',
  search3: '',
  page: 1, // 当前页数
})
// 列表数据
const listData = ref([])
// 总数据条数
const total = ref(0)
// 翻页
const changePage = (pageIndex: number) => {
  params.value.page = pageIndex
}
// 搜索
const doSearch = () => {
  searchApi(params.value).then(res => {
    listData.value = res.data.data.list
    total.value = res.data.data.num
    const search = res.data.data.search
    secondTypes.value = []
    if (search) {
      Object.keys(search).forEach((key: string) => {
        // @ts-ignore
        secondTypes.value.push({ name: key, items: [{ name: '全部', id: '' }].concat(search[key]) })
      })
    }
  })
}
// 监听参数变化，执行搜索
watch(params, () => {
  doSearch()
}, { deep: true })

// 监听地址栏的搜索关键词改变，重新执行查询
watch(() => route.query, () => {
  init()
})
// doSearch()
// 初始化数据
const init = () => {
  keyword.value = route.query.keyword as string || ''
  params.value = {
    title: keyword.value, // 关键词
    type: 0, // 项目分类
    search1: '',
    search2: '',
    search3: '',
    page: 1, // 当前页数
  }
  secondTypes.value = []
  doSearch()
}
init()

// 今日热门
const todayHot = ref<any>([])
getHot().then(res => {
  todayHot.value = (res.data.data || []).slice(0, 2)
})
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 1064px 305px;
  column-gap: 12px;
}

.tip {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #202020;
  padding: 20px 11px;
  background-color: white;
  margin-top: 10px;

  .light {
    color: #0171FB;
  }
}

.search-wrap {
  background: white;
  margin-top: 12px;
  margin-bottom: 30px;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #1E1E1E;

  .grid {
    column-gap: 33px;
    padding: 30px 20px 20px;
  }

  .active {
    background: #016BFF;
    border-radius: 3px;
    color: #FFFFFF;
  }

  .item {
    padding: 5px 10px;
    margin: 0 0 10px 20px;
    cursor: pointer;
  }
}

.top {
  border-radius: 5px;
  overflow: hidden;

  .top-header {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1B1B1B;
    border-bottom: 1px solid #F6F6F6;
    height: 50px;
    line-height: 50px;
    padding-left: 14px;
    position: relative;
    background: white;

    &::before {
      content: '';
      position: absolute;
      width: 3px;
      height: 24px;
      background: #0071FA;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .top-content {
    padding: 0 14px;
    background: white;
  }

  .desc {
    width: 277px;
  }

  .top-item {
    border-bottom: 1px solid rgba(234, 234, 234, 0.32);
    cursor: pointer;
    padding: 20px 0;

    &:last-of-type {
      border-bottom: 0;
    }
  }

  .top-item:hover {

    .line {
      background: #0071FA;
    }

    .title,
    .flex {
      color: #0071FA;
    }

    .title {
      text-decoration: underline;
    }
  }

  .title {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #303030;
    margin-bottom: 16px;
    line-height: 18px;
  }

  .flex {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #B7B7B7;
  }

  .line {
    width: 1px;
    height: 14px;
    background: #B7B7B7;
    margin: 0 9px;
  }
}

.download {
  margin-top: 13px;
}

.footer {
  padding: 22px 0px;
  background-color: white;
  margin: 25px 0 27px;
}

.type-title {
  padding-top: 5px;
}
</style>