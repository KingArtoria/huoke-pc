<template>
  <div class="app-page">
    <nav class="nav">当前位置：首页 > 需求发布 >发布合作信息</nav>
    <section class="content">
      <div class="tip">
        <p>1、严禁发布各类违法、违禁信息；严禁在非指定区域输入任何联系方式，一旦发现，将做封号处理。</p>
        <p>2、安全提醒，为了更好的保护自身权益，建议合作前充分了解对方签署合同，特别是涉及金钱的合作！</p>
      </div>
      <p class="text">填写发布合作信息内容</p>
      <div class="form">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" placeholder="请填写" />
          </el-form-item>
          <el-form-item label="合作地区" prop="area">
            <el-cascader v-model="formData.area" :props="cascaderProps" collapse-tags collapse-tags-tooltip clearable
              :show-all-levels="false" />
          </el-form-item>
          <el-form-item v-if="[1, 2, 11].includes(type)" label="合作类型" prop="cooptype">
            <el-radio-group v-model="formData.cooptype">
              <el-radio v-for="item in cooperationTypes" :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 产品类型 -->
          <el-form-item v-if="[3, 4, 7, 8, 9, 10].includes(type)" :label="productLabelMap[type].label" prop="product">
            <el-radio-group v-model="formData.product">
              <el-radio v-for="item in productOptions" :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 货源类型 -->
          <el-form-item v-if="[3, 4, 5, 6].includes(type)" :label="sourceLabelMap[type].label" prop="source">
            <el-radio-group v-model="formData.source">
              <el-radio v-for="item in sourceOptions" :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 需求类型 -->
          <el-form-item v-if="[5, 6, 7, 9].includes(type)" :label="comprehensiveLabelMap[type].label"
            prop="comprehensive">
            <el-radio-group v-model="formData.comprehensive">
              <el-radio v-for="item in comprehensiveOptions" :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 4渠道优势 -->
          <el-form-item v-if="[4].includes(type)" label="渠道优势" prop="channel_advantage">
            <el-radio-group v-model="formData.channel_advantage">
              <el-radio v-for="item in channelOptions" :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 用户量 -->
          <el-form-item v-if="[6, 8].includes(type)" :label="userNumberLabelMap[type].label" prop="user_number">
            <el-radio-group v-model="formData.user_number">
              <el-radio v-for="item in userNumberOptions" :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 3产品名称 7项目名称 -->
          <el-form-item v-if="[3, 7].includes(type)" :label="productNameLabelMap[type].label" prop="product_name">
            <el-input v-model="formData.product_name" :placeholder="productNameLabelMap[type].placeholder" />
          </el-form-item>
          <!-- 3一件代发 4一件代发 9场地所在区域 -->
          <el-form-item v-if="[3, 4, 9].includes(type)" :label="issuingLabelMap[type].label" prop="issuing">
            <el-input v-model="formData.issuing" :placeholder="issuingLabelMap[type].placeholder" />
          </el-form-item>
          <!-- 3产品优势 4产品要求 5提供的资源 6流量载体类型 10资源描述 -->
          <el-form-item v-if="[3, 4, 5, 6, 10].includes(type)" :label="productAdvantageLabelMap[type].label"
            prop="product_advantage">
            <el-input v-model="formData.product_advantage" :placeholder="productAdvantageLabelMap[type].placeholder" />
          </el-form-item>
          <!-- 3相关资质 4其他补充 5其他补充 6其他补充 7其他要求 9场地概况 10其他补充 -->
          <el-form-item v-if="[3, 4, 5, 6, 7, 9, 10].includes(type)" :label="supplementLabelMap[type].label"
            prop="supplement">
            <el-input v-model="formData.supplement" :placeholder="supplementLabelMap[type].placeholder" />
          </el-form-item>
          <!-- 4渠道简介 6可互换位置 7加盟扶持政策 -->
          <el-form-item v-if="[4, 6, 7].includes(type)" :label="introduceLabelMap[type].label" prop="introduce">
            <el-input v-model="formData.introduce" :placeholder="introduceLabelMap[type].placeholder" />
          </el-form-item>
          <!-- 4销货能力 5合作要求 6合作要求 8广告位资源描述 10合作要求 -->
          <el-form-item v-if="[4, 5, 6, 8, 10].includes(type)" :label="assessmentLabelMap[type].label"
            prop="assessment">
            <el-input v-model="formData.assessment" :placeholder="assessmentLabelMap[type].placeholder" />
          </el-form-item>
          <!-- 4合作模式 6合作模式 7加盟条件 8合作要求 10合作模式 -->
          <el-form-item v-if="[4, 6, 7, 8, 10].includes(type)" :label="allianceLabelMap[type].label" prop="alliance">
            <el-input v-model="formData.alliance" :placeholder="allianceLabelMap[type].placeholder" />
          </el-form-item>
          <!-- 7预计年利润 -->
          <el-form-item v-if="[7].includes(type)" label="预计年利润" prop="profits">
            <el-input v-model="formData.profits" placeholder="请输入" />
          </el-form-item>
          <!-- 8广告位数量 -->
          <el-form-item v-if="[8].includes(type)" label="广告位数量" prop="quantity">
            <el-input v-model="formData.quantity" placeholder="请输入" />
          </el-form-item>
          <!-- 9线下场地数量 -->
          <el-form-item v-if="[9].includes(type)" label="线下场地数量" prop="amount">
            <el-input v-model="formData.amount" placeholder="请输入" />
          </el-form-item>

          <el-form-item v-if="[1, 2, 11].includes(type)" label="推广方式" prop="promotion">
            <el-radio-group v-model="formData.promotion">
              <el-radio v-for="item in promoteOptions" :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="[1, 2, 3, 11].includes(type)" label="单价" prop="price" class="is-required">
            <el-input v-model="formData.price" placeholder="0.00" type="number" style="width: 180px;" />
            <span style="margin-left: 7px;">元</span>
            <el-checkbox v-model="isDiscuss" style="margin-left: 40px;">可议</el-checkbox>
          </el-form-item>
          <el-form-item v-if="[1, 2, 11].includes(type)" label="结算方式" prop="settmod_id">
            <el-radio-group v-model="formData.settmod_id">
              <el-radio v-for="item in settleOptions" :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="[1, 2, 4, 11].includes(type)" label="结算周期" prop="settcycle_id">
            <el-radio-group v-model="formData.settcycle_id">
              <el-radio v-for="item in cycleOptions" :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="[1, 2, 5, 8, 9, 11].includes(type)" :label="infoLabelMap[type].label" prop="info">
            <el-input v-model="formData.info" :placeholder="infoLabelMap[type].placeholder" />
          </el-form-item>
          <el-form-item label="联系方式" prop="contact">
            <el-input v-model="formData.contact" placeholder="请输入手机号码" maxlength="150" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="微信">
            <el-input v-model="formData.wx" placeholder="请输入微信(非必填)" maxlength="150" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="formData.qq" placeholder="请输入QQ(非必填)" maxlength="150" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="平台交易" prop="platform">
            <el-radio-group v-model="formData.platform">
              <el-radio v-for="item in platformOptions" :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <button class="app-btn" @click.prevent="submit">发布</button>
          </el-form-item>

        </el-form>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { provinceAPI, cityAPI, saveProjectAPI, typeListAPI } from '@/utils/api'
