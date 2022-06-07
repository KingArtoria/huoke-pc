import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { TOKEN } from '@/utils/const'
const service = axios.create({
  baseURL: 'http://nad.bdhuoke.com/',
});
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // @ts-ignore
    config.headers['token'] = sessionStorage.getItem(TOKEN) || localStorage.getItem(TOKEN) || ''
    return config
  },
)
service.interceptors.response.use(
  response => {
    if (response.data.code == -1) {
      ElMessage.error(response.data.msg);
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