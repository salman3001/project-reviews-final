import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('continents', 'address/ContinentsController')
  Route.resource('countries', 'address/CountriesController')
  Route.resource('states', 'address/StatesController')
  Route.resource('cities', 'address/CitiesController')
  Route.resource('streets', 'address/StreetsController')
}).prefix('api/address')
