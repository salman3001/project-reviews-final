import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/users/unique-field', 'user/UsersController.uniqueField')
  Route.get('users/change-role/:id', 'user/UsersController.changeRole')
  Route.get('users/ban/:id', 'user/UsersController.banUser')
  Route.resource('users', 'user/UsersController').apiOnly()
})
  .prefix('api')
  .middleware('auth:adminUserApi')
