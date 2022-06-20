<template>
  <div>
    <div class="content ml-24">
      <div class="content_1">
        <div class="content_1_1">
          <img src="../../assets/fanhui_lt@2x.png" class="content_1_1_1">
          <div class="content_1_1_2">
            <div class="content_1_1_2_1">
              <div class="content_1_1_2_1_1">我是名字</div>
              <img src="../../assets/svip2.png" class="content_1_1_2_1_2">
            </div>
            <div class="content_1_1_2_2">我是一个网络科技有限公司</div>
          </div>
          <img src="../../assets/jubao_red@2x.png" class="content_1_1_3">
        </div>
      </div>
      <div class="content_2">
        <div class="content_2_1">私信列表</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GoEasy2 from 'goeasy';
import { onMounted } from 'vue';
import GoEasy from '@/utils/goEasy'
import { getUser } from '@/utils';
const goEasy = GoEasy.getGoEasy()
const im = goEasy.im
const userInfo = getUser()
onMounted(() => {
  goEasy.connect({
    id: userInfo.member_id,
    data: { "avatar": `https://admin.bdhuoke.com${userInfo.head}`, "nickname": userInfo.nick_name },
    onSuccess: () => {
      im.latestConversations({
        onSuccess: (latestConversationsRes: any) => {
          console.log(latestConversationsRes, '22')
          let onConversationsUpdated = function (conversations: any) {
            console.log(conversations, '123123')
          }
          im.on(GoEasy2.IM_EVENT.CONVERSATIONS_UPDATED, onConversationsUpdated);
        }
      })
    }
  })
})
</script>

<style lang="scss" scoped>
@import './fniends_info.scss';
</style>