import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class NotificationSetting extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public onMessageRecieve: number
  @column()
  public onCommentReply: number
  @column()
  public onProductUpdate: number
  @column()
  public onOffers: number
  @column()
  public userId: number
}
