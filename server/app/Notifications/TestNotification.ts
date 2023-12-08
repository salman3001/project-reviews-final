import { NotificationContract } from '@ioc:Verful/Notification'

export default class TestNotification implements NotificationContract {
  public via(notifiable) {
    return 'database' as const
  }
}
