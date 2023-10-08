import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/admin-users/unique-email', 'AdminUsersController.uniqueEmail')
  Route.get('admin-users/change-role/:id', 'AdminUsersController.changeRole')
  Route.get('admin-users/ban/:id', 'AdminUsersController.banUser')
  Route.resource('admin-users', 'AdminUsersController')
  Route.resource('roles', 'RolesController')
  Route.get('permissions', 'PermissiosnController.index')
})
  .prefix('api')
  .middleware('auth:adminUserApi')
  .namespace('App/Controllers/http/adminUser')
