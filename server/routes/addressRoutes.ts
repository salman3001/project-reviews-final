import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('continents', 'AddressesController.getContinents')
  Route.get('countries', 'AddressesController.getCountries')
  Route.get('states', 'AddressesController.getStates')
  Route.get('cities', 'AddressesController.getCities')
  Route.get('streets', 'AddressesController.getStreets')
}).prefix('api/address')
