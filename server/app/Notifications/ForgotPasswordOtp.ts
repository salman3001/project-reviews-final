import { NotificationContract } from '@ioc:Verful/Notification'

export default class ForgotPasswordOtp implements NotificationContract {
  public via(notifiable) {
    return 'mail' as const
  }
}
