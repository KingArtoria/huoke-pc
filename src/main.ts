import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss';
import { router } from '@/routes';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "swiper/css";
import "swiper/css/pagination";
import Swiper, { Pagination } from "swiper";

Swiper.use([Pagination]);
const app = createApp(App)

/* -------- 安装模块 start -------- */
// 安装路由模块
app.use(router)
// 安装UI库
app.use(ElementPlus)
/* -------- 安装模块 end ---------- */

/* -------- 注册全局组件 start -------- */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
/* -------- 注册全局组件 end -------- */
app.mount('#app')
