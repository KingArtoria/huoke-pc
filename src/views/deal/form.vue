<template>
  <div class="app-page pb-30">
    <nav class="py-20">当前位置：首页 > 需求发布 >发布合作信息</nav>
    <div class="flex">
      <div class="bg-white py-30 flex-1 mr-14">
        <p class="title mb-30">平台交易</p>
        <div class="content">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="86px" label-position="right">
            <el-form-item label="交易对象">
              <div class="select">
                <div v-if="!formData.to_id" class="flex flex-col items-center pt-20" @click="userVisible = true">
                  <el-icon class="plus-icon">
                    <Plus />
                  </el-icon>
                  <span class="mt-10">选择交易对象</span>
                </div>
                <div v-else class="flex">
                  <img src="" alt="">
                  <div>
                    <p class="flex">
                      <span>{{ user.head }}</span>
                      <img src="" alt="">
                    </p>
                    <p>
                      <span>{{ user.comp }}</span>
                      <span>-</span>
                      <span>{{ user.posi }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="合作内容">
              <el-input v-model="formData.details" placeholder="请输入合作内容" maxlength="150" />
            </el-form-item>
            <el-form-item label="对方要求">
              <el-input v-model="formData.details" placeholder="请输入对方要求" maxlength="150" />
            </el-form-item>
            <el-form-item label="结算条件">
              <el-input v-model="formData.details" placeholder="请输入结算条件" maxlength="150" />
            </el-form-item>
            <el-form-item label="其他补充">
              <el-input v-model="formData.details" placeholder="请输入其他补充" maxlength="150" />
            </el-form-item>
            <el-form-item label="担保金额">
              <el-input v-model="formData.details" placeholder="请输入担保金额" type="number" />
            </el-form-item>
          </el-form>
          <div class="tip-wrap">
            <p class="tip">注：担保金不可以作为业务结算资金进行支付</p>
            <div>
              <el-checkbox>
                <span>我已阅读并同意</span>
                <span class="link">《BD火客付费会员协议》</span>
              </el-checkbox>
            </div>
            <button class="btn" @click="submit">立即支付</button>
          </div>
        </div>

      </div>
      <aside class="aside">
        <Download class="download" />
      </aside>
    </div>
  </div>
  <User v-model="userVisible" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import User from './components/User.vue';
import Download from '@/components/Download.vue';

const formData = ref({
  to_id: '', // 交易对象
  price: '', // 价格
  details: '', // 
})
const rules = {
  head: [{ required: true, message: '请上传头像', trigger: 'change' }],
  nick_name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  real_name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
  school: [{ required: true, message: '请选择学校', trigger: 'change' }],
  industry_one: [{ required: true, message: '请选择一级行业', trigger: 'change' }],
  province: [{ required: true, message: '请选择省份', trigger: 'change' }],
  company: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  // phone: validPhone('手机号'),
}
const formRef = ref()
let loading = false
const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    if (!formData.value.city) return ElMessage.error('请选择城市')
    if (!formData.value.industry_tow) return ElMessage.error('请选择二级行业')
    loading = true
    memberInfoEditAPI(formData.value).then(res => {
      loading = false
      if (res.data.code !== 1) return ElMessage.error(res.data.msg)
      ElMessage.success('修改成功')
      router.back()
    })
  })
}

// 交易对象
const user = ref({
  head: '',
  name: '',
  comp: '',
  posi: ''
})
const userVisible = ref(false)
</script>

<style lang="scss" scoped>
.select {
  width: 375px;
  height: 99px;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  color: #8D8D8D;
  cursor: pointer;

  &:hover {
    border-color: #8DBBFF;
  }

  .h-full {
    height: 99px;
  }

  .plus-icon {
    font-size: 22px;
  }
}

.content {
  padding-right: 128px;
  padding-left: 50px;
}

.title {
  font-size: 18px;
  position: relative;
  padding-left: 22px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 4px;
    height: 19px;
    background: #257FFB;
    top: 50%;
    transform: translateY(-50%);
  }
}

.tip-wrap {
  margin-left: 86px;

  .tip {
    color: #FF0000;
    margin-bottom: 20px;
  }

  .link {
    color: #0A7BF5;
  }

  .btn {
    width: 160px;
    height: 40px;
    background: #0A7BF5;
    border-radius: 4px;
    color: white;
    margin-top: 20px;
  }
}
</style>