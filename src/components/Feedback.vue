<template>
  <el-dialog v-model="modelValue" width="1000px" :close-on-click-modal="false" :before-close="close">
    <template #header>
      <p class="title">意见反馈</p>
    </template>
    <div class="padding">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
        <el-form-item label="请填写反馈意见" prop="title">
          <el-input v-model="formData.title" type="textarea" placeholder="请详细描述您遇到的问题或意见" :rows="8" />
        </el-form-item>
        <el-form-item label="请输入您的联系电话" prop="phone">
          <el-input v-model="formData.phone" type="number" style="width: 300px;" />
        </el-form-item>
        <el-form-item label="图片" prop="pic">
          <el-upload accept=".jpg,.webp,.png,.jpeg,.bmp" class="uploader"
            action="http://nad.bdhuoke.com/web_v1/member/upload" :show-file-list="false" :on-success="uploadSuccess">
            <img v-if="formData.pic" :src="formData.pic" class="img" />
            <div v-else class="flex items-center flex-col">
              <img :src="loadImg('tupian@2x.webp')" alt="" class="w-30 h-30">
              <span class="link">上传图片</span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="mt-40">
        <button class="btn" @click="submit">提交</button>
      </div>
    </div>

  </el-dialog>
</template>
  <script setup lang="ts">
import { ref } from 'vue';
import { loadImg, validPhone } from '@/utils/index'
import { feedbackAPI } from '@/utils/api'
import { ElMessage } from 'element-plus';
import { API_DOMAIN } from '@/utils/const';

defineProps<{
  modelValue: boolean,
}>()
const call = defineEmits(['update:modelValue'])
// 关闭窗口
const close = () => {
  call('update:modelValue', false)
}
// 表单数据
const formData = ref({
  title: '', // 反馈意见
  pic: '', // 反馈图片
  phone: '', // 联系方式
})
// 表单引用
const formRef = ref()
// 校验规则
const rules = {
  title: [{ required: true, message: '请填写反馈意见', trigger: 'blur' }],
  phone: validPhone('联系电话'),
  pic: [{ required: true, message: '请上传图片', trigger: 'change' }],
}
let loading = false
const submit = () => {
  if (loading) return
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    loading = true
    feedbackAPI(formData.value).then(() => {
      ElMessage.success('提交成功！感谢您的反馈')
      close()
    }).catch(() => {
      loading = false
    })
  })
}
// 上传成功回调
const uploadSuccess = (res: any) => {
  formData.value.pic = API_DOMAIN + res.data
}

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