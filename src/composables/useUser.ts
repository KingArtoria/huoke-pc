import { ref } from 'vue';
import { VIP_LEVEL } from '@/utils/const'
import { memberInfoEditAPI, userInfoAPI } from '@/utils/api';
import { loadImg } from '@/utils';

// 获取当前用户是否是vip
const useUser = () => {
  const isVip = ref(false)
  userInfoAPI().then(res => {
    isVip.value = res.data.data.user_info.maxvip !== VIP_LEVEL.ORDINARY
  })
  const getUserInfo = async (): Promise<IUser> => {
    const [res1, res2] = await Promise.all([
      userInfoAPI(),
      memberInfoEditAPI({ type: 'get' })
    ])
    let userInfo: any = {}
    res1.data.data.user_info.phone = res1.data.data.user_info.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
    userInfo = Object.assign(res2.data.data || {}, res1.data.data.user_info)
    if (!userInfo.head) {
      userInfo.head = loadImg('default.webp')
    }
    return userInfo
  }

  return {
    isVip,
    getUserInfo
  }
}

export default useUser