import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('continents', 'address/ContinentsController').apiOnly()
  Route.resource('countries', 'address/CountriesController').apiOnly()
  Route.resource('states', 'address/StatesController').apiOnly()
  Route.resource('cities', 'address/CitiesController').apiOnly()
  Route.resource('streets', 'address/StreetsController').apiOnly()
})
  .prefix('api/address')
  .middleware('auth:adminUserApi')
