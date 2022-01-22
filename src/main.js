import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import axios from 'axios';
import cookie from 'vue3-cookies';
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
app.use(cookie);
app.config.globalProperties.$http = axios;
app.config.globalProperties.$qs = qs;
app.mount('#app');
