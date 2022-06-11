 <template>
  <div class="bg-white py-20 px-36">
    <!-- tabbar -->
    <div class="tabbar flex">
      <div v-for="tab in tabItems" class="tab-item app-flex-center"
        :class="[tab.value, { active: tab.value === activeTab }]" @click="setActiveTab(tab.value)">{{ tab.label
        }}</div>
    </div>

    <!-- 我的道具 -->
    <Owner v-if="activeTab === 'owner'" />
    <!-- 兑换记录 -->
    <Record v-if="activeTab === 'record'" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Owner from './components/Owner.vue';
import Record from './components/Record.vue';
const router = useRouter()

const tabItems = ref([
  { label: '我的道具', value: 'owner' },
  { label: '道具商城', value: 'shop' },
  { label: '兑换记录', value: 'record' },
])
const activeTab = ref('owner')
const setActiveTab = (tab: string) => {
  if (tab === 'shop') {
    router.push({
      path: '/buy',
      query: {
        tab: 'props'
      }
    })
    return
  }
  activeTab.value = tab
}

// 根据路由参数设置默认展示的页面
const route = useRoute()
const tab = route.query.tab as string
if (tab && tabItems.value.map(v => v.value).includes(tab)) {
  activeTab.value = tab
}

</script>

<style lang="scss" scoped>
.tabbar {
  background: #FCFCFC;
  border: 1px solid #F3F3F3;
  height: 49px;
}

.tab-item {
  width: 170px;
  height: 45px;
  font-size: 16px;
  color: #666;
  width: 183px;
  cursor: pointer;

  &.active,
  &:hover {
    color: #0172FF;
    background: white;
    border-top: 2px solid #0D86FF;
  }
}
</style>