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
        component: () => import('pages/admin/admin-users/AdminUserIndex.vue'),
        name: 'admin.adminUsers.index',
      },
      {
        path: 'admin-users/create',
        component: () => import('pages/admin/admin-users/AdminUserCreate.vue'),
        name: 'admin.adminUsers.create',
      },
      {
        path: 'admin-users/:id/edit',
        component: () => import('pages/admin/admin-users/AdminUserEdit.vue'),
        name: 'admin.adminUsers.edit',
      },
      {
        path: 'roles',
        component: () => import('pages/admin/roles/RolesIndex.vue'),
        name: 'admin.roles.index',
      },
      {
        path: 'roles/:id/edit',
        component: () => import('pages/admin/roles/RolesEdit.vue'),
        name: 'admin.roles.edit',
      },
      {
        path: 'help-center/content',
        component: () =>
          import('pages/admin/help-center/knowledgebase/ContentIndex.vue'),
        name: 'admin.knowlegebase.content.index',
      },
      {
        path: 'help-center/content/:id/',
        component: () =>
          import('pages/admin/help-center/knowledgebase/ContentView.vue'),
        name: 'admin.knowlegebase.content.show',
      },
      {
        path: 'help-center/content/create',
        component: () =>
          import('pages/admin/help-center/knowledgebase/ContentCreate.vue'),
        name: 'admin.knowlegebase.content.create',
      },
      {
        path: 'help-center/content/:id/edit',
        component: () =>
          import('pages/admin/help-center/knowledgebase/ContentEdit.vue'),
        name: 'admin.knowlegebase.content.edit',
      },
      {
        path: 'help-center/category',
        component: () =>
          import('pages/admin/help-center/knowledgebase/CategoryIndex.vue'),
        name: 'admin.knowlegebase.category.index',
      },
      {
        path: 'help-center/category/:id/',
        component: () =>
          import('pages/admin/help-center/knowledgebase/CategoryView.vue'),
        name: 'admin.knowlegebase.category.show',
      },
      {
        path: 'help-center/category/create',
        component: () =>
          import('pages/admin/help-center/knowledgebase/CategoryCreate.vue'),
        name: 'admin.knowlegebase.category.create',
      },
      {
        path: 'help-center/category/:id/edit',
        component: () =>
          import('pages/admin/help-center/knowledgebase/CategoryEdit.vue'),
        name: 'admin.knowlegebase.category.edit',
      },
      {
        path: 'help-center/contact-message',
        component: () =>
          import('pages/admin/help-center/ContactMessageIndex.vue'),
        name: 'admin.contactMessage.index',
      },
      {
        path: 'help-center/support-ticket',
        component: () =>
          import('pages/admin/help-center/SupportTicketIndex.vue'),
        name: 'admin.supportTicket.index',
      },
      {
        path: 'blogs/posts',
        component: () => import('pages/admin/blog/BlogsIndex.vue'),
        name: 'admin.blogs.index',
      },
      {
        path: 'blogs/posts/:id/',
        component: () => import('pages/admin/blog/BlogsView.vue'),
        name: 'admin.blogs.show',
      },
      {
        path: 'blogs/posts/create',
        component: () => import('pages/admin/blog/BlogsCreate.vue'),
        name: 'admin.blogs.create',
      },
      {
        path: 'blogs/posts/:id/edit',
        component: () => import('pages/admin/blog/BlogsEdit.vue'),
        name: 'admin.blogs.edit',
      },
      {
        path: 'blogs/categories',
        component: () => import('pages/admin/blog/CategoryIndex.vue'),
        name: 'admin.blogs.category.index',
      },
      {
        path: 'blogs/categories/:id/',
        component: () => import('pages/admin/blog/CategoryView.vue'),
        name: 'admin.blogs.category.show',
      },
      {
        path: 'blogs/categories/create',
        component: () => import('pages/admin/blog/CategoryCreate.vue'),
        name: 'admin.blogs.category.create',
      },
      {
        path: 'blogs/categories/:id/edit',
        component: () => import('pages/admin/blog/CategoryEdit.vue'),
        name: 'admin.blogs.category.edit',
      },
      {
        path: 'location/continents',
        component: () => import('pages/admin/location/ContinentsList.vue'),
        name: 'admin.location.continent.index',
      },
      {
        path: 'location/countries',
        component: () => import('pages/admin/location/CountryList.vue'),
        name: 'admin.location.country.index',
      },
      {
        path: 'location/states',
        component: () => import('pages/admin/location/StateList.vue'),
        name: 'admin.location.state.index',
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