import { ElMessage } from 'element-plus';
const route = useRoute()
const router = useRouter()
const type = ref(0)
type.value = parseInt(route.query.type as string || '0')
const formRef = ref()
const formData = ref({
  type, // 合作类型
  title: '', // 合作标题
  area: [], // 合作区域
  cooptype: '', // 合作类型
  promotion: '', // 推广方式
  price: '', // 单价
  settmod_id: '', // 结算方式
  settcycle_id: '', // 结算周期
  info: '', // 需求详情
  product: '', // 产品类型
  source: '', // 产品类型
  comprehensive: '', // 需求类型
  user_number: '', // 用户量
  product_name: '', // 产品名称
  issuing: '', // 一件代发
  product_advantage: '', // 产品优势
  supplement: '', // 产品优势
  channel_advantage: '', // 渠道优势
  introduce: '', // 渠道简介
  assessment: '', // 销货能力
  alliance: '', // 合作模式
  profits: '', // 预计年利润
  quantity: '', // 广告位数量
  amount: '', // 线下场地数量
  contact: '', // 联系电话
  wx: '', // 微信
  qq: '', // qq
  platform: 1, // 支持平台交易
})
const isDiscuss = ref(false) // 是否可议
const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }], // 标题
  area: [{ required: true, message: '请选择合作地区', trigger: 'change' }], // 合作地区
  product: [{ required: true, message: '请选择', trigger: 'change' }], // 产品类型
  source: [{ required: true, message: '请选择', trigger: 'change' }], // 货源类型
  comprehensive: [{ required: true, message: '请选择', trigger: 'change' }], // 需求类型
  user_number: [{ required: true, message: '请输入', trigger: 'change' }], // 用户量
  product_name: [{ required: true, message: '请输入', trigger: 'blur' }], // 产品名称
  issuing: [{ required: true, message: '请输入', trigger: 'blur' }], // 一件代发
  product_advantage: [{ required: true, message: '请输入', trigger: 'blur' }], // 产品优势
  supplement: [{ required: true, message: '请输入', trigger: 'blur' }], // 相关资质
  channel_advantage: [{ required: true, message: '请选择', trigger: 'change' }], // 渠道优势
  introduce: [{ required: true, message: '请输入', trigger: 'blur' }], // 渠道简介
  assessment: [{ required: true, message: '请输入', trigger: 'blur' }], // 销货能力
  alliance: [{ required: true, message: '请输入', trigger: 'blur' }], // 合作模式
  profits: [{ required: true, message: '请输入', trigger: 'blur' }], // 预计年利润
  quantity: [{ required: true, message: '请输入', trigger: 'blur' }], // 广告位数量
  amount: [{ required: true, message: '请输入', trigger: 'blur' }], // 线下场地数量
  cooptype: [{ required: true, message: '请选择合作类型', trigger: 'change' }], // 合作类型
  promotion: [{ required: true, message: '请选择推广方式', trigger: 'change' }],
  price: [{
    validator: (rule: any, value: string, callback: Function) => {
      // 勾选【可议】后不需要输入单价
      if (!value) {
        if (isDiscuss.value) {
          callback()
        } else {
          callback(new Error('请输入单价或选择可议'))
        }
      } else {
        callback()
      }
    }, trigger: 'blur'
  }],
  settmod_id: [{ required: true, message: '请选择结算方式', trigger: 'change' }],
  settcycle_id: [{ required: true, message: '请选择结算周期', trigger: 'change' }],
  info: [{ required: true, message: '请输入', trigger: 'blur' }],
  contact: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (/^1[0-9]{10}$/.test(value)) {
          callback()
        } else {
          callback(new Error('联系方式格式有误'))
        }
      }, trigger: 'blur'
    }
  ],
  platform: [{ required: true, message: '请选择是否支持平台交易', trigger: 'change' }],
}
// 提交表单
let loading = false
const submit = () => {
  if (loading) {
    return
  }
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    loading = true
    if (isDiscuss.value) {
      formData.value.price = '0'
    }
    // @ts-ignore
    formData.value.area = formData.value.area.map((v: any) => {
      return v.join(':')
    }).join(',')
    // @ts-ignore
    if (formData.value.area === '0') {
      // @ts-ignore
      formData.value.area = '0:0'
    }
    // console.log(formData.value);
    saveProjectAPI(formData.value).then(res => {
      ElMessage.success('发布成功')
      router.push({
        path: '/'
      })
    }).catch(() => {
      loading = false
    })
  })
}
// 推广方式
const promoteOptions = ref([
  { id: '网推', name: '网推' },
  { id: '地推', name: '地推' },
])
// 平台交易
const platformOptions = ref([
  { id: 1, name: '支持' },
  { id: 2, name: '不支持' },
])
// 级联选择器配置项
const cascaderProps = {
  multiple: true,
  lazy: true,
  value: 'id',
  label: 'name',
  checkStrictly: true,
  // 懒加载数据
  lazyLoad(node: any, resolve: any) {
    if (node.level === 0) {
      // 省
      provinceAPI().then(res => {
        resolve([{ id: 0, name: '全国', leaf: true }].concat(res.data.data))
      })
    } else {
      // 市
      cityAPI({ id: node.value }).then(res => {
        res.data.data.forEach((v: any) => {
          v.leaf = true
        })
        resolve(res.data.data)
      })
    }
  },
}

// 合作类型
const cooperationTypes = ref<any>([])
// 结算方式
const settleOptions = ref<any>([])
// 结算周期
const cycleOptions = ref<any>([])
// 产品类型
const productOptions = ref<any>([])
// 货源类型
const sourceOptions = ref<any>([])
// 需求类型
const comprehensiveOptions = ref<any>([])
// 渠道优势
const channelOptions = ref<any>([])
// 用户量
const userNumberOptions = ref<any>([])
// 根据类型获取对应的选项数据
typeListAPI({ type: type.value }).then(res => {
  // 合作类型，结算方式，结算周期
  const { cooptype, settmod, settcycle, product, source, comprehensive, channel_advantage, user_number } = res.data.data
  cooperationTypes.value = cooptype
  settleOptions.value = settmod
  cycleOptions.value = settcycle
  productOptions.value = product
  sourceOptions.value = source
  comprehensiveOptions.value = comprehensive
  channelOptions.value = channel_advantage
  userNumberOptions.value = user_number
})

// info字段名称
const infoLabelMap: any = {
  1: { label: '需求详情', placeholder: '这里可以输入您所需要的资源详情可以是：推广的产品及介绍' },
  2: { label: '考核标准', placeholder: '这里可以输入您所需要的资源考核标准可以是产品单价等' },
  5: { label: '需求的资源', placeholder: '请输入需求的资源' },
  8: { label: '合作方式', placeholder: '请输入合作方式' },
  9: { label: '需求资源', placeholder: '请输入需求资源' },
  11: { label: '需求详情', placeholder: '这里可以输入您所需要的资源详情可以是：推广的产品及介绍' },
}
// product字段名称
const productLabelMap: any = {
  3: { label: '产品类型', placeholder: '' },
  4: { label: '产品类型', placeholder: '' },
  7: { label: '项目类型', placeholder: '' },
  8: { label: '广告位场景', placeholder: '' },
  9: { label: '场地类型', placeholder: '' },
  10: { label: '资源类型', placeholder: '' },
}
// source字段名称
const sourceLabelMap: any = {
  3: { label: '货源类型', placeholder: '' },
  4: { label: '渠道类型', placeholder: '' },
  5: { label: '提供资源类型', placeholder: '' },
  6: { label: '提供用户类型', placeholder: '' },
}
// comprehensive字段名称
const comprehensiveLabelMap: any = {
  5: { label: '需求资源类型', placeholder: '' },
  6: { label: '需求用户类型', placeholder: '' },
  7: { label: '加盟费', placeholder: '' },
  9: { label: '需求合作模式', placeholder: '' },
}
// user_number字段名称
const userNumberLabelMap: any = {
  6: { label: '用户量', placeholder: '' },
  8: { label: '日曝光量', placeholder: '' },
}
// product_name字段名称
const productNameLabelMap: any = {
  3: { label: '产品名称', placeholder: '请输入产品名称' },
  7: { label: '项目名称', placeholder: '请输入项目名称' },
}
// issuing字段名称
const issuingLabelMap: any = {
  3: { label: '一件代发', placeholder: '是否支持一件代发' },
  4: { label: '一件代发', placeholder: '是否要求一件代发' },
  9: { label: '场地所在区域', placeholder: '请输入场地所在区域' },
}
// product_advantage字段名称
const productAdvantageLabelMap: any = {
  3: { label: '产品优势', placeholder: '产品优势及介绍' },
  4: { label: '产品要求', placeholder: '请输入对产品的要求' },
  5: { label: '提供的资源', placeholder: '请输入提供的资源' },
  6: { label: '流量载体类型', placeholder: '请输入流量载体类型' },
  10: { label: '资源描述', placeholder: '请输入资源描述' },
}
// supplement字段名称
const supplementLabelMap: any = {
  3: { label: '相关资质', placeholder: '相关资质是否齐全' },
  4: { label: '其他补充', placeholder: '请输入其他补充' },
  5: { label: '其他补充', placeholder: '只考虑互换、异业合作，广告公司勿扰' },
  6: { label: '其他补充', placeholder: '只考虑互换、异业合作，广告公司勿扰' },
  7: { label: '其他要求', placeholder: '请输入其他要求' },
  9: { label: '场地概况', placeholder: '请输入场地概况' },
  10: { label: '其他补充', placeholder: '请输入其他补充' },
}
// introduce字段名称
const introduceLabelMap: any = {
  4: { label: '渠道简介', placeholder: '渠道简介' },
  6: { label: '可互换位置', placeholder: '请输入可互换位置' },
  7: { label: '加盟扶持政策', placeholder: '请输入加盟扶持政策' },
}
// assessment字段名称
const assessmentLabelMap: any = {
  4: { label: '销货能力', placeholder: '产品优势及介绍' },
  5: { label: '合作要求', placeholder: '请输入合作要求' },
  6: { label: '合作要求', placeholder: '请输入合作要求' },
  8: { label: '广告位资源描述', placeholder: '请输入广告位资源描述' },
  10: { label: '合作要求', placeholder: '请输入合作要求' },
}
// alliance字段名称
const allianceLabelMap: any = {
  4: { label: '合作模式', placeholder: '请输入合作模式' },
  6: { label: '合作模式', placeholder: '请输入合作模式' },
  7: { label: '加盟条件', placeholder: '请输入加盟条件' },
  8: { label: '合作要求', placeholder: '请输入合作要求' },
  10: { label: '合作模式', placeholder: '请输入合作模式' },
}
</script>

<style lang="scss" scoped>
.app-page {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #202020;
  margin-bottom: 48px;
}

.nav {
  padding: 20px 0;
}

.content {
  padding: 20px;
  background: white;
}

.tip {
  height: 87px;
  background: #FFFEE9;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #E66B11;
  line-height: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
}

.text {
  margin: 30px 0 25px 0;
}

.app-btn {
  width: 200px;
  height: 44px;
  line-height: 44px;
  border-radius: 4px;
}

.form {
  width: 956px;
}
</style>