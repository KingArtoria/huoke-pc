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
          <el-form-item label="合作地区" prop="areaArr">
            <el-cascader v-model="formData.areaArr" :props="cascaderProps" collapse-tags collapse-tags-tooltip clearable
              :show-all-levels="false" />
          </el-form-item>
          <el-form-item v-if="[1, 2, 11].includes(type)" label="合作类型" prop="cooptype_id">
            <el-radio-group v-model="formData.cooptype_id">
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
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { provinceAPI, cityAPI, saveProjectAPI } from '@/utils/api'
import { ElMessage } from 'element-plus';
import { showLoading } from '@/utils/index'
import useTypeOptions from '@/composables/useTypeOptions'

const route = useRoute()
const router = useRouter()
const type = ref(0)
type.value = parseInt(route.query.type as string || '0')
const formRef = ref()
const formData = ref({
  type, // 合作类型
  title: '优质货源', // 合作标题
  areaArr: [], // 合作区域
  cooptype_id: null, // 合作类型
  promotion: null, // 推广方式
  price: 9.9, // 单价
  settmod_id: null, // 结算方式
  settcycle_id: null, // 结算周期
  info: null, // 需求详情
  product: null, // 产品类型
  source: null, // 产品类型
  comprehensive: null, // 需求类型
  user_number: null, // 用户量
  product_name: null, // 产品名称
  issuing: null, // 一件代发
  product_advantage: null, // 产品优势
  supplement: null, // 产品优势
  channel_advantage: null, // 渠道优势
  introduce: null, // 渠道简介
  assessment: null, // 销货能力
  alliance: null, // 合作模式
  profits: null, // 预计年利润
  quantity: null, // 广告位数量
  amount: null, // 线下场地数量
  contact: '18112341234', // 联系电话
  wx: null, // 微信
  qq: null, // qq
  platform: 1, // 支持平台交易
})
const isDiscuss = ref(false) // 是否可议
const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }], // 标题
  areaArr: [{ required: true, message: '请选择合作地区', trigger: 'change' }], // 合作地区
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
  cooptype_id: [{ required: true, message: '请选择合作类型', trigger: 'change' }], // 合作类型
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
const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    const loading = showLoading()
    const params = JSON.parse(JSON.stringify(formData.value))
    // 价格为可议时，清空金额字段
    if (isDiscuss.value) params.price = null
    // 格式化区域（省：市，0表示全部）
    params.area = formData.value.areaArr.map((arr: any) => {
      // 只选择省没有选市，后面补0
      if (arr.length === 1) arr.push(0)
      return arr.join(':')
    }).join(',')
    delete params.areaArr
    saveProjectAPI(params).then(() => {
      loading.close()
      ElMessage.success('发布成功')
      router.push({
        path: '/'
      })
    }).catch(() => {
      loading.close()
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

// 根据类型获取对应的选项数据
const {
  cooperationTypes,
  settleOptions,
  cycleOptions,
  productOptions,
  sourceOptions,
  comprehensiveOptions,
  channelOptions,
  userNumberOptions,

  infoLabelMap,
  productLabelMap,
  sourceLabelMap,
  comprehensiveLabelMap,
  userNumberLabelMap,
  productNameLabelMap,
  issuingLabelMap,
  productAdvantageLabelMap,
  supplementLabelMap,
  introduceLabelMap,
  assessmentLabelMap,
  allianceLabelMap,
  updateTypeOptions
} = useTypeOptions()
updateTypeOptions(type.value)


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