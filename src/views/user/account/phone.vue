<template>
  <div class="p-34 bg-white fs-16">
    <p class="fs-18 mb-28">修改手机号</p>
    <div class="page">
      <div class="mt-40 pr-30 pl-10">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="86px" label-position="right">
          <el-form-item label="原手机号:" prop="phone1">
            <el-input v-model="formData.phone1" placeholder="请输入手机号" maxlength="11" />
          </el-form-item>
          <el-form-item label="验证码:" prop="code1">
            <div class="flex w-full">
              <el-input v-model="formData.code1" placeholder="请输入验证码" maxlength="6" class="flex-1" />
              <Sms :phone="formData.phone1" type="changephone" text="获取" />
            </div>
          </el-form-item>
          <el-form-item label="新手机号:" prop="phone2">
            <el-input v-model="formData.phone2" placeholder="请输入手机号" maxlength="11" />
          </el-form-item>
          <el-form-item label="验证码:" prop="code2">
            <div class="flex w-full">
              <el-input v-model="formData.code2" placeholder="请输入验证码" maxlength="6" class="flex-1" />
              <Sms :phone="formData.phone2" type="changephone" text="获取" />
            </div>
          </el-form-item>
        </el-form>
        <div class="btn-wrap">
          <button class="btn" @click="submit">确认修改</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { changephoneAPI } from '@/utils/api'
import { validPhone } from '@/utils/index'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import Sms from '@/views/login/components/Sms.vue';

const router = useRouter()
const formData = ref({
  phone1: '', // 原手机号
  code1: '', // 原手机验证码
  phone2: '', // 新手机号
  code2: '', // 新手机验证码
})
const rules = {
  phone1: validPhone('原手机号'),
  code1: [{ required: true, message: '请输入原手机验证码', trigger: 'blur' }],
  phone2: validPhone('新手机号'),
  code2: [{ required: true, message: '请输入新手机验证码', trigger: 'blur' }],
}
const formRef = ref()
let loading = false
const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    loading = true
    changephoneAPI(formData.value).then(res => {
      loading = false
      ElMessage.success('修改成功')
      router.back()
    })
  })
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

.page {
  width: 550px;
}

.btn-wrap {
  margin: 20px 0 0 86px;

  .btn {
    width: 100%;
    // width: 200px;
    height: 40px;
    background: #0A7BF5;
    border-radius: 4px;
    // margin: 20px 0 0 86px;
    color: #fff;
  }
}

::v-deep(.sms-text) {
  width: 118px;
  height: 40px;
  background: #006FF8;
  border-radius: 2px;
  color: #fff;
  margin-left: 20px;
  position: relative;
  right: initial;
  top: initial;
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    color: #fff;
  }
}
</style>