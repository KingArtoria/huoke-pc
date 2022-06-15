<template>
  <el-dialog v-model="visible" width="500px" title="好友备注" :close-on-click-modal="false" :before-close="close">
    <div class="padding">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
        <p class="tip">为当前好友写一句话备注，便于自己识别</p>
        <el-form-item prop="comment">
          <el-input v-model="formData.comment" type="textarea" placeholder="请输入备注" :rows="3" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="padding">
        <!-- <el-button type="primary" @click="submit">提交</el-button> -->
        <button @click="submit">提交</button>
      </div>
    </template>
  </el-dialog>
</template>
  <script setup lang="ts">
import { ref } from 'vue';
import useForm from '@/composables/useForm';

// 表单数据
const formData = ref({
  comment: '', // 反馈意见
})
// 表单引用
const formRef = ref()
const { visible, loading, close } = useForm(formData, formRef)
// 校验规则
const rules = {
  comment: [{ required: true, message: '请输入备注', trigger: 'blur' }],
}
const submit = () => {
  if (loading.value) return
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    // 设置备注
    close()
  })
}
// 打开窗口
const open = () => {
  visible.value = true
  loading.value = false
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped>
.tip {
  color: #5C5C5C;
  margin-bottom: 10px;
}

.btn {
  width: 84px;
  height: 32px;
  background: #1F73F1;
  border: 1px solid #1F73F1;
  border-radius: 5px;
}
</style>