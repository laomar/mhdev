import { createApp } from 'vue';
import ElementPlus, { ElMessage } from 'element-plus';
import axios from 'axios';
import VueCookies from 'vue3-cookies';
import cookie from 'vue-cookies';
import qs from 'qs';
import router from './router';
import App from './App.vue';
import i18n from './i18n';
import './index.css';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(i18n);
app.use(VueCookies);
app.config.globalProperties.$http = axios;
app.config.globalProperties.$qs = qs;
app.mount('#app');

axios.interceptors.request.use(
  (config) => {
    config.baseURL = import.meta.env.VITE_API;
    config.timeout = 5000;
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const token = cookie.get('token');
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.code !== 0) {
      if (data.msg && data.code !== 103) ElMessage.error({ center: true, duration: 1500, message: data.msg });
      if (data.code === 103) window.location.href = import.meta.env.VITE_AUTH;
      return Promise.reject(data);
    }
    if (data.msg) ElMessage.success({ center: true, duration: 1500, message: data.msg });
    return data;
  },
  (error) => {
    ElMessage.error({ center: true, duration: 1500, message: 'Network Error' });
    Promise.reject(error);
  }
);
