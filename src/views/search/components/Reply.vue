<template>
  <el-dialog title="回复" v-model="visible" width="800px" :close-on-click-modal="false" :before-close="close">
    <div class="comment-wrap">
      <div>
        <textarea v-model="comment" placeholder="会员用户可以自定义回复文案，普通用户仅限于使用快捷回复。切记禁止留联系方式，违规将被禁言！" class="comment-input"
          :disabled="!isVip" />
        <div class="flex justify-end mt-12">
          <button class="btn primary" @click="sendReply">回复</button>
        </div>
        <p class="mt-12 mb-26 fs-16">快捷回复</p>
        <div class="flex option-wrap">
          <div v-for="item in replyOptions" :key="item.id" class="option" @click="setComment(item)">{{ item.content
          }}</div>
        </div>
      </div>
    </div>

  </el-dialog>
</template>
<script setup lang="ts">
import { setCommentsAPI } from '@/utils/api';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const props = defineProps<{
  projectData: any, // 项目详情
  isVip: boolean, // 是否VIP
  replyOptions: any[], /// 快捷回复
}>()
const call = defineEmits(['update'])

const visible = ref(false)

// 回复的评论id
let params: any = {}
const open = (payload: any) => {
  params = payload
  visible.value = true
}
const close = () => {
  visible.value = false
}

// 回复的内容
const comment = ref('')
let selectedOptionId: any = null
const setComment = (item: any) => {
  selectedOptionId = item.id
  comment.value = item.content
}
// 发表回复
let replyLoading = false
const sendReply = () => {
  if (replyLoading) return
  if (comment.value.trim() === '') {
    return ElMessage.info('请输入回复内容')
  }
  replyLoading = true
  setCommentsAPI({
    art_m_id: props.projectData.member_id, // 发布人id
    article_id: props.projectData.id, // 项目id
    pid: params.pid, // 评论父级id（默认0） 
    immobilization_id: selectedOptionId, // 评论内容id
    c_id: params.c_id,
    content: comment.value, // 评论内容
    re_member: params.re_member, // 回复的人（评论默认为0）
  }).then(() => {
    replyLoading = false
    ElMessage.success('回复成功')
    selectedOptionId = null
    comment.value = ''
    visible.value = false
    call('update')
  }).catch(() => {
    replyLoading = false
  })
}
defineExpose({
  open
})
</script>

<style lang="scss" scoped>
.comment-input {
  height: 78px;
  background: #F4F4F4;
  border: 1px solid #E2E2E2;
  border-radius: 5px;
  padding: 12px 10px;
  display: block;
  width: 100%;
  outline: none;
}

.btn {
  border-radius: 16px;
  width: 88px;
  height: 31px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  &.primary {
    background: #0372F7;
    color: white;
  }
}

.comment-wrap {
  .btn {
    border-radius: 16px;
    width: 88px;
    height: 31px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    &.primary {
      background: #0372F7;
      color: white;
    }

    &.info {
      border: 1px solid #CECECE;
      color: #868686;

      &:hover {
        background: #F3F3F3;
      }
    }
  }

  .comment-input {
    height: 78px;
    background: #F4F4F4;
    border: 1px solid #E2E2E2;
    border-radius: 5px;
    padding: 12px 10px;
    display: block;
    width: 100%;
    outline: none;
  }

  .option-wrap {
    flex-wrap: wrap;

    .option {
      padding: 10px 26px;
      border: 1px solid #CECECE;
      border-radius: 18px;
      margin: 0 20px 14px 0;
      color: #868686;
      cursor: pointer;

      &:hover {
        background: #EBEEF2;
      }
    }
  }

  .hr-line {
    height: 1px;
    background: #F3F3F3;
  }

}
</style>