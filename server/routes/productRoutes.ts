import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('product/delete-screenshot/:id', 'product/ProductsController.deleteScreenShot')
  Route.resource('product', 'product/ProductsController').apiOnly()
  Route.resource('product-category', 'product/ProductCategoriesController').apiOnly()
  Route.resource('product-subcategory', 'product/ProductSubcategoriesController').apiOnly()
  Route.resource('product-tags', 'product/ProductTagsController').apiOnly()
})
  .prefix('api')
  .middleware('auth:adminUserApi')
