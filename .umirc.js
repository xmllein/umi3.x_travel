import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/home/index', title: '首页' },
        {
          path: '/user',
          component: '@/pages/user/index',
          title: '用户',
          auth: true,
        },
        {
          path: '/user/edit',
          component: '@/pages/user/edit/index',
          title: '用户编辑',
        },
        {
          path: '/order',
          component: '@/pages/order/index',
          title: '订单',
          auth: true,
        },
        { path: '/search', component: '@/pages/search/index', title: '搜索' },
        {
          path: '/observer',
          component: '@/pages/observer',
          title: '观察者（测试）',
        },
        {
          path: '/house',
          component: '@/pages/house/index',
          title: '房屋详情',
        },
        {
          path: '/login',
          component: '@/pages/login/index',
          title: '登录',
        },
        {
          path: '/register',
          component: '@/pages/register/index',
          title: '注册',
        },
      ],
    },
  ],
  mock: false,
  // 设置代理
  proxy: {
    '/api': {
      target: 'http://localhost:7001/',
      changeOrigin: true,
    },
  },
  mfsu: {},
  fastRefresh: {},
});
