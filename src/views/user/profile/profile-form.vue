<template>
  <div class="p-34 bg-white fs-16">
    <p class="fs-18 mb-28">个人中心</p>
    <div class="tip flex items-center">
      完善您的个人信息后才能发布合作信息、查看合作信息联系方式、添加人脉、查企业等操作（带*号为必填项）
    </div>
    <div class="form-wrap mt-40">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="86px" label-position="right">
        <el-row :gutter="56">
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
        </el-row>
      </el-form>
      <button class="btn" @click="submit">保存</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { provinceAPI, cityAPI, getIndustryListAPI, getIndustryInfoAPI, getSchoolListAPI, memberInfoEditAPI, uploadFile } from '@/utils/api'
import { loadImg, validPhone } from '@/utils/index'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { API_DOMAIN } from '@/utils/const'

const router = useRouter()
const formData = ref({
  type: 'set',
  head: '', // 头像
  nick_name: '', // 昵称
  real_name: '', // 真实姓名
  school: '', // 学校
  industry_one: '', // 一级行业
  industry_tow: '', // 二级行业
  province: '', // 省份
  city: '', // 城市
  company: '', // 公司
  position: '', // 职位
  phone: '', // 联系电话
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
  phone: validPhone('手机号'),
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

// 省份
const provinceOptions = ref<any>([])
// 城市
const cityOptions = ref<any>([])
// 一级行业
const industryOneOptions = ref<any>([])
// 二级行业
const industryTowOptions = ref<any>([])
// 学校
const schoolOptions = ref<any>([])
// 根据所选省份获取城市
const getCityOptions = (isClear: boolean = true) => {
  if (isClear) formData.value.city = ''
  cityAPI({
    id: formData.value.province
  }).then(res => {
    cityOptions.value = res.data.data
  })
}
// 根据所选一级行业
const getIndustryTowOptions = (isClear: boolean = true) => {
  if (isClear) formData.value.industry_tow = ''
  getIndustryInfoAPI({
    id: formData.value.industry_one
  }).then(res => {
    industryTowOptions.value = res.data.data
  })
}
// 搜索学校
const searchLoading = ref(false)
const getSchoolOptions = (query: string) => {
  if (query !== '') {
    searchLoading.value = true
    getSchoolListAPI({ name: query }).then(res => {
      searchLoading.value = false
      schoolOptions.value = res.data.data.map((v: any) => {
        return {
          label: v.name,
          value: v.id
        }
      })
    })
  } else {
    schoolOptions.value = []
  }
}
provinceAPI().then(res => {
  provinceOptions.value = res.data.data
})
getIndustryListAPI().then(res => {
  industryOneOptions.value = res.data.data
})
// 回显用户资料
memberInfoEditAPI({ type: 'get' }).then(res => {
  const data = res.data.data
  formData.value.head = data.head
  formData.value.nick_name = data.nick_name
  formData.value.real_name = data.real_name
  formData.value.school = data.school
  formData.value.industry_one = data.industry_one
  formData.value.industry_tow = data.industry_tow
  formData.value.province = data.province
  formData.value.city = data.city
  formData.value.company = data.company
  formData.value.position = data.position
  formData.value.phone = data.phone
  getCityOptions(false)
  getIndustryTowOptions(false)
  getSchoolOptions(data.schoolname)
})

// 上传成功回调
const uploadSuccess = (res: any) => {
  formData.value.head = res.data
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

.form-wrap {
  width: 660px;
}

.el-select {
  width: 100%;
}

.btn {
  width: 200px;
  height: 40px;
  background: #0A7BF5;
  border-radius: 4px;
  margin: 20px 0 0 80px;
  color: #fff;
}

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
</style>