import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/get-unread', 'NotificationsController.getUnread')
  Route.delete('/delete/read', 'NotificationsController.destroyRead')
  Route.delete('/delete/all', 'NotificationsController.destroyAll')
  Route.delete('/delete/:id', 'NotificationsController.destroy')
}).prefix('api/notifcations')
