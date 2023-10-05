import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('admin-login', 'AuthController.adminLogin')
  Route.get('admin-logout', 'AuthController.adminLogout')
}).prefix('api/auth')
