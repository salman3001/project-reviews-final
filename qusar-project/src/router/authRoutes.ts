import { RouteRecordRaw } from 'vue-router';

const authRoutes: RouteRecordRaw[] = [
  //auth routes
  {
    path: '/admin-login',
    component: () => import('pages/auth/AdminLogin.vue'),
    name: 'adminLogin',
  },
  {
    path: '/admin-forgot-password',
    component: () => import('pages/auth/AdminForgotPassword.vue'),
    name: 'admin.forgotPassword',
  },
];

export default authRoutes;
