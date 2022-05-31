<template>
  <el-dialog v-model="visible" width="1000px" :close-on-click-modal="false" :before-close="reset">
    <template #header>
      <p class="title">意见反馈</p>
    </template>
    <div class="padding">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
        <el-form-item label="请填写反馈意见" prop="comment">
          <el-input v-model="formData.comment" type="textarea" placeholder="请详细描述您遇到的问题或意见" :rows="10" />
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-upload accept=".jpg,.png" class="uploader" action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false" :on-success="uploadSuccess">
            <img v-if="formData.img" :src="formData.img" class="img" />
            <span class="link">上传图片</span>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="padding">
        <el-button type="primary">提交</el-button>
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
  img: '', // 反馈图片
})
// 表单引用
const formRef = ref()
// 校验规则
const rules = {
  comment: [{ required: true, message: '请填写反馈意见', trigger: 'blur' }],
  img: [{ required: true, message: '请上传图片', trigger: 'change' }],
}
const { visible, loading, close } = useForm(formData, formRef)
// 打开窗口
const open = () => {
  visible.value = true
}
// 重置数据
const reset = () => {
  close()
}
// 上传成功回调
const uploadSuccess = (res: any) => {
  console.log(res);

}

defineExpose({
  open
})
</script>

<style lang="scss" scoped>
.uploader {
  width: 120px;
  height: 120px;
  border: 1px solid #C7C7C7;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .link {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    text-decoration: underline;
    color: #0070F7;
    cursor: pointer;
  }
}

.btn {
  width: 118px;
  height: 39px;
  background: #066FFF;
  border-radius: 5px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  border: 0;
  outline: 0;
}

.padding {
  padding-left: 180px;
  padding-right: 180px;
  text-align: left;
}

.title {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #696969;
  text-align: center;
}
</style>