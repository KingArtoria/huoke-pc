<template>
  <div>
    <div class="content">
      <div class="content_1">当前位置：首页 > 资料详情 > {{ userInfo.nick_name }}</div>
      <div class="content_2">
        <div class="content_2_1">
          <div class="content_2_1_1">
            <img class="content_2_1_1_1" :src="userInfo.head">
            <div class="content_2_1_1_2">
              <div class="content_2_1_1_2_1">
                <div class="content_2_1_1_2_1_1">{{ userInfo.nick_name }}</div>
                <div class="content_2_1_1_2_1_2">未实名认证</div>
                <img :src="loadImg('puthy.webp')" v-if="userInfo.is_vip == 1">
              </div>
              <div class="content_2_1_1_2_2">
                <span>{{ userInfo.position }}</span>
                <span v-if="userInfo.position" class="line"></span>
                <span>{{ userInfo.company }}</span>
              </div>
              <div v-if="userInfo.school" class="content_2_1_1_2_2">毕业院校：{{ userInfo.school }}</div>
            </div>
          </div>
          <div class="flex">
            <div v-if="userInfo.is_friend === 0" class="content_2_1_2 cursor-pointer"
              @click="addFriend({ member_id: id })">+添加好友</div>
            <div v-if="userInfo.is_friend === 0" class="btn info ml-22 cursor-pointer"
              @click="nav(`/message/chat?userId=${id}`)">发消息
            </div>
          </div>
        </div>
        <div class="content_2_2">
          <div class="content_2_2_1">联系方式：</div>
          <div class="content_2_2_2">手机号：{{ userInfo.phone }}</div>
          <div class="content_2_2_2">微信号：{{ userInfo.wechat_name }}</div>
        </div>
      </div>
      <div class="content_3">
        <div class="content_3_1">
          <div class="content_3_1_1">
            <div class="content_3_1_1_1" />
            <div class="content_3_1_1_2">合作信息</div>
          </div>
        </div>
        <div class="px-50">
          <div v-for="item in projectList" :key="item.id" class="content_3_2">
            <div class="content_3_2_1" @click="nav(`/detail/${item.id}`)">
              <div class="content_3_2_1_1">{{ item.title }}</div>
              <div class="content_3_2_1_2">广告甲方</div>
              <div class="content_3_2_1_3">{{ item.addtime }}</div>
            </div>
          </div>
        </div>
        <Empty v-if="projectList.length === 0" />
      </div>
      <div class="content_3 pb-40">
        <div class="content_3_1">
          <div class="content_3_1_1">
            <div class="content_3_1_1_1" />
            <div class="content_3_1_1_2">更多资料</div>
          </div>
        </div>
        <div class="grid grid-cols-3 profile gap-y-30 px-80">
          <div>
            <span class="mr-10">所在行业：</span>
            <span>{{ userInfo.industry_one }}</span>
          </div>
          <div>
            <span class="mr-10">公司：</span>
            <span>{{ userInfo.company }}</span>
          </div>
          <div>
            <span class="mr-10">职位：</span>
            <span>{{ userInfo.position }}</span>
          </div>
          <div>
            <span class="mr-10">毕业院校：</span>
            <span>{{ userInfo.school }}</span>
          </div>
        </div>
      </div>
      <div class="content_3 gray">
        <div class="content_3_1">
          <div class="content_3_1_1">
            <div class="content_3_1_1_1" />
            <div class="content_3_1_1_2">可能认识</div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-20">
          <networkVue v-for="(item, index) in recommend" :key="index" :item="item" @addFriendapply="addFriend" />
        </div>
      </div>
      <div class="pt-40 pb-30 footer">
        <img :src="loadImg('banner_di.webp')" alt="" @click="nav('/buy')">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getFriendHomeAPI, friend_projectAPI, getRecommendList, addFriendapplyAPI } from '@/utils/api'
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { loadImg, once, headPrefix } from '@/utils';
import networkVue from "@/components/Network.vue";
import { ElMessage } from 'element-plus';
import Empty from '@/components/Empty.vue';

const route = useRoute()
const id = ref()

const router = useRouter()
const nav = (path: string) => {
  router.push(path)
}

// 用户信息
const userInfo = ref<any>({})
// 合作信息
const projectList = ref<any[]>([])
// 推荐用户
const recommend = ref<any[]>([])

const getData = () => {
  id.value = route.params.id
  getFriendHomeAPI({ toid: id.value }).then(res => {
    res.data.data.head = headPrefix(res.data.data.head)
    userInfo.value = res.data.data
  })
  friend_projectAPI({ id: id.value, type: 0 }).then(res => {
    projectList.value = res.data.data
  })
  getRecommendList({}).then(res => {
    // 只显示状态为未添加，且最多只展示9条数据
    recommend.value = res.data.data.filter((v: any) => !v.is_add).slice(0, 9)
  })
}
getData()

// 添加好友
const addFriend = once((done: Function, payload?: any) => {
  addFriendapplyAPI({ toid: payload.member_id }).then((res) => {
    done()
    ElMessage.success(res.data.msg)
  }).catch(() => {
    done()
  })
})

watch(() => route.path, () => {
  if (route.path.startsWith('/contacts-others')) {
    getData()
  }
})
</script>

<style lang="scss" scoped>
@import './others.scss';
</style>