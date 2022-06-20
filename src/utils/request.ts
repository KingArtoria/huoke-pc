import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { TOKEN } from '@/utils/const'
import { router } from '@/routes';

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
    if (response.data.code !== 1) {
      ElMessage.error(response.data.msg);
      // switch(response.data.code) {
      //   // 需要登录
      //   case -1:
      //     router.replace('/login')
      //     break
      // }
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