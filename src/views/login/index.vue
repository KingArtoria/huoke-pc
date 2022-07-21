<template>
  <div class="bg-white">
    <div class="head">
      <img :src="loadImg('logo_wa@2x.png')" alt="" class="logo cursor-pointer" @click="router.push('/')">
    </div>
    <div class="content app-img">
      <div class="box">
        <!-- 登录、注册 -->
        <el-tabs v-show="!isFoundPwd" v-model="activeTab" class="box_tabs">
          <el-tab-pane label="登录" name="login" class="box_tabs_login">
            <div class="tip-wrap">
              <img :src="tipImg" alt="" class="img">
              <span>登陆账号，完成微信绑定，如没有账号，请注册</span>
            </div>
            <input type="text" maxlength="11" v-model="loginForm.phone" placeholder="请输入手机号"
              class="box_tabs_login_input" />
            <div class="code-wrap">
              <!-- 密码 -->
              <input v-if="loginType == 'pass'" type="password" maxlength="12" v-model="loginForm.pass"
                placeholder="请输入密码" class="box_tabs_login_input" />
              <!-- 验证码 -->
              <input v-if="loginType == 'code'" type="text" maxlength="6" v-model="loginForm.code" placeholder="请输入验证码"
                class="box_tabs_login_input" />
              <Sms v-show="loginType === 'code'" :phone="loginForm.phone" type="login" />
            </div>

            <div class="box_tabs_login_text" @click="loginType = 'code'" v-if="loginType == 'pass'">手机验证码登录</div>
            <div class="box_tabs_login_text" @click="loginType = 'pass'" v-if="loginType == 'code'">密码登录</div>
            <div class="box_tabs_login_btn" @click="doLogin">登录</div>

            <div class="box_tabs_login_link">
              <el-checkbox v-model="isRemember">记住登录状态</el-checkbox>
              <div class="box_tabs_login_link_text" @click="isFoundPwd = true">忘记密码</div>
            </div>
            <!-- <div class="third">
              <span>第三方账号登录</span>
              <img :src="wxImg" alt="" class="img">
            </div> -->
          </el-tab-pane>
          <el-tab-pane label="注册" name="register" class="box_tabs_login">
            <div class="tip-wrap">
              <img :src="tipImg" alt="" class="img">
              <span>登陆账号，完成微信绑定，如没有账号，请注册</span>
            </div>
            <input type="text" maxlength="11" v-model="registerForm.phone" placeholder="请输入手机号"
              class="box_tabs_login_input" />
            <div class="code-wrap">
              <input type="text" maxlength="6" v-model="registerForm.code" placeholder="请输入验证码"
                class="box_tabs_login_input" />
              <Sms :phone="registerForm.phone" type="sign" />
            </div>
            <input type="password" v-model="registerForm.pass" placeholder="请输入密码" class="box_tabs_login_input" />
            <input type="password" v-model="registerForm.againPass" placeholder="请输入确认密码"
              class="box_tabs_login_input" />
            <input type="password" v-model="registerForm.invitationCode" placeholder="请输入邀请码(选填)"
              class="box_tabs_login_input" />
            <div class="text-wrap">
              <div class="flex">
                <div>
                  <el-checkbox v-model="isReceive" class="check"></el-checkbox>
                </div>
                <span class="text whitespace-normal">我已阅读并接受<span class="light"><span
                      @click="setProtocol('《BD火客用户服务协议》', 'http://fw.bdhuoke.com')">《BD火客用户服务协议》</span><span
                      @click="setProtocol('《隐私政策》', 'http://app.bdhuoke.com')">《隐私政策》</span></span></span>
              </div>
            </div>
            <div class="box_tabs_login_btn" @click="sign">注册</div>
          </el-tab-pane>
        </el-tabs>
        <!-- 找回密码 -->
        <div v-show="isFoundPwd" class="back" @click="isFoundPwd = false">返回上一页</div>
        <el-tabs v-show="isFoundPwd" class="box_tabs">
          <el-tab-pane label="手机号找回" class="box_tabs_login">
            <input type="text" maxlength="11" v-model="foundForm.phone" placeholder="请输入手机号"
              class="box_tabs_login_input" />
            <div class="code-wrap">
              <input type="text" maxlength="6" v-model="foundForm.code" placeholder="请输入验证码"
                class="box_tabs_login_input" />
              <Sms :phone="foundForm.phone" type="uppass" />
            </div>
            <input type="password" v-model="foundForm.pass" placeholder="请输入新密码" class="box_tabs_login_input" />
            <input type="password" v-model="foundForm.againPass" placeholder="请输入确认密码" class="box_tabs_login_input" />
            <div class="box_tabs_login_btn" @click="reLogin">登录</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <Protocol v-if="protocolVisible" v-model="protocolVisible" :title="protocolTitle" :url="protocolUrl" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import tipImg from '@/assets/tishi@2x.webp';
import { loginApi, loginnopassApi, forgetPassApi, signApi } from '@/utils/api';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus'
import { TOKEN, USER } from '@/utils/const'
import Sms from './components/Sms.vue';
import Protocol from '@/components/Protocol.vue';
import { loadImg } from '@/utils';

const router = useRouter()
const route = useRoute()
// 登录选项卡
const activeTab = ref('login')
if (['login', 'register'].includes(route.query.tab as string)) {
  activeTab.value = route.query.tab as string
}
// 是否记住登录
const isRemember = ref(false)
// 登录方式
const loginType = ref('pass')
// 是否找回密码
const isFoundPwd = ref(false)
// 是否勾选同意协议
const isReceive = ref(false)
// 注册表单
const registerForm = ref({
  phone: '', // 手机号
  code: '', // 验证码
  pass: '', // 密码
  againPass: '', // 确认密码
  invitationCode: '', // 邀请码
})
// 登录表单
const loginForm = ref({
  phone: '', // 手机号
  code: '', // 验证码
  pass: '', // 密码
})
// 找回密码表单
const foundForm = ref({
  phone: '', // 手机号
  code: '', // 验证码
  pass: '', // 密码
  againPass: '', // 确认密码
})

/* 注册账号 */
let registerLoading = false
const sign = () => {
  if (registerLoading) return
  if (!/^1[0-9]{10}$/.test(registerForm.value.phone)) return ElMessage.error('手机号格式有误')
  if (!registerForm.value.code) return ElMessage.error('请输入验证码')
  if (!registerForm.value.pass) return ElMessage.error('请输入密码')
  if (!registerForm.value.againPass) return ElMessage.error('请输入确认密码')
  if (registerForm.value.againPass !== registerForm.value.pass) return ElMessage.error('两次密码输入不一致')
  if (!isReceive.value) return ElMessage.error('请同意并勾选协议')
  registerLoading = true
  signApi({
    phone: registerForm.value.phone,
    pass: registerForm.value.pass,
    againpass: registerForm.value.againPass,
    code: registerForm.value.code,
    source: 'web',
    Invitation_code: registerForm.value.invitationCode
  }).then(() => {
    registerLoading = false
    ElMessage.success('注册成功，请登录')
    activeTab.value = 'login'
  }).catch(() => {
    registerLoading = false
  })
}

/* 密码登录 */
let loading = false
const doLogin = () => {
  if (loading) return
  if (!/^1[0-9]{10}$/.test(loginForm.value.phone)) return ElMessage.error('手机号格式有误')
  let promise = null
  // 密码登录
  if (loginType.value === 'pass') {
    if (!loginForm.value.pass) return ElMessage.error('请输入密码')
    loading = true
    promise = loginApi({ phone: loginForm.value.phone, pass: loginForm.value.pass })
  } else {
    // 短信验证码登录
    if (!loginForm.value.code) return ElMessage.error('请输入验证码')
    loading = true
    promise = loginnopassApi({ phone: loginForm.value.phone, code: loginForm.value.code })
  }
  promise.then(res => {
    loading = false
    sessionStorage.setItem(TOKEN, res.data.data.token);
    // 记住密码
    if (isRemember.value) localStorage.setItem(TOKEN, res.data.data.token);
    localStorage.setItem(USER, JSON.stringify(res.data.data));
    router.push('/');
  }).catch((err) => {
    if (err.code == -3) {
      loginForm.value.pass = ''
    }
    loading = false
  })
}

/* 找回密码 */
let reLoading = false
const reLogin = () => {
  if (reLoading) return
  if (!/^1[0-9]{10}$/.test(foundForm.value.phone)) return ElMessage.error('手机号格式有误')
  if (!foundForm.value.code) return ElMessage.error('请输入验证码')
  if (!foundForm.value.pass) return ElMessage.error('请输入密码')
  if (!foundForm.value.againPass) return ElMessage.error('请输入确认密码')
  if (foundForm.value.againPass !== foundForm.value.pass) return ElMessage.error('两次密码输入不一致')
  reLoading = true
  forgetPassApi({
    phone: foundForm.value.phone,
    pass: foundForm.value.pass,
    againpass: foundForm.value.againPass,
    code: foundForm.value.code,
  }).then(res => {
    reLoading = false
    ElMessage.success(res.data.msg)
    // 让用户重新登录
    isFoundPwd.value = false
  }).catch(() => {
    reLoading = false
  })
}

// 协议
const protocolVisible = ref(false)
const protocolTitle = ref('')
const protocolUrl = ref('')
const setProtocol = (title: string, url: string) => {
  protocolTitle.value = title
  protocolUrl.value = url
  protocolVisible.value = true
}
</script>

<style lang="scss" scoped>
.head {
  width: 1382px;
  margin: 0 auto;
  height: 120px;
  display: flex;
  align-items: center;
}

.content {
  background-image: url('@/assets/banner_dl@2x.webp');
  background-size: 100% 102%;
  height: 660px;
  position: relative;
}

.box {
  width: 440px;
  padding-bottom: 40px;
  background: #ffffff;
  border-radius: 10px;
  position: absolute;
  top: 28px;
  right: 368px;

  .box_tabs {
    padding: 0 60px;
    margin-top: 20px;

    .box_tabs_login {
      padding-top: 0.3rem;

      .box_tabs_login_input {
        margin-top: 10px;
        width: 319px;
        height: 51px;
        background: #f4f4f4;
        padding: 0 30px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        border: 0;
        outline: 0;

        &::placeholder {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #C6C6C6;
        }
      }

      .box_tabs_login_code {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #0071fb;
        cursor: pointer;
      }

      .box_tabs_login_text {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #0071FB;
        margin-top: 14px;
        cursor: pointer;
      }

      .box_tabs_login_btn {
        width: 319px;
        height: 51px;
        background: #0071fb;
        border-radius: 5px;
        margin: 0 auto;
        margin-top: 17px;
        color: #ffffff;
        cursor: pointer;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .box_tabs_login_link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 13px;

        .box_tabs_login_link_text {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #898989;
          cursor: pointer;
        }
      }
    }
  }
}

.tip-wrap {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #FF7F80;

  .img {
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }
}

::v-deep(.el-tabs__item) {
  height: 60px;
  font-size: 16px;
}

.third {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #898989;
  margin-top: 38px;

  .img {
    margin-top: 17px;
    width: 42px;
    height: 42px;
  }
}

.code-wrap {
  position: relative;
}

.text-wrap {
  display: flex;
  margin-top: 25px;
  line-height: 1.5;

  .check {
    margin-top: 5px;
    height: auto;
  }
}

.text {
  color: #585858;
  font-size: 14px;
  margin-left: 6px;
  flex: 1;

  .light {
    color: #0071FB;
  }
}

.back {
  position: absolute;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #858585;
  top: 28px;
  right: 20px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    color: #0071fb;
  }
}

.logo {
  width: 172px;
  height: 66px;
}
</style>   