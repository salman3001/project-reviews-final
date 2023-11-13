import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/users/unique-field', 'user/UsersController.uniqueField')
  Route.get('users/ban/:id', 'user/UsersController.banUser')
  Route.resource('users', 'user/UsersController').apiOnly()
  Route.resource('job-industry', 'user/JobIndustryController').apiOnly()
  Route.resource('job-departments', 'user/JobDepartmentController').apiOnly()
})
  .prefix('api')
  .middleware('auth:adminUserApi')
