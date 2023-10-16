import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/admin-users/unique-field', 'adminUser/AdminUsersController.uniqueField')
  Route.get('admin-users/change-role/:id', 'adminUser/AdminUsersController.changeRole')
  Route.get('admin-users/ban/:id', 'adminUser/AdminUsersController.banUser')
  Route.resource('admin-users', 'adminUser/AdminUsersController').apiOnly()
  Route.resource('roles', 'adminUser/RolesController').apiOnly()
  Route.resource('permissions', 'adminUser/PermissionsController').apiOnly()
})
  .prefix('api')
  .middleware('auth:adminUserApi')
