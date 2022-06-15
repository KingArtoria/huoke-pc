 <template>
  <div class="app-page flex py-30">
    <nav class="nav">
      <template v-for="item in routes">
        <div v-if="item.children" class="wrap flex flex-col">
          <p class="parent" :class="{ active: isActive(item.children) }">{{ item.text }}</p>
          <router-link v-for="child in item.children" :to="pathPrefix + child.path" class="child">{{ child.text }}
          </router-link>
        </div>
        <router-link v-else :to="pathPrefix + item.path" class="route">{{ item.text }}</router-link>
      </template>
    </nav>

    <div class="flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const pathPrefix = ref('')
pathPrefix.value = '/user/'
const currentPath = ref('')
const routes = [
  { text: '个人中心', path: 'profile' },
  { text: '我的发布', path: 'project' },
  { text: '我的收藏', path: 'favorite' },
  { text: '担保记录', path: 'guarantee' },
  { text: '我的好友', path: 'friend' },
  {
    text: '人脉管理', children: [
      { text: '待处理请求', path: '3' },
      { text: '已发出请求', path: '4' },
    ]
  },
  { text: '我的钱包', path: 'profile' },
  { text: '积分商城', path: 'profile' },
  { text: '我的道具', path: 'item' },
  { text: '会员特权', path: 'vip' },
  {
    text: '账号管理', children: [
      { text: '修改手机号', path: 'phone' },
      { text: '修改密码', path: 'password' },
    ]
  },
]

watch(() => route.path, (path: string) => {
  currentPath.value = path.substring(path.lastIndexOf('/') + 1)
}, { immediate: true })
const isActive = (children: any[]) => {
  return children.some(v => v.path === currentPath.value)
}
</script>

<style lang="scss" scoped>
.nav {
  width: 209px;
  border-radius: 5px;
  margin-right: 10px;
  height: 914px;
  background: #FFFFFF;
  padding: 35px;
  font-size: 16px;
  color: #1B1B1B;
  display: flex;
  flex-direction: column;
}

.route {
  margin-top: 30px;

  &:first-of-type {
    margin-top: 0;
  }

  &.router-link-active {
    color: #0173FD;
  }
}

.parent {
  margin-top: 30px;
  margin-bottom: 16px;

}

.wrap {
  .child:last-of-type {
    margin-bottom: 0;
  }
}

.route,
.parent {
  position: relative;

  &.router-link-active,
  &.active {
    &::before {
      content: '';
      position: absolute;
      width: 3px;
      height: 16px;
      background: #0073F9;
      margin-left: -10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.child {
  font-size: 14px;
  color: #7E7E7E;
  margin-bottom: 20px;
  margin-left: 3px;

  &.router-link-active {
    color: #0173FD;
  }
}
</style>