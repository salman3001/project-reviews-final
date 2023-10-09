import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('blogs', 'blogs/BlogsController')
}).prefix('api')
