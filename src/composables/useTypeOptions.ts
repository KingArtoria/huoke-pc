import { typeListAPI } from '@/utils/api'
import { ref } from 'vue'

/**
 * 根据类型获取对应的选项数据
 * @param type 
 * @returns 
 */
const useTypeOptions = () => {
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

  const updateTypeOptions = (type: number) => {
    typeListAPI({ type }).then(res => {
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
  }
  return {
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
  }
}

export default useTypeOptions