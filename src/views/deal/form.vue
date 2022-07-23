<template>
  <div class="app-page pb-30">
    <nav class="py-20">当前位置：<router-link to="/" class="nav-link">首页</router-link> > 平台交易 > 发起交易</nav>
    <div class="flex">
      <div class="bg-white py-30 flex-1 mr-14">
        <p class="title mb-30">平台交易</p>
        <div class="content">
          <el-form ref="formRef" :model="formData" :rules="rules" label-width="86px" label-position="right">
            <el-form-item label="交易对象" prop="to_id">
              <div class="select">
                <div v-if="!formData.to_id" class="flex flex-col items-center pt-20" @click="userVisible = true">
                  <el-icon class="plus-icon">
                    <Plus />
                  </el-icon>
                  <span class="mt-10">选择交易对象</span>
                </div>
                <div v-else class="flex item" @click="userVisible = true">
                  <img :src="user.head" alt="" class="img">
                  <div>
                    <p class="flex items-end">
                      <span>{{ user.nick_name }}</span>
                    </p>
                    <p class="fs-13 color-8D8D8D mt-10 flex items-center">
                      <span>{{ user.position }}</span>
                      <span v-if="user.position" class="line"></span>
                      <span>{{ user.company }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="合作内容" prop="content">
              <el-input v-model="formData.content" placeholder="请输入合作内容" maxlength="150" />
            </el-form-item>
            <el-form-item label="对方要求" prop="demand">
              <el-input v-model="formData.demand" placeholder="请输入对方要求" maxlength="150" />
            </el-form-item>
            <el-form-item label="结算条件" prop="condition">
              <el-input v-model="formData.condition" placeholder="请输入结算条件" maxlength="150" />
            </el-form-item>
            <el-form-item label="其他补充" prop="other">
              <el-input v-model="formData.other" placeholder="请输入其他补充" maxlength="150" />
            </el-form-item>
            <el-form-item label="担保金额" prop="price">
              <el-input v-model="formData.price" placeholder="请输入担保金额" type="number">
                <template #prepend>￥</template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="tip-wrap">
            <p class="tip">注：担保金不可以作为业务结算资金进行支付</p>
            <div>
              <el-checkbox v-model="isAgree">
                <span>我已阅读并同意</span>
                <span class="link" @click="protocolVisible = true">《BD火客付费会员协议》</span>
              </el-checkbox>
            </div>
            <button class="btn" @click="submit">提交</button>
          </div>
        </div>
      </div>
      <aside class="aside">
        <!-- <Download class="download" /> -->
      </aside>
    </div>
  </div>
  <User v-if="userVisible" v-model="userVisible" @change="setUser" />
  <Protocol v-if="protocolVisible" v-model="protocolVisible" title="《BD火客付费会员协议》" url="http://hyxy.bdhuoke.com" />
  <Success v-if="successVisible" v-model="successVisible" title="提交成功" @update:modelValue="back" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import User from './components/User.vue';
import Download from '@/components/Download.vue';
import Protocol from '@/components/Protocol.vue';
import { establishGuaranteeAPI } from '@/utils/api'
import { useRouter } from 'vue-router';
import Success from '@/components/Success.vue';

const router = useRouter()
const isAgree = ref(false)
const protocolVisible = ref(false)
const successVisible = ref(false)
const formData = ref({
  to_id: '', // 交易对象
  price: '', // 担保金额
  content: '', // 合作内容
  demand: '', // 对方要求
  condition: '', // 结算条件
  other: '', // 其他补充
})
const rules = {
  to_id: [{ required: true, message: '请选择交易对象', trigger: 'change' }],
  content: [{ required: true, message: '请输入合作内容', trigger: 'blur' }],
  demand: [{ required: true, message: '请输入对方要求', trigger: 'blur' }],
  condition: [{ required: true, message: '请输入结算条件', trigger: 'blur' }],
  other: [{ required: true, message: '请输入其他补充', trigger: 'blur' }],
  price: [{ required: true, message: '请输入担保金额', trigger: 'blur' }],
}
const formRef = ref()
let loading = false
const submit = () => {
  if (loading) return
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    if (!isAgree.value) return ElMessage.error('请阅读并同意《BD火客付费会员协议》')
    loading = true
    const params = {
      to_id: formData.value.to_id,
      price: formData.value.price,
      details: `合作内容:${formData.value.content};对方要求:${formData.value.demand};结算条件:${formData.value.condition};其他补充:${formData.value.other};`
    }
    establishGuaranteeAPI(params).then(res => {
      loading = false
      successVisible.value = true
    }).catch(() => {
      loading = false
    })
  })
}

// 交易对象
const user = ref<any>({})
const userVisible = ref(false)
const setUser = (item: any) => {
  user.value = item
  formData.value.to_id = item.id
}

const back = () => {
  router.back()
}
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

.item {
  padding: 16px;
  border-radius: 3px;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;

  .select-btn {
    width: 69px;
    height: 25px;
    border: 1px solid #BDBDBD;
    border-radius: 13px;
    color: #BDBDBD;
    position: absolute;
    top: 26px;
    right: 26px;
    transition: all 0.3s;
  }

  .img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .line {
    width: 1px;
    height: 10px;
    background: #c7c7c7;
    margin: 0 8px;
  }
}

.color-8D8D8D {
  color: #8D8D8D;
}

.nav-link {
  &:hover {
    text-decoration: underline;
    color: #0074FF;
  }
}
</style>