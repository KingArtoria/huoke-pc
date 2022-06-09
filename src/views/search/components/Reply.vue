<template>
  <el-dialog title="回复" v-model="visible" width="800px" :close-on-click-modal="false" :before-close="close">
    <textarea v-model="comment" placeholder="请输入回复内容" class="comment-input" />
    <div class="flex justify-end mt-12">
      <button class="btn primary" @click="sendReply">发表</button>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const call = defineEmits(['update'])

const visible = ref(false)
// 回复的内容
const comment = ref('')
// 回复的评论id
let replyId
const open = (id: number) => {
  replyId = id
  visible.value = true
}
const close = () => {
  visible.value = false
}
// 发表回复
let loading = false
const sendReply = () => {
  if (loading) return
  if (comment.value.trim().length === 0) return ElMessage.info('请输入回复内容')
  visible.value = false
  call('update')
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
</style>