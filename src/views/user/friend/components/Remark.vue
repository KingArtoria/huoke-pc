<template>
  <el-dialog v-model="visible" width="500px" title="好友备注" :close-on-click-modal="false" :before-close="reset">
    <div class="padding">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
        <p class="tip">为当前好友写一句话备注，便于自己识别</p>
        <el-form-item prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注" :rows="3" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="padding">
        <!-- <el-button type="primary" @click="submit">提交</el-button> -->
        <button class="btn" @click="submit">提交</button>
      </div>
    </template>
  </el-dialog>
</template>
  <script setup lang="ts">
import { ref } from 'vue';
import useForm from '@/composables/useForm';
import { setRemarkAPI } from '@/utils/api';
import { ElMessage } from 'element-plus';
const call = defineEmits(['update'])
// 表单数据
const formData = ref({
  toid: 0, // 好友id
  remark: '', // 备注
})
// 表单引用
const formRef = ref()
const { visible, loading, close } = useForm(formData, formRef)
// 校验规则
const rules = {
  remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
}
const submit = () => {
  if (loading.value) return
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    loading.value = true
    setRemarkAPI(formData.value).then(() => {
      ElMessage.success('设置成功')
      loading.value = false
      call('update')
      close()
    }).catch(() => {
      loading.value = false
    })
  })
}
// 打开窗口
const open = (id: number) => {
  formData.value.toid = id
  visible.value = true
  loading.value = false
}
const reset = () => [
  close()
]
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
  color: #fff;
}
</style>