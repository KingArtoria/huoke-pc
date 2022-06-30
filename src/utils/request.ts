import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { TOKEN } from '@/utils/const'
import { router } from '@/routes';
import qs from 'qs';
import Dayjs from 'dayjs';
import { removeToekn } from './index';

// 错误信息记录
const msgHistory = new Map()
const service = axios.create({
  baseURL: 'http://nad.bdhuoke.com/',
});
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = sessionStorage.getItem(TOKEN) || localStorage.getItem(TOKEN)
    if (token && token !== 'undefined') {
      // @ts-ignore
      config.headers['token'] = token
    }
    return config
  },
)
service.interceptors.response.use(
  response => {
    if (response.data.code === undefined) {
      return response;
    }
    if (response.data.code !== 1) {
      // 相同的报错信息，2秒内不重复处理
      const msg = response.data.msg
      const time = msgHistory.get(msg)
      if (!time || Dayjs(new Date()).diff(time, 'second') > 2) {
        msgHistory.set(msg, Dayjs().format('YYYY-MM-DD HH:mm:ss'))
        ElMessage.error(msg);
        // 处理错误码
        switch (response.data.code) {
          // 需要登录
          case -2:
            // 清除token
            removeToekn()
            router.replace('/login')
            break
        }
      }
      return Promise.reject(response.data);
    } else {
      return response;
    }
  },
  error => {
    ElMessage.error(error);
    return Promise.reject(error);
  },
);
export default service;