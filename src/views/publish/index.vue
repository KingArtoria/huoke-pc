<template>
  <div class="app-page">
    <nav class="nav">当前位置：首页 > 需求发布 >发布合作信息</nav>
    <section class="content">
      <div class="tip">
        <p>1、严禁发布各类违法、违禁信息；严禁在非指定区域输入任何联系方式，一旦发现，将做封号处理； </p>
        <p>2、安全提醒，为了更好的保护自身权</p>
      </div>
      <p class="text">填写发布合作信息内容</p>
      <div class="form">
        <el-form :model="formData" :rules="rules" label-width="100px">
          <el-form-item label="合作标题" prop="title">
            <el-input v-model="formData.title" placeholder="请填写" maxlength="150" />
          </el-form-item>
          <el-form-item label="合作地区" prop="area">
            <el-cascader :options="cascaderOptions" :props="cascaderProps" collapse-tags collapse-tags-tooltip
              clearable />
          </el-form-item>
          <el-form-item label="合作类型" prop="type">
            <el-radio-group v-model="formData.type">
              <el-radio v-for="item in cooperationTypes" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="推广方式" prop="promote">
            <el-radio-group v-model="formData.promote">
              <el-radio v-for="item in promoteOptions" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input v-model="formData.price" placeholder="0.00" type="number" style="width: 180px;" />
            <span style="margin-left: 7px;">元</span>
            <el-checkbox v-model="formData.isDiscuss" :label="1" style="margin-left: 40px;">可议</el-checkbox>
          </el-form-item>
          <el-form-item label="结算方式" prop="settle">
            <el-radio-group v-model="formData.settle">
              <el-radio v-for="item in settleOptions" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="考核标准" prop="check">
            <el-input v-model="formData.check" placeholder="这里可以输入您所需要的资源详情可以是：产品单价等" type="textarea" :rows="6" />
          </el-form-item>
          <el-form-item label="结算周期" prop="cycle">
            <el-radio-group v-model="formData.cycle">
              <el-radio v-for="item in cycleOptions" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="需求详情" prop="detail">
            <el-input v-model="formData.detail" placeholder="这里可以输入您所需要的资源详情可以是：推广的产品及介绍" type="textarea" :rows="6" />
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入联系方式" maxlength="150" style="width: 300px;" />
          </el-form-item>
          <el-form-item>
            <button class="app-btn">发布</button>
          </el-form-item>

        </el-form>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const formData = ref({
  title: '', // 合作标题
  type: 1, // 合作类型
  promote: 1, // 推广方式
  settle: 1, // 结算方式
  check: '', // 考核标准
  detail: '', // 需求详情
  phone: '', // 联系方式
  cycle: '', // 结算周期
  price: '', // 单价
  isDiscuss: 0, // 是否可议
  area: [], // 合作区域
})
const rules = {}
// 合作类型
const cooperationTypes = [
  { label: '信用卡开卡', value: 1 },
  { label: '权益卡开卡', value: 2 },
  { label: '手机卡开卡', value: 3 },
  { label: 'ETC开卡', value: 4 },
  { label: '加油卡开卡', value: 5 },
  { label: '支付通道', value: 6 },
  { label: '场地进驻', value: 7 },
  { label: '信用卡开卡', value: 8 },
  { label: '权益卡开卡', value: 9 },
  { label: '手机卡开卡', value: 10 },
  { label: 'ETC开卡', value: 11 },
  { label: '加油卡开卡', value: 12 },
  { label: '支付通道', value: 13 },
  { label: '场地进驻', value: 14 },
]
// 推广方式
const promoteOptions = [
  { label: '网推', value: 1 },
  { label: '地推', value: 2 },
]
// 结算方式
const settleOptions = [
  { label: 'CPS', value: 1 },
  { label: 'CPA', value: 2 },
  { label: 'CPI', value: 3 },
  { label: 'CPC', value: 4 },
  { label: 'CPM', value: 5 },
  { label: 'CPD', value: 6 },
  { label: 'ROI', value: 7 },
  { label: 'CPT', value: 8 },
  { label: '其他', value: 9 },
]
// 结算周期
const cycleOptions = [
  { label: '预付', value: 1 },
  { label: '日结', value: 2 },
  { label: '周结', value: 3 },
  { label: '月结', value: 4 },
  { label: '可议', value: 5 },
]
// 级联选择器数据
const cascaderOptions = []
// 级联选择器配置项
const cascaderProps = {
  multiple: true,
  lazy: true,
  // 懒加载数据
  // lazyLoad(node: any, resolve: any) {
  //   resolve([])
  // },
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