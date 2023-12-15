import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ChatMessage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public message: string

  @column()
  public type: 'User' | 'AdminUser'

  @column()
  public supportTicketId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
