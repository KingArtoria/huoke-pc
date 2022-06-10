<template>
  <div class="bg-white">
    <div class="pt-24 px-10 flex items-center justify-between">
      <p class="title">好友共 <span class="color-0078FF">{{ friends.length }}</span> 人</p>
      <div class="flex justify-center">
        <el-input v-model="searchText" placeholder="查找好友" />
        <button class="search-btn" @click="doSearch">搜索</button>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-10 px-10 mt-40">
      <div v-for="item in friends" class="item">
        <div class="flex">
          <img :src="loadImg('banner_big@2x.png')" alt="" class="w-50 h-50 app-round mr-22">
          <div class="flex-1">
            <p class="color-303030 mb-10">{{ item.name }}</p>
            <p class="color-6A6A6A fs-12 mb-6">{{ item.posi }}</p>
            <p class="color-6A6A6A fs-12">{{ item.comp }}</p>
          </div>
        </div>
        <div class="bottom flex justify-between items-center mt-30">
          <span class="color-56689B">{{ item.count }}条合作信息</span>
          <el-popover placement="bottom" :width="78" trigger="hover">
            <template #reference>
              <span class="color-0078FF flex items-center cursor-pointer">
                <span class="mr-8">管理</span>
                <el-icon>
                  <CaretBottom />
                </el-icon>
              </span>
            </template>
            <ul>
              <li class="action-item">备注</li>
              <li class="action-item">删除</li>
            </ul>
          </el-popover>
        </div>
        <button class="btn">发信息</button>
      </div>
    </div>
    <!-- 分页 -->
    <footer class="footer flex justify-center pt-80 pb-60">
      <el-pagination :current-page="pageIndex" :total="total" background layout="total, prev, pager, next, jumper"
        @current-change="changePage" />
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { loadImg } from '@/utils';
import VipIcon from '@/components/VipIcon.vue';
const friends = ref([
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
  { name: '张三', posi: '经理', comp: '徐州恭送发送大附件', count: 3 },
])
const pageIndex = ref(0)
const total = ref(0)
// 翻页
const changePage = (index: number) => {
  pageIndex.value = index
}
// 查询关键词
const searchText = ref('')
const doSearch = () => {

}
</script>

<style lang="scss" scoped>
.item {
  padding: 16px 10px 10px 10px;
  border: 1px solid #D5D5D5;
  position: relative;

  .bottom {
    height: 24px;
    background: #F7F7F7;
    padding: 0 10px;
  }

  .right-item {
    width: 47px;
    height: 31px;
    background: #F6F6F6;
    border-radius: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      background: #e9e9e9;
    }
  }

  .btn {
    position: absolute;
    width: 67px;
    height: 25px;
    border: 1px solid #0078FF;
    border-radius: 13px;
    color: #0078FF;
    top: 20px;
    right: 10px;
  }
}

.search-btn {
  width: 84px;
  height: 29px;
  background: #1F73F1;
  border: 1px solid #1F73F1;
  border-radius: 5px;
  color: #fff;
  margin-left: 12px;
}

.title {
  font-size: 16px;
  color: #AFAFAF;
  position: relative;
  padding-left: 6px;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 15px;
    background: #1F73F1;
    left: 0;
  }
}

.color-0078FF {
  color: #0078FF;
}

.color-303030 {
  color: #303030;
}

.color-6A6A6A {
  color: #6A6A6A;
}

.color-56689B {
  color: #56689B;
}

.action-item {
  height: 36px;
  line-height: 36px;
  padding: 0 14px;
  color: #6A6A6A;
  border-bottom: 1px solid #F1F1F1;

  &:last-of-type {
    border-bottom: 0;
  }

  &:hover {
    background: #eff5fe;
    color: #2074F1;
  }

}
</style>