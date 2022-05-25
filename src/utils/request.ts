import axios from 'axios';
import { ElMessage  } from 'element-plus';
const service = axios.create({
  baseURL: 'http://nad.bdhuoke.com/',
});
service.interceptors.response.use(
  response => {
    if (response.data.code == -1) {
      ElMessage.error(response.data.msg);
      return false;
    }
    return response;
  },
  error => {
    // if (error.response.status == 401) {
    //   router.push('/login')
    //   Message.error('请重新登录');
    //   return false;
    // }
    ElMessage.error(error);
    // ElMessageBox.
  },
);
export default service;