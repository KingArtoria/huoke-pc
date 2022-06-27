 <template>
  <div class="app-page flex py-30">
    <nav class="nav">
      <div class="bg-white px-20 pt-40 pb-6 flex flex-col items-center">
        <img :src="userInfo.head" alt="" class="w-80 h-80 app-round mx-auto">
        <p class="fs-17 m-16 mb-8">{{ userInfo.nick_name }}</p>
        <p class="flex desc items-center justify-center mb-22">
          <span>{{ userInfo.position }}</span>
          <span v-if="userInfo.position && userInfo.company" class="line"></span>
          <span>{{ userInfo.company }}</span>
        </p>
        <button class="btn primary" @click="openPublish">发布合作</button>
        <button class="btn default" @click="nav('/contacts-list')">找人脉</button>
      </div>
      <!-- 好友列表 -->
      <div class="bg-white mt-14 py-20">
        <ul>
          <li v-for="(item, index) in routes" class="route" :class="{ active: item.path === route.path }"
            @click="router.push(item.path)" :key="index">{{ item.text }}</li>
        </ul>
      </div>
    </nav>

    <div class="flex-1">
      <router-view></router-view>
    </div>
    <!-- 发布合作信息 -->
    <Publish ref="publishRef" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { loadImg } from '@/utils';
import Publish from '@/components/Publish.vue';
import { memberInfoEditAPI, userInfoAPI } from '@/utils/api';

const route = useRoute()
const router = useRouter()
const routes = [
  { text: '好友列表', path: '/message/friends' },
  { text: '通知', path: '/message/inform' },
  { text: '私信', path: '/message/chat' },
]

const userInfo = ref<any>({})
// 发布合作信息
const publishRef = ref()
const openPublish = () => {
  publishRef.value.open()
}

Promise.all([
  userInfoAPI(),
  memberInfoEditAPI({ type: 'get' })
]).then(([res1, res2]) => {
  res1.data.data.user_info.phone = res1.data.data.user_info.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
  userInfo.value = Object.assign(res2.data.data || {}, res1.data.data.user_info)
  if (!userInfo.value.head) {
    userInfo.value.head = loadImg('default.webp')
  }
})

const nav = (path: string) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>
.nav {
  width: 258px;
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