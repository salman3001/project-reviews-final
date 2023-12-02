import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/users/unique-field', 'user/UsersController.uniqueField')
  Route.get('users/ban/:id', 'user/UsersController.banUser')
  Route.post('users/update-password/:id', 'user/UsersController.updateUserPassword')
  Route.resource('users', 'user/UsersController').apiOnly()
  Route.resource('job-industry', 'user/JobIndustryController').apiOnly()
  Route.resource('job-departments', 'user/JobDepartmentController').apiOnly()
  Route.resource('scoial', 'user/user/SocialController').apiOnly()
})
  .prefix('api')
  .middleware('auth:adminUserApi')
