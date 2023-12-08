import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class ForgotPasswordOtp extends BaseMailer {
  public prepare(message: MessageContract) {
    message.subject('The email subject').from('admin@example.com').to('user@example.com')
  }
}
