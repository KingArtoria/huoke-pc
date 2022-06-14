<template>
  <div class="p-34 bg-white fs-16">
    <p class="fs-18 mb-28">修改密码</p>
    <div class="page">
      <div class="tip flex items-center">安全提醒：请妥善保管密码，工作人员不会以任何理由索取您的密码</div>
      <div class="mt-40 pr-30 pl-10">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="86px" label-position="right">
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入手机号" maxlength="11" />
          </el-form-item>
          <el-form-item label="验证码:" prop="code">
            <div class="flex w-full">
              <el-input v-model="formData.code" placeholder="请输入验证码" maxlength="6" class="flex-1" />
              <Sms :phone="formData.phone" type="uppass" text="获取" />
            </div>
          </el-form-item>
          <el-form-item label="新密码:" prop="pass">
            <el-input v-model="formData.pass" type="password" placeholder="请输入新密码" maxlength="12" />
          </el-form-item>
          <el-form-item label="确认密码:" prop="againpass">
            <el-input v-model="formData.againpass" type="password" placeholder="请输入确认密码" maxlength="12" />
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
import { forgetPassApi } from '@/utils/api'
import { validPhone } from '@/utils/index'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import Sms from '@/views/login/components/Sms.vue';

const router = useRouter()
const formData = ref({
  phone: '', // 手机号
  pass: '', // 密码
  againpass: '', // 确认密码
  code: '', // 验证码
})
const rules = {
  phone: validPhone('手机号'),
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  pass: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (!/^[0-9a-zA-Z_]{6,12}$/.test(value)) {
          callback(new Error('密码只能由6-12位的数字、字母、下划线组成'))
        } else {
          callback()
        }
      }, trigger: 'blur'
    }
  ],
  againpass: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (formData.value.pass !== value) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      }, trigger: 'blur'
    }
  ],
}
const formRef = ref()
let loading = false
const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    loading = true
    forgetPassApi(formData.value).then(res => {
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