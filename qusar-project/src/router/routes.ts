import { useAuth } from 'src/composables/useAuth';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/WebLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'home',
      },
    ],
  },

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
  {
    path: '/admin-reset-password',
    component: () => import('pages/auth/AdminResetPassword.vue'),
    name: 'admin.resetPassword',
  },

  //admin routes
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),
    children: [
      {
        path: '',
        component: () => import('pages/admin/AdminDashboard.vue'),
        name: 'adminDashboard',
      },
      {
        path: 'admin-users',
        component: () => import('pages/admin/AdminUserIndex.vue'),
        name: 'admin.adminUsers.index',
      },
      {
        path: 'roles',
        component: () => import('pages/admin/RolesIndex.vue'),
        name: 'admin.roles.index',
      },
      {
        path: 'help-center/content',
        component: () =>
          import('pages/help-center/knowledgebase/ContentIndex.vue'),
        name: 'admin.knowlegebase.contnet.index',
      },
      {
        path: 'help-center/category',
        component: () =>
          import('pages/help-center/knowledgebase/CategoryIndex.vue'),
        name: 'admin.knowlegebase.category.index',
      },
      {
        path: 'help-center/contact-message',
        component: () => import('pages/help-center/ContactMessageIndex.vue'),
        name: 'admin.contactMessage.index',
      },
      {
        path: 'help-center/support-ticket',
        component: () => import('pages/help-center/SupportTicketIndex.vue'),
        name: 'admin.supportTicket.index',
      },
      {
        path: 'blogs/posts',
        component: () => import('pages/blog/BlogsIndex.vue'),
        name: 'admin.blogs.index',
      },
      {
        path: 'blogs/categories',
        component: () => import('pages/blog/CategoryIndex.vue'),
        name: 'admin.blogs.category.index',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
