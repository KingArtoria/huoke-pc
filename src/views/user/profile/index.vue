<template>
  <div class="p-34 bg-white fs-16">
    <p class="fs-18 mb-28">个人中心</p>
    <div v-if="!userInfo.idcard" class="tip flex items-center">
      您的账号未实名认证：不能在本站进行平台交易，为了不影响你的使用体验，请及时进行实名认证。
    </div>
    <!-- 用户信息  -->
    <div class="user-info flex mt-28">
      <!-- 头像 -->
      <img :src="headImg" alt="" class="head-img mr-10">
      <div class="mt-8">
        <!-- 姓名 -->
        <div class="flex items-end">
          <span class="fs-18 font-bold">{{ userInfo.nick_name }}</span>
          <div class="div1 app-flex-center">{{ userInfo.idcard ? '已实名认证' : '未实名认证' }}</div>
          <VipIcon :item="vipLevel" />
          <img :src="loadImg(userInfo.phone ? 'shoujih_yt@2x.webp' : 'shoujhhwt@2x.webp')" alt="" class="bind-img">
          <img :src="loadImg(userInfo.wx ? 'weixinhyt@2x.webp' : 'wxh_wtx@2x.webp')" alt="" class="bind-img">
        </div>
        <p class="desc my-10 flex items-center">
          <span v-if="userInfo.position">{{ userInfo.position }}</span>
          <span v-if="userInfo.position" class="line"></span>
          <span v-if="userInfo.industry_one_name">{{ userInfo.industry_one_name }}</span>
          <span v-if="userInfo.industry_one_name" class="line"></span>
          <span v-if="userInfo.company">{{ userInfo.company }}</span>
        </p>
        <p v-if="userInfo.schoolname" class="desc">毕业院校：{{ userInfo.schoolname }}</p>
      </div>
      <div class="flex ml-auto pt-10">
        <button class="btn app-flex-center" @click="navToForm">编辑资料</button>
        <button class="btn primary app-flex-center ml-20" @click="logout">退出登录</button>
      </div>
    </div>
    <!-- 联系方式 -->
    <div class="contact flex items-center my-16">
      <span class="color-1B1B1B mr-50 ml-10">联系方式：</span>
      <div class="grid grid-cols-3 gap-x-80">
        <span class="color-818181">手机号：{{ userInfo.phone }}</span>
        <span v-if="userInfo.wechat_name" class="color-818181">微信号：{{ userInfo.wechat_name }}</span>
        <span>
          <span class="color-1B1B1B mr-30">邀请码：</span>
          <span class="color-1F73F1">{{ userInfo.Invitation_code }}</span>
        </span>
      </div>
    </div>
    <img :src="loadImg('weikaitong-grzx@2x.webp')" alt="" class="img1">
    <!-- 我的道具 -->
    <div class="tabbar flex mt-20">
      <div v-for="tab in itemTabbar" class="tab-item app-flex-center"
        :class="[tab.value, { active: tab.value === activeItemTab }]" @click="setActiveTab(tab.value)">{{ tab.label
        }}</div>
    </div>
    <Owner v-if="activeItemTab === 'owner'" class="item-wrap" />
    <!-- 我的发布 -->
    <div class="tabbar flex mt-38">
      <div v-for="tab in projectTabbar" class="tab-item app-flex-center"
        :class="[tab.value, { active: tab.value === activeProjectTab }]">{{ tab.label
        }}</div>
    </div>
    <CommonList :list="projectList" />
    <!-- 无数据 -->
    <div v-if="projectList.length === 0" class="flex flex-col items-center mt-40">
      <p class="color-757575 fs-16 text-center">您还没有发布过合作信息，快去发布吧</p>
      <button class="publish-btn mt-18" @click="doPublish">去发布</button>
    </div>
    <!-- 发布合作信息 -->
    <Publish ref="publishRef" />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { loadImg, once, getVipLevel, removeToekn } from '@/utils';
