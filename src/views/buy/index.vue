<template>
  <div class="app-page pt-20 pb-30">
    <!-- tabbar -->
    <div class="tabbar flex">
      <div v-for="tab in tabItems" class="tab-item app-flex-center"
        :class="[tab.value, { active: tab.value === activeTab }]" @click="activeTab = tab.value">{{ tab.label
        }}</div>
    </div>
    <!-- 普通会员 -->
    <Vip v-if="activeTab === 'normal'" :service="normalService">
      <template #tip>
        <p>1、每天<span class="color-0076FF">2次</span>查看机会，发布次数不限。</p>
        <p>2、每月<span class="color-0076FF">60次</span>添加好友机会。</p>
        <p>3、全国企业<span class="color-0076FF">免费查</span>，每天10次。</p>
        <p>4、会员专属身份标识。</p>
      </template>
    </Vip>
    <!-- 超级会员 -->
    <Vip v-if="activeTab === 'super'" :service="superService">
      <template #tip>
        <p>1、每天<span class="color-0076FF">不限</span>查看发布次数，更有会员<span class="color-0076FF">专属推荐项目渠道</span></p>
        <p>2、每天<span class="color-0076FF">不限</span>添加好友数。</p>
        <p>3、全国企业<span class="color-0076FF">免费查</span>。</p>
        <p>4、超级会员专属身份标识。</p>
        <p>5、超级会员专属道具礼包。</p>
        <p>6、超级会员专属客服资源，客服会根据您的合作需求定向查找匹配，为您提供专属合作渠道。</p>
      </template>
    </Vip>
    <!-- 企业会员 -->
    <Vip v-if="activeTab === 'enterprise'" :service="enterpriseService">
      <template #tip>
        <p>1、每天<span class="color-0076FF">10次</span>查看机会，不限发布次数，更有会员<span class="color-0076FF">专属推荐项目渠道</span></p>
        <p>2、每天<span class="color-0076FF">不限</span>添加好友数。</p>
        <p>3、全国企业<span class="color-0076FF">免费查</span>。</p>
        <p>4、企业会员专属身份标识。</p>
        <p>5、企业会员专属道具礼包。</p>
        <p>6、企业会员专属客服资源，客服会根据您的合作需求定向查找匹配，为您提供专属合作渠道。</p>
      </template>
    </Vip>
    <!-- 黑卡 -->
    <BlackCard v-if="activeTab === 'black'" />
    <!-- 道具卡 -->
    <Prop v-if="activeTab === 'props'" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Vip from './components/Vip.vue';
import { useRoute } from 'vue-router';
import BlackCard from './components/BlackCard.vue';
import Prop from './components/Prop.vue';
import { goodslistAPI } from '@/utils/api';
import { GOOD_TYPE } from '@/utils/const';

const tabItems = ref([
  { label: '普通会员', value: 'normal' },
  { label: '超级会员', value: 'super' },
  { label: '企业会员', value: 'enterprise' },
  { label: '黑卡', value: 'black' },
  { label: '道具卡', value: 'props' },
])
const activeTab = ref('normal')

// 根据路由参数设置默认展示的页面
const route = useRoute()
const tab = route.query.tab as string
if (tab && tabItems.value.map(v => v.value).includes(tab)) {
  activeTab.value = tab
}

// 普通会员套餐
const normalService = ref<any>([
  { duration: '3个月', price: 298, prop: '每月送道具卡(置顶卡*1、变色卡*1)', tag: '超值优惠', id: 26 },
  { duration: '12个月', price: 998, prop: '每月送道具卡(置顶卡*1、变色卡*1)', tag: '超值优惠', id: 27 },
])
// 超级会员套餐 
const superService = ref<any>([
  { duration: '12个月', price: 1998, prop: '每月送道具卡(置顶卡*1、变色卡*1、超级置顶卡*1)', tag: '本站力推', id: 28 },
])
// 企业会员套餐
const enterpriseService = ref<any>([
  { duration: '12个月', price: 3998, prop: '每月送道具卡(置顶卡*1、变色卡*1、超级置顶卡*1)', tag: '企业专享', id: 29 },
])

goodslistAPI({
  type: GOOD_TYPE.HY
}).then(res => {
  const data = res.data.data
  [normalService.value, superService.value, enterpriseService.value].forEach((element: any) => {
    element.forEach((v: any) => {
      v.price = parseInt(data.find((val: any) => val.id === v.id).price)
    })
  });
})
</script>

<style lang="scss" scoped>
.tab-item {
  width: 170px;
  height: 45px;
  font-size: 16px;
  color: #333;
  background-color: white;
  border-radius: 5px 5px 0px 0px;
  margin-right: 10px;
  cursor: pointer;

  &.active {
    background: #0172FF;
    box-shadow: 0px 6px 21px 0px rgba(164, 164, 164, 0.13);
    color: #fff;

    &.black {
      background: #2A2A2A;
      box-shadow: 0px 6px 21px 0px rgba(164, 164, 164, 0.13);
      color: #F5DDAB;
    }
  }
}
</style>