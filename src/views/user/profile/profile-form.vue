<template>
  <div class="p-34 bg-white fs-16">
    <p class="fs-18 mb-28">个人中心</p>
    <div class="tip flex items-center">
      完善您的个人信息后才能发布合作信息、查看合作信息联系方式、添加人脉、查企业等操作（带*号为必填项）
    </div>
    <div class="form-wrap mt-40">
      <el-form ref="formRef" :model="formData" :rulues="rules" label-width="80px" label-position="right">
        <el-row :gutter="56">
          <el-col>
            <el-form-item label="头像:">
              <el-upload accept=".jpg,.png" class="uploader" action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false" :on-success="uploadSuccess">
                <img v-if="formData.head" :src="formData.head" class="img" />
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
          <el-col>
            <el-form-item label="毕业院校:" prop="school">
              <!-- <el-select-v2 v-model="formData.school" filterable remote :remote-method="getSchoolOptions"
                :options="schoolOptions" :loading="searchLoading" placeholder="请输入学校名称" /> -->
              <!-- <el-select-v2 v-model="formData.school" filterable :options="schoolOptions" placeholder="请输入学校名称" /> -->
              <!-- <el-select-v2 v-model="value" :options="options" placeholder="Please select" size="large" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在地区:" prop="province">
              <el-select v-model="formData.province" @change="getCityOptions">
                <el-option v-for="item in provinceOptions" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-select v-model="formData.city">
              <el-option v-for="item in cityOptions" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在行业:" prop="industry_one">
              <el-select v-model="formData.industry_one" @change="getIndustryTowOptions">
                <el-option v-for="item in industryOneOptions" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-select v-model="formData.industry_tow">
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
import { provinceAPI, cityAPI, getIndustryListAPI, getIndustryInfoAPI, getSchoolListAPI } from '@/utils/api'
import { loadImg } from '@/utils/index'
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
  nick_name: [{ required: true, message: '请输入', trigger: 'blur' }],
  real_name: [{ required: true, message: '请输入', trigger: 'blur' }],
  school: [{ required: true, message: '请输入', trigger: 'blur' }],
  industry_one: [{ required: true, message: '请输入', trigger: 'blur' }],
  province: [{ required: true, message: '请输入', trigger: 'blur' }],
  company: [{ required: true, message: '请输入', trigger: 'blur' }],
  position: [{ required: true, message: '请输入', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入', trigger: 'blur' }],
}
const formRef = ref()
let loading = false
const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    loading = true
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
const getCityOptions = () => {
  formData.value.city = ''
  cityAPI({
    id: formData.value.province
  }).then(res => {
    cityOptions.value = res.data.data
  })
}
// 根据所选一级行业
const getIndustryTowOptions = () => {
  formData.value.industry_tow = ''
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
// getSchoolListAPI({ name: '' }).then(res => {
//   schoolOptions.value = res.data.data.map((v: any) => {
//     return {
//       label: v.name,
//       value: v.id
//     }
//   })
// })
// 上传成功回调
const uploadSuccess = (res: any) => {
  console.log(res);

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