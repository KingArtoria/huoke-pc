/* 工具类 */
import { TOKEN, USER } from './const';
import { ElLoading } from 'element-plus';
/**
 * 根据数值从数组里招到对应的文本名称
 * @param value 数值
 * @param arr 文本与数值映射的数组
 * @returns 数值对应的文本
 */
export const matchLabel = (value: number, arr: ILV[]) => {
  const item = arr.find((val: ILV) => val.value == value);
  return item ? item.label : value;
};

/**
 * 导入assets下的图片
 * @param url 图片地址（不包含assets路径，无需以/开头）
 * @returns
 */
export const loadImg = (url: string) => {
  return new URL(`/src/assets/${url}`, import.meta.url).href;
};

/**
 * 从会话缓存或本地缓存里获取用户信息
 */
export const getUser = (): IUser | boolean => {
  const token = sessionStorage.getItem(TOKEN) || localStorage.getItem(TOKEN);
  if (!token) return false
  const userStr = sessionStorage.getItem(USER) || localStorage.getItem(USER);
  if (userStr) {
    return JSON.parse(userStr);
  }
  return false
}

/**
 * 校验手机号
 */
export const isPhone = (str: string) => {
  return /^1[0-9]{10}$/.test(str)
}

/**
 * 验证手机号
 * @param fieldName 字段名称
 * @param isRequired 是否必填
 * @returns 
 */
export const validPhone = (fieldName: string, isRequired: boolean = true) => {
  return [
    { required: isRequired, message: '请输入' + fieldName, trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value && !isPhone(value)) {
          callback(new Error(fieldName + '格式不正确'))
        } else {
          callback()
        }
      }, trigger: 'blur'
    }
  ]
}

export const once = (fn: Function) => {
  let loading = false
  const done = () => {
    loading = false
  }
  return function (payload?: any) {
    if (loading) return
    loading = true
    fn(done, payload)
  }
}
/**
 * 显示加载中状态的全屏遮罩层
 * @param text 
 * @returns 返回loading实例，通过调用loading实例的close方法来隐藏遮罩
 */
export const showLoading = (text = '提交数据中……') => {
  return ElLoading.service({
    lock: true,
    text,
    background: 'rgba(0, 0, 0, 0.7)',
  })
}

/**
 * 获取vip等级
 * @param level 
 */
export const getVipLevel = (level: string) => {
  switch (level) {
    case 'vip':
      return {
        is_vip: 1
      }
    case 'svip':
      return {
        is_super: 1
      }
    case 'fvip':
      return {
        is_firm: 1
      }
    case 'bvip':
      return {
        is_black: 1
      }
    default:
      return {}
  }
}

/**
 * 移除token
 */
export const removeToekn = () => {
  sessionStorage.removeItem(TOKEN)
  localStorage.removeItem(TOKEN)
  localStorage.removeItem(USER)
}

/**
 * 移除对象里值为null的字段
 * @param object 
 */
export const removeNullField = (object: Object) => {
  Object.keys(object).forEach((field) => {
    // @ts-ignore
    if (object[field] === null) {
      // @ts-ignore
      delete object[field]
    }
  })
}