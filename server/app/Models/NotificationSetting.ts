import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class NotificationSetting extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public onMessageRecieve: boolean
  @column()
  public onCommentReply: boolean
  @column()
  public onProductUpdate: boolean
  @column()
  public onOffers: boolean
  @column()
  public userId: boolean
}
