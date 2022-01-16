import { createRouter, createWebHistory } from 'vue-router';
import cookie from 'vue-cookies';
import util from '../util';

// 定义路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue'),
      children: [
        {
          path: ':pathMatch(.*)',
          redirect: '/'
        }
      ]
    }
  ]
});

// 路由拦截
router.beforeEach((to, from, next) => {
  let token = cookie.get('token');
  if (!util.isToken(token)) {
    cookie.remove('token');
    token = null;
  }
  switch (to.name) {
  case 'login':
    next();
    break;
  default:
    if (token) next();
    else {
      window.location.href = import.meta.env.VITE_AUTH;
    }
    break;
  }
});

export default router;
