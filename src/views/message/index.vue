 <template>
  <div class="app-page flex py-30">
    <nav class="nav">
      <div class="bg-white px-20 pt-40 pb-6 flex flex-col items-center">
        <img :src="loadImg('banner_big@2x.png')" alt="" class="w-80 h-80 app-round mx-auto">
        <p class="fs-17 m-16 mb-8">{{ userInfo.name }}</p>
        <p class="flex desc items-center justify-center mb-22">
          <span>{{ userInfo.posi }}</span>
          <span class="line"></span>
          <span>{{ userInfo.comp }}</span>
        </p>
        <button class="btn primary">发布合作</button>
        <button class="btn default">找人脉</button>
      </div>
      <!-- 好友列表 -->
      <div class="bg-white mt-14 py-20">
        <ul>
          <li v-for="item in routes" class="route" :class="{ active: item.path === route.path }"
            @click="router.push(item.path)">{{ item.text }}</li>
        </ul>
      </div>
    </nav>

    <div class="flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { loadImg } from '@/utils';
const route = useRoute()
const router = useRouter()
const routes = [
  { text: '好友列表', path: '/message/friends' },
  { text: '通知', path: '/message/inform' },
  { text: '私信', path: '/message/chat-list' },
]

const userInfo = ref({
  name: '张三',
  posi: '商务经理',
  comp: '徐州奉佛跟你说',
  img: '',
})
</script>

<style lang="scss" scoped>
.nav {
  width: 258px;
  margin-right: 24px;
  color: #1B1B1B;
}

.desc {
  color: #989898;

  .line {
    width: 1px;
    height: 10px;
    background: #c7c7c7;
    margin: 0 8px;
  }
}

.btn {
  height: 38px;
  margin-bottom: 16px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  &.primary {
    background: #1F73F1;
    color: #fff;
  }

  &.default {
    border: 1px solid #CCCCCC;
    color: #979797;
  }
}
$height: 36px;
.route {
  height: $height;
  line-height: $height;
  margin-bottom: 10px;
  position: relative;
  padding: 0 28px;
  cursor: pointer;

  &:last-of-type {
    margin-bottom: 0;
  }

  &:hover {
    color: #1F73F1;
  }

  &.active {
    background: #eaf3fd;
    color: #1F73F1;

    &::before {
      content: '';
      position: absolute;
      width: 3px;
      height: $height;
      background: #1F73F1;
      left: 0;
    }

  }
}
</style>