import { NotificationContract } from '@ioc:Verful/Notification'
import { isAdmin } from 'App/Helpers/permissionHelpers'
import Ws from 'App/services/Ws'

export default class TestNotification implements NotificationContract {
  public via(notifiable) {
    return 'database' as const
  }

  public toDatabase(notifiable: any) {
    const data = {
      title: `Hello, ${notifiable.email}, this is a test notification`,
    }

    Ws.io
      .of('/user-socket/')
      .to(`${isAdmin(notifiable) ? 'admin' : 'user'}:${notifiable.id}`)
      .emit('new-notification', data)
    return data
  }
}
