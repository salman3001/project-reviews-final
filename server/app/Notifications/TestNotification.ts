import { NotificationContract } from '@ioc:Verful/Notification'

export default class TestNotification implements NotificationContract {
  public via(notifiable) {
    return 'database' as const
  }

  public toDatabase(notifiable: any) {
    return {
      title: `Hello, ${notifiable.email}, this is a test notification`,
    }
  }
}
