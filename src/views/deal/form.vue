<template>
  <div class="app-page pb-30">
    <nav class="py-20">当前位置：首页 > 需求发布 >发布合作信息</nav>
    <div class="bg-white py-30">
      <p class="title">平台交易</p>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="86px" label-position="right">
        <el-form-item label="交易对象">
          <div class="select">
            <div v-if="!formData.to_id" class="flex flex-col items-center" @click="userVisible = true">
              <el-icon>
                <Plus />
              </el-icon>
              <span>选择交易对象</span>
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
        <!-- <el-row :gutter="56">
          <el-col>
            <el-form-item label="头像:" prop="head">
              <el-upload accept=".jpg,.png" class="uploader" action="http://nad.bdhuoke.com/web_v1/member/upload"
                :show-file-list="false" :on-success="uploadSuccess">
                <img v-if="formData.head" :src="API_DOMAIN + formData.head" class="img" />
                <div v-else class="flex items-center flex-col">
                  <img :src="loadImg('tupian@2x.png')" alt="" class="w-30 h-30">
                  <span class="link">上传图片</span>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称:" prop="nick_name">
              <el-input v-model="formData.nick_name" placeholder="请填写" maxlength="150" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实姓名:" prop="real_name">
              <el-input v-model="formData.real_name" placeholder="请填写" maxlength="150" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="毕业院校:" prop="school">
              <el-select v-model="formData.school" filterable remote reserve-keyword placeholder="请输入学校名称"
                :remote-method="getSchoolOptions" :loading="searchLoading">
                <el-option v-for="item in schoolOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
          <el-col :span="12">
            <el-form-item label="所在地区:" prop="province">
              <el-select v-model="formData.province" placeholder="请选择省份" @change="getCityOptions">
                <el-option v-for="item in provinceOptions" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-select v-model="formData.city" placeholder="请选择城市" style="width: 216px;">
              <el-option v-for="item in cityOptions" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在行业:" prop="industry_one">
              <el-select v-model="formData.industry_one" placeholder="请选择一级行业" @change="getIndustryTowOptions">
                <el-option v-for="item in industryOneOptions" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-select v-model="formData.industry_tow" placeholder="请选择二级行业" style="width: 216px;">
              <el-option v-for="item in industryTowOptions" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称:" prop="company">
              <el-input v-model="formData.company" placeholder="请填写" maxlength="150" />
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
          <el-col :span="12">
            <el-form-item label="职位:" prop="position">
              <el-input v-model="formData.position" placeholder="请填写" maxlength="150" />
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
          <el-col :span="12">
            <el-form-item label="手机号:" prop="phone">
              <el-input v-model="formData.phone" placeholder="请填写" maxlength="11" />
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <div>
        <p>注：担保金不可以作为业务结算资金进行支付</p>
        <div>
          <el-checkbox>
            <span>我已阅读并同意</span>
            <span>《BD火客付费会员协议》</span>
          </el-checkbox>
        </div>
        <button class="btn" @click="submit">保存</button>
      </div>
    </div>
  </div>
  <User v-model="userVisible" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import User from './components/User.vue';

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
}
</style>