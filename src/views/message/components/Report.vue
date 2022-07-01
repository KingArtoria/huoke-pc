<template>
  <el-dialog v-model="visible" width="1000px" :close-on-click-modal="false" :before-close="close">
    <template #header>
      <p class="title">投诉</p>
    </template>
    <div class="padding">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
        <el-form-item label="请选择投诉该账号的原因" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio v-for="item in reportReason" :label="item"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="请输入问题描述" prop="content">
          <el-input v-model="formData.content" type="textarea" :rows="3" />
        </el-form-item>

        <el-form-item label="请提供相关问题的截图或图片" prop="img">
          <el-upload accept=".jpg,.webp,.webp,.jpeg,.bmp" class="uploader"
            action="http://nad.bdhuoke.com/web_v1/member/upload" :show-file-list="false" :on-success="uploadSuccess">
            <div v-if="formData.img" class="img-wrap">
              <img :src="formData.img" class="img">
            </div>
            <div v-else class="flex items-center flex-col">
              <img :src="loadImg('tupian@2x.webp')" alt="" class="w-30 h-30">
              <span class="link">上传图片</span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="formData.phone" type="number" style="width: 300px;" />
        </el-form-item>
      </el-form>
      <div class="mt-40">
        <button class="btn" @click="submit">提交</button>
      </div>
    </div>

  </el-dialog>
</template>
  <script setup lang="ts">
import { onBeforeUnmount, onUnmounted, ref } from 'vue';
import { loadImg, validPhone } from '@/utils/index'
import { reportSetAPI } from '@/utils/api'
import { ElMessage } from 'element-plus';
import { API_DOMAIN } from '@/utils/const';

const props = defineProps<{
  modelValue: boolean,
  userId: number, // 被举报用户的id
}>()
const call = defineEmits(['update:modelValue'])
// 关闭窗口
const close = () => {
  visible.value = false
  // 延时销毁组件，给窗口关闭过渡效果给时间
  setTimeout(() => {
    call('update:modelValue', false)
  }, 1000);
}
// 投诉原因
const reportReason = [
  '发布不适当内容对我造成骚扰',
  '存在欺诈骗钱行为',
  '发布仿冒品信息',
  '冒充他人',
  '其他问题'
]
const visible = ref(true)
// 表单数据
const formData = ref({
  type: '', // 投诉类型
  tomember_id: props.userId, // 投诉账户
  content: '', // 问题描述
  img: '', // 图片
  phone: '', // 联系电话
})
// 表单引用
const formRef = ref()
// 校验规则
const rules = {
  type: [{ required: true, message: '请选择投诉类型', trigger: 'change' }],
  content: [{ required: true, message: '请输入问题描述', trigger: 'blur' }],
  phone: validPhone('联系电话', false),
  img: [{ required: true, message: '请上传图片', trigger: 'change' }],
}
let loading = false
const submit = () => {
  if (loading) return
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    loading = true
    reportSetAPI(formData.value).then(() => {
      ElMessage.success('已收到您的投诉，我们会尽快处理')
      close()
    }).catch(() => {
      loading = false
    })
  })
}
// 上传成功回调
const uploadSuccess = (res: any) => {
  formData.value.img = API_DOMAIN + res.data
}
onBeforeUnmount(() => {
  console.log(formData);

})
onUnmounted(() => {
  console.log(formData);
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

  .img-wrap {
    width: 120px;
    height: 120px;
    border-radius: 2px;
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