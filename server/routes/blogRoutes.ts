import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('blogs/unique-field', 'blogs/BlogsController.uniqueField')
  Route.resource('blogs', 'blogs/BlogsController').apiOnly()
  Route.get('blog-categories/unique-field', 'blogs/BlogCategoriesController.uniqueField')
  Route.resource('blog-categories', 'blogs/BlogCategoriesController').apiOnly()
}).prefix('api')
