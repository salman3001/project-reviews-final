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
      {
        path: 'location/cities',
        component: () => import('pages/admin/location/CityList.vue'),
        name: 'admin.location.city.index',
      },
      {
        path: 'location/streets',
        component: () => import('pages/admin/location/StreetList.vue'),
        name: 'admin.location.street.index',
      },
      {
        path: 'users',
        component: () => import('pages/admin/user/UserIndex.vue'),
        name: 'admin.user.index',
      },
      {
        path: 'users/:id/',
        component: () => import('pages/admin/user/UserView.vue'),
        name: 'admin.user.show',
      },
      {
        path: 'users/create',
        component: () => import('pages/admin/user/UserCreate.vue'),
        name: 'admin.user.create',
      },
      {
        path: 'users/:id/edit',
        component: () => import('pages/admin/user/UserEdit.vue'),
        name: 'admin.user.edit',
      },
      {
        path: 'products',
        component: () => import('pages/admin/product/ProductIndex.vue'),
        name: 'admin.product.index',
      },
      {
        path: 'products/:id/',
        component: () => import('pages/admin/product/ProductShow.vue'),
        name: 'admin.product.show',
      },
      {
        path: 'products/create',
        component: () => import('pages/admin/product/ProductCreate.vue'),
        name: 'admin.product.create',
      },
      {
        path: 'products/:id/edit',
        component: () => import('pages/admin/product/ProductEdit.vue'),
        name: 'admin.product.edit',
      },
      {
        path: 'product-category',
        component: () =>
          import(
            'pages/admin/product/product-category/ProductCategoryIndex.vue'
          ),
        name: 'admin.productCategory.index',
      },
      {
        path: 'product-category/:id/',
        component: () =>
          import(
            'pages/admin/product/product-category/ProductCategoryShow.vue'
          ),
        name: 'admin.productCategory.show',
      },
      {
        path: 'product-category/create',
        component: () =>
          import(
            'pages/admin/product/product-category/ProductCategoryCreate.vue'
          ),
        name: 'admin.productCategory.create',
      },
      {
        path: 'product-category/:id/edit',
        component: () =>
          import(
            'pages/admin/product/product-category/ProductCategoryEdit.vue'
          ),
        name: 'admin.productCategory.edit',
      },
      {
        path: 'product-subcategory',
        component: () =>
          import(
            'pages/admin/product/product-subcategory/ProductSubcategoryIndex.vue'
          ),
        name: 'admin.productSubcategory.index',
      },
      {
        path: 'product-subcategory/:id/',
        component: () =>
          import(
            'pages/admin/product/product-subcategory/ProductSubcategoryShow.vue'
          ),
        name: 'admin.productSubcategory.show',
      },
      {
        path: 'product-subcategory/create',
        component: () =>
          import(
            'pages/admin/product/product-subcategory/ProductSubcategoryCreate.vue'
          ),
        name: 'admin.productSubcategory.create',
      },
      {
        path: 'product-subcategory/:id/edit',
        component: () =>
          import(
            'pages/admin/product/product-subcategory/ProductSubCategoryEdit.vue'
          ),
        name: 'admin.productSubcategory.edit',
      },
      {
        path: 'product-tags',
        component: () =>
          import('pages/admin/product/product-tag/ProductTagIndex.vue'),
        name: 'admin.productTag.index',
      },
      {
        path: 'product-tags/:id/',
        component: () =>
          import('pages/admin/product/product-tag/ProductTagShow.vue'),
        name: 'admin.productTag.show',
      },
      {
        path: 'product-tags/create',
        component: () =>
          import('pages/admin/product/product-tag/ProductTagCreate.vue'),
        name: 'admin.productTag.create',
      },
      {
        path: 'product-tags/:id/edit',
        component: () =>
          import('pages/admin/product/product-tag/ProductTagEdit.vue'),
        name: 'admin.productTag.edit',
      },

      //service routes
      {
        path: 'services',
        component: () => import('pages/admin/service/ServiceIndex.vue'),
        name: 'admin.service.index',
      },
      {
        path: 'services/:id/',
        component: () => import('pages/admin/service/ServiceShow.vue'),
        name: 'admin.service.show',
      },
      {
        path: 'services/create',
        component: () => import('pages/admin/service/ServiceCreate.vue'),
        name: 'admin.service.create',
      },
      {
        path: 'services/:id/edit',
        component: () => import('pages/admin/service/ServiceEdit.vue'),
        name: 'admin.service.edit',
      },
      {
        path: 'service-category',
        component: () =>
          import(
            'pages/admin/service/service-category/ServiceCategoryIndex.vue'
          ),
        name: 'admin.serviceCategory.index',
      },
      {
        path: 'service-category/:id/',
        component: () =>
          import(
            'pages/admin/service/service-category/ServiceCategoryShow.vue'
          ),
        name: 'admin.serviceCategory.show',
      },
      {
        path: 'service-category/create',
        component: () =>
          import(
            'pages/admin/service/service-category/ServiceCategoryCreate.vue'
          ),
        name: 'admin.serviceCategory.create',
      },
      {
        path: 'service-category/:id/edit',
        component: () =>
          import(
            'pages/admin/service/service-category/ServiceCategoryEdit.vue'
          ),
        name: 'admin.serviceCategory.edit',
      },
      {
        path: 'service-subcategory',
        component: () =>
          import(
            'pages/admin/service/service-subcategory/ServiceSubcategoryIndex.vue'
          ),
        name: 'admin.serviceSubcategory.index',
      },
      {
        path: 'service-subcategory/:id/',
        component: () =>
          import(
            'pages/admin/service/service-subcategory/ServiceSubcategoryShow.vue'
          ),
        name: 'admin.serviceSubcategory.show',
      },
      {
        path: 'service-subcategory/create',
        component: () =>
          import(
            'pages/admin/service/service-subcategory/ServiceSubcategoryCreate.vue'
          ),
        name: 'admin.serviceSubcategory.create',
      },
      {
        path: 'service-subcategory/:id/edit',
        component: () =>
          import(
            'pages/admin/service/service-subcategory/ServiceSubCategoryEdit.vue'
          ),
        name: 'admin.serviceSubcategory.edit',
      },
      {
        path: 'service-tags',
        component: () =>
          import('pages/admin/service/service-tag/ServiceTagIndex.vue'),
        name: 'admin.serviceTag.index',
      },
      {
        path: 'service-tags/:id/',
        component: () =>
          import('pages/admin/service/service-tag/ServiceTagShow.vue'),
        name: 'admin.serviceTag.show',
      },
      {
        path: 'service-tags/create',
        component: () =>
          import('pages/admin/service/service-tag/ServiceTagCreate.vue'),
        name: 'admin.serviceTag.create',
      },
      {
        path: 'service-tags/:id/edit',
        component: () =>
          import('pages/admin/service/service-tag/ServiceTagEdit.vue'),
        name: 'admin.serviceTag.edit',
      },
      {
        path: 'subscribers',
        component: () =>
          import('pages/admin/news-letters/subscribers/SubscriberIndex.vue'),
        name: 'admin.subscriber.index',
      },
      {
        path: 'subscribers/create',
        component: () =>
          import('pages/admin/news-letters/subscribers/SubscriberCreate.vue'),
        name: 'admin.subscriber.create',
      },
      {
        path: 'subscribers/:id/edit',
        component: () =>
          import('pages/admin/news-letters/subscribers/SubscriberEdit.vue'),
        name: 'admin.subscriber.edit',
      },
      {
        path: 'templates',
        component: () =>
          import('pages/admin/news-letters/templates/TemplateIndex.vue'),
        name: 'admin.template.index',
      },
      {
        path: 'templates/create',
        component: () =>
          import('pages/admin/news-letters/templates/TemplateCreate.vue'),
        name: 'admin.template.create',
      },
      {
        path: 'templates/:id/',
        component: () =>
          import('pages/admin/news-letters/templates/TemplateShow.vue'),
        name: 'admin.template.show',
      },
      {
        path: 'templates/:id/edit',
        component: () =>
          import('pages/admin/news-letters/templates/TemplateEdit.vue'),
        name: 'admin.template.edit',
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
