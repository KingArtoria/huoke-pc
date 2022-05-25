import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss';
import { router } from '@/routes';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

/* -------- 安装模块 start -------- */
// 安装路由模块
app.use(router)
// 安装UI库
app.use(ElementPlus)
/* -------- 安装模块 end ---------- */

app.mount('#app')
