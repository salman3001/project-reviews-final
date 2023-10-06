import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('admin-users/change-role/:id', 'AdminUsersController.changeRole')
  Route.get('admin-users/ban/:id', 'AdminUsersController.banUser')
  Route.resource('admin-users', 'AdminUsersController')
  Route.get('unique-email', 'AdminUsersController.uniqueEmail')
  Route.resource('roles', 'RolesController')
  Route.get('permissions', 'PermissiosnController.index')
})
  .prefix('api/admin')
  .middleware('auth:adminUserApi')
  .namespace('App/Controllers/http/adminUser')
