import NotificationSetting from 'App/Models/NotificationSetting'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(NotificationSetting, ({ faker }) => {
  return {
    onCommentReply: 1,
    onMessageRecieve: 0,
    onOffers: 1,
    onProductUpdate: 1,
  }
}).build()
