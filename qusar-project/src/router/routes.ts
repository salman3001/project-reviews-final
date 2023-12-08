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
    beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),
        path: '',
        component: () => import('pages/admin/AdminDashboard.vue'),
        name: 'adminDashboard',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),
        path: 'admin-users',
        component: () => import('pages/admin/admin-users/AdminUserIndex.vue'),
        name: 'admin.adminUsers.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),
        path: 'admin-users/:id/',
        component: () => import('pages/admin/admin-users/AdminUserShow.vue'),
        name: 'admin.adminUsers.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),
        path: 'admin-users/create',
        component: () => import('pages/admin/admin-users/AdminUserCreate.vue'),
        name: 'admin.adminUsers.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),
        path: 'admin-users/:id/edit',
        component: () => import('pages/admin/admin-users/AdminUserEdit.vue'),
        name: 'admin.adminUsers.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'roles',
        component: () => import('pages/admin/roles/RolesIndex.vue'),
        name: 'admin.roles.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'roles/:id/edit',
        component: () => import('pages/admin/roles/RolesEdit.vue'),
        name: 'admin.roles.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'help-center/content',
        component: () =>
          import('pages/admin/help-center/knowledgebase/ContentIndex.vue'),
        name: 'admin.knowlegebase.content.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'help-center/content/:id/',
        component: () =>
          import('pages/admin/help-center/knowledgebase/ContentView.vue'),
        name: 'admin.knowlegebase.content.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'help-center/content/create',
        component: () =>
          import('pages/admin/help-center/knowledgebase/ContentCreate.vue'),
        name: 'admin.knowlegebase.content.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'help-center/content/:id/edit',
        component: () =>
          import('pages/admin/help-center/knowledgebase/ContentEdit.vue'),
        name: 'admin.knowlegebase.content.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'help-center/category',
        component: () =>
          import('pages/admin/help-center/knowledgebase/CategoryIndex.vue'),
        name: 'admin.knowlegebase.category.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'help-center/category/:id/',
        component: () =>
          import('pages/admin/help-center/knowledgebase/CategoryView.vue'),
        name: 'admin.knowlegebase.category.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'help-center/category/create',
        component: () =>
          import('pages/admin/help-center/knowledgebase/CategoryCreate.vue'),
        name: 'admin.knowlegebase.category.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'help-center/category/:id/edit',
        component: () =>
          import('pages/admin/help-center/knowledgebase/CategoryEdit.vue'),
        name: 'admin.knowlegebase.category.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'help-center/contact-message',
        component: () =>
          import('pages/admin/help-center/ContactMessageIndex.vue'),
        name: 'admin.contactMessage.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'help-center/support-ticket',
        component: () =>
          import('pages/admin/help-center/SupportTicketIndex.vue'),
        name: 'admin.supportTicket.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'blogs/posts',
        component: () => import('pages/admin/blog/BlogsIndex.vue'),
        name: 'admin.blogs.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'blogs/posts/:id/',
        component: () => import('pages/admin/blog/BlogsView.vue'),
        name: 'admin.blogs.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'blogs/posts/create',
        component: () => import('pages/admin/blog/BlogsCreate.vue'),
        name: 'admin.blogs.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'blogs/posts/:id/edit',
        component: () => import('pages/admin/blog/BlogsEdit.vue'),
        name: 'admin.blogs.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'blogs/categories',
        component: () => import('pages/admin/blog/CategoryIndex.vue'),
        name: 'admin.blogs.category.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'blogs/categories/:id/',
        component: () => import('pages/admin/blog/CategoryView.vue'),
        name: 'admin.blogs.category.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'blogs/categories/create',
        component: () => import('pages/admin/blog/CategoryCreate.vue'),
        name: 'admin.blogs.category.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'blogs/categories/:id/edit',
        component: () => import('pages/admin/blog/CategoryEdit.vue'),
        name: 'admin.blogs.category.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'location/continents',
        component: () => import('pages/admin/location/ContinentsList.vue'),
        name: 'admin.location.continent.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'location/countries',
        component: () => import('pages/admin/location/CountryList.vue'),
        name: 'admin.location.country.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'location/states',
        component: () => import('pages/admin/location/StateList.vue'),
        name: 'admin.location.state.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'location/cities',
        component: () => import('pages/admin/location/CityList.vue'),
        name: 'admin.location.city.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'location/streets',
        component: () => import('pages/admin/location/StreetList.vue'),
        name: 'admin.location.street.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'users',
        component: () => import('pages/admin/user/UserIndex.vue'),
        name: 'admin.user.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'users/:id/',
        component: () => import('pages/admin/user/UserView.vue'),
        name: 'admin.user.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'users/create',
        component: () => import('pages/admin/user/UserCreate.vue'),
        name: 'admin.user.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'users/:id/edit',
        component: () => import('pages/admin/user/UserEdit.vue'),
        name: 'admin.user.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'products',
        component: () => import('pages/admin/product/ProductIndex.vue'),
        name: 'admin.product.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'products/:id/',
        component: () => import('pages/admin/product/ProductShow.vue'),
        name: 'admin.product.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'products/create',
        component: () => import('pages/admin/product/ProductCreate.vue'),
        name: 'admin.product.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'products/:id/edit',
        component: () => import('pages/admin/product/ProductEdit.vue'),
        name: 'admin.product.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'product-category',
        component: () =>
          import(
            'pages/admin/product/product-category/ProductCategoryIndex.vue'
          ),
        name: 'admin.productCategory.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'product-category/:id/',
        component: () =>
          import(
            'pages/admin/product/product-category/ProductCategoryShow.vue'
          ),
        name: 'admin.productCategory.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'product-category/create',
        component: () =>
          import(
            'pages/admin/product/product-category/ProductCategoryCreate.vue'
          ),
        name: 'admin.productCategory.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'product-category/:id/edit',
        component: () =>
          import(
            'pages/admin/product/product-category/ProductCategoryEdit.vue'
          ),
        name: 'admin.productCategory.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'product-subcategory',
        component: () =>
          import(
            'pages/admin/product/product-subcategory/ProductSubcategoryIndex.vue'
          ),
        name: 'admin.productSubcategory.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'product-subcategory/:id/',
        component: () =>
          import(
            'pages/admin/product/product-subcategory/ProductSubcategoryShow.vue'
          ),
        name: 'admin.productSubcategory.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'product-subcategory/create',
        component: () =>
          import(
            'pages/admin/product/product-subcategory/ProductSubcategoryCreate.vue'
          ),
        name: 'admin.productSubcategory.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'product-subcategory/:id/edit',
        component: () =>
          import(
            'pages/admin/product/product-subcategory/ProductSubCategoryEdit.vue'
          ),
        name: 'admin.productSubcategory.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'product-tags',
        component: () =>
          import('pages/admin/product/product-tag/ProductTagIndex.vue'),
        name: 'admin.productTag.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'product-tags/:id/',
        component: () =>
          import('pages/admin/product/product-tag/ProductTagShow.vue'),
        name: 'admin.productTag.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'product-tags/create',
        component: () =>
          import('pages/admin/product/product-tag/ProductTagCreate.vue'),
        name: 'admin.productTag.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'product-tags/:id/edit',
        component: () =>
          import('pages/admin/product/product-tag/ProductTagEdit.vue'),
        name: 'admin.productTag.edit',
      },

      //service routes
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'services',
        component: () => import('pages/admin/service/ServiceIndex.vue'),
        name: 'admin.service.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'services/:id/',
        component: () => import('pages/admin/service/ServiceShow.vue'),
        name: 'admin.service.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'services/create',
        component: () => import('pages/admin/service/ServiceCreate.vue'),
        name: 'admin.service.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'services/:id/edit',
        component: () => import('pages/admin/service/ServiceEdit.vue'),
        name: 'admin.service.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'service-category',
        component: () =>
          import(
            'pages/admin/service/service-category/ServiceCategoryIndex.vue'
          ),
        name: 'admin.serviceCategory.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'service-category/:id/',
        component: () =>
          import(
            'pages/admin/service/service-category/ServiceCategoryShow.vue'
          ),
        name: 'admin.serviceCategory.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'service-category/create',
        component: () =>
          import(
            'pages/admin/service/service-category/ServiceCategoryCreate.vue'
          ),
        name: 'admin.serviceCategory.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'service-category/:id/edit',
        component: () =>
          import(
            'pages/admin/service/service-category/ServiceCategoryEdit.vue'
          ),
        name: 'admin.serviceCategory.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'service-subcategory',
        component: () =>
          import(
            'pages/admin/service/service-subcategory/ServiceSubcategoryIndex.vue'
          ),
        name: 'admin.serviceSubcategory.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'service-subcategory/:id/',
        component: () =>
          import(
            'pages/admin/service/service-subcategory/ServiceSubcategoryShow.vue'
          ),
        name: 'admin.serviceSubcategory.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'service-subcategory/create',
        component: () =>
          import(
            'pages/admin/service/service-subcategory/ServiceSubcategoryCreate.vue'
          ),
        name: 'admin.serviceSubcategory.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'service-subcategory/:id/edit',
        component: () =>
          import(
            'pages/admin/service/service-subcategory/ServiceSubCategoryEdit.vue'
          ),
        name: 'admin.serviceSubcategory.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'service-tags',
        component: () =>
          import('pages/admin/service/service-tag/ServiceTagIndex.vue'),
        name: 'admin.serviceTag.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'service-tags/:id/',
        component: () =>
          import('pages/admin/service/service-tag/ServiceTagShow.vue'),
        name: 'admin.serviceTag.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'service-tags/create',
        component: () =>
          import('pages/admin/service/service-tag/ServiceTagCreate.vue'),
        name: 'admin.serviceTag.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'service-tags/:id/edit',
        component: () =>
          import('pages/admin/service/service-tag/ServiceTagEdit.vue'),
        name: 'admin.serviceTag.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'subscribers',
        component: () =>
          import('pages/admin/news-letters/subscribers/SubscriberIndex.vue'),
        name: 'admin.subscriber.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'subscribers/create',
        component: () =>
          import('pages/admin/news-letters/subscribers/SubscriberCreate.vue'),
        name: 'admin.subscriber.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'subscribers/:id/edit',
        component: () =>
          import('pages/admin/news-letters/subscribers/SubscriberEdit.vue'),
        name: 'admin.subscriber.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'templates',
        component: () =>
          import('pages/admin/news-letters/templates/TemplateIndex.vue'),
        name: 'admin.template.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'templates/create',
        component: () =>
          import('pages/admin/news-letters/templates/TemplateCreate.vue'),
        name: 'admin.template.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'templates/:id/',
        component: () =>
          import('pages/admin/news-letters/templates/TemplateShow.vue'),
        name: 'admin.template.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'templates/:id/edit',
        component: () =>
          import('pages/admin/news-letters/templates/TemplateEdit.vue'),
        name: 'admin.template.edit',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'campaign',
        component: () =>
          import('pages/admin/news-letters/campaign/CampainIndex.vue'),
        name: 'admin.campaign.index',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'campaign/create',
        component: () =>
          import('pages/admin/news-letters/campaign/CampaignCreate.vue'),
        name: 'admin.campaign.create',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'campaign/:id/',
        component: () =>
          import('pages/admin/news-letters/campaign/CampaignShow.vue'),
        name: 'admin.campaign.show',
      },
      {
        beforeEnter: (to, from, next) => useAuth(to, from, next, 'admin'),

        path: 'campaign/:id/edit',
        component: () =>
          import('pages/admin/news-letters/campaign/CampaignEdit.vue'),
        name: 'admin.campaign.edit',
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