import { useRouter } from 'vue-router';
import { userInfoAPI, memberInfoEditAPI } from '@/utils/api'
import Owner from '../item/components/Owner.vue';
import CommonList from '../record/components/CommonList.vue';
import Publish from '@/components/Publish.vue';
import { ElMessageBox } from 'element-plus';
import VipIcon from '@/components/VipIcon.vue';

const router = useRouter()
// 跳转到编辑资料页面
const navToForm = () => {
  router.push({
    path: '/user/profile-form'
  })
}
// 退出登录
const logout = once((done: Function) => {
  ElMessageBox.confirm('确定退出登录吗？', '提示', {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: 'warning'
  }).then(() => {
    done()
    // 移除缓存
    removeToekn()
    router.replace({
      path: '/login'
    })
  }).catch(() => {
    done()
  })
})

// 用户信息
const userInfo = ref<any>({})
const vipLevel = ref<any>({})
Promise.all([
  userInfoAPI(),
  memberInfoEditAPI({ type: 'get' })
]).then(([res1, res2]) => {
  res1.data.data.user_info.phone = res1.data.data.user_info.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
  userInfo.value = Object.assign(res2.data.data || {}, res1.data.data.user_info)
  projectList.value = res1.data.data.user_project
  vipLevel.value = getVipLevel(res1.data.data)
})
const headImg = computed(() => {
  if (userInfo.value.head) {
    return userInfo.value.head
  } else {
    return loadImg('default.webp')
  }
})

// 我的道具
const itemTabbar = [
  { label: '我的道具', value: 'owner' },
  { label: '道具商城', value: 'shop' },
]
const activeItemTab = ref('owner')
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
  activeItemTab.value = tab
}

// 我的发布
const projectTabbar = [
  { label: '我的发布', value: 'project' },
]
const activeProjectTab = ref('project')
// 发布项目数据
const projectList = ref<any>([])
// 发布项目
const publishRef = ref()
const doPublish = () => {
  publishRef.value.open()
}
</script>

<style lang="scss" scoped>
.tip {
  height: 49px;
  background: #E5F1FF;
  border: 1px solid #6BA5E8;
  padding: 0 15px;
  color: #0076FF;
  font-size: 16px;
}

.user-info {
  .div1 {
    width: 77px;
    height: 20px;
    background: #FFFFFF;
    border: 1px solid #BFBFBF;
    border-radius: 10px;
    font-size: 12px;
    color: #8E8D8D;
    margin: 0 10px 0 15px;
  }

  .head-img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }

  .bind-img {
    width: 24px;
    height: 24px;
    margin-left: 15px;
  }

  .desc {
    color: #7E7E7E;
    font-size: 15px;
  }

  .line {
    width: 1px;
    height: 12px;
    background: #7E7E7E;
    margin: 0 8px;
  }

  .btn {
    width: 90px;
    height: 35px;
    background: #FFFFFF;
    border: 1px solid #9B9B9B;
    border-radius: 18px;
    color: #929292;
    font-size: 16px;

    &.primary {
      background: #0372F7;
      color: white;
      border-color: initial;
    }
  }
}

.contact {
  height: 43px;
  background: #F5F5F5;
}

.img1 {
  margin: 0 auto;
}

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

.item-wrap {
  background: #F5F5F5;
  padding: 20px;

  &.empty-wrap {
    padding: 100px 0;
    background: #fff;
  }
}

::v-deep(.item-wrap .item) {
  background: white;
  border: 0;
  padding: 18px 20px;

  .img-wrap {
    margin-right: 26px;
  }
}

::v-deep(.gap-x-36) {
  column-gap: 20px;
}

.color-757575 {
  color: #757575;
}

.publish-btn {
  width: 120px;
  height: 40px;
  background: #1F73F1;
  border-radius: 20px;
  color: #fff;
  font-size: 16px;
}
</style>