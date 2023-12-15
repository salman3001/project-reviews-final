import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/notifications', 'NotificationsController').only(['index', 'update', 'destroy'])
  Route.get('/notifications/get-unread', 'NotificationsController.getUnread')
  Route.delete('/notifications/delete/read', 'NotificationsController.destroyRead')
  Route.delete('/notifications/delete/all', 'NotificationsController.destroyAll')
}).prefix('api')
