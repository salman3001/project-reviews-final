import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('template', 'email/TemplatesController').apiOnly()
  Route.resource('campaign', 'email/CampaignsController').apiOnly()
  Route.resource('campaign-type', 'email/CampaignTypesController').apiOnly()
  Route.resource('interest', 'email/InterestController').apiOnly()
  Route.get('subscriber/unique-field', 'email/SubscribersController.uniqueField')
  Route.resource('subscriber', 'email/SubscribersController').apiOnly()
})
  .prefix('api')
  .middleware('auth:adminUserApi')
