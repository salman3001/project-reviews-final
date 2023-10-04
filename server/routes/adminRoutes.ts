import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //protected routes
  Route.group(() => {
    Route.get('logout', 'AuthController.adminLogout').as('admin.logout')

    Route.resource('admin-users', 'AdminUsersController')
    Route.get('admin-users/ban/:id', 'AdminUsersController.banUser')
    Route.get('admin-users/change-role/:id', 'AdminUsersController.changeRole')
    Route.resource('roles', 'RolesController')
    Route.get('permissions', 'PermissiosnController.index')
  }).middleware('auth:adminUserApi')

  Route.post('login', 'AuthController.adminLogin')
}).prefix('api/admin')
