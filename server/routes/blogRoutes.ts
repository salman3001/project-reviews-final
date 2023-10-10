import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('blogs/unique-title', 'blogs/BlogsController.uniqueTitle')
  Route.get('blogs/unique-slug', 'blogs/BlogsController.uniqueSlug')
  Route.resource('blogs', 'blogs/BlogsController')
  Route.get('blog-categories/unique-name', 'blogs/BlogCategoriesController.uniqueName')
  Route.get('blog-categories/unique-slug', 'blogs/BlogCategoriesController.uniqueSlug')
  Route.get('blog-categories/unique-order', 'blogs/BlogCategoriesController.uniqueOrder')
  Route.resource('blog-categories', 'blogs/BlogCategoriesController')
}).prefix('api')
