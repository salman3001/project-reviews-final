import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('service/delete-screenshot/:id', 'service/ServicesController.deleteScreenShot')
  Route.resource('service', 'service/ServicesController').apiOnly()
  Route.resource('service-category', 'service/ServiceCategoriesController').apiOnly()
  Route.resource('service-subcategory', 'service/ServiceSubcategoriesController').apiOnly()
  Route.resource('service-tags', 'service/ServiceTagsController').apiOnly()
})
  .prefix('api')
  .middleware('auth:adminUserApi')
