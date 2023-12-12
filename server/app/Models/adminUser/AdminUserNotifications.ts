import { DateTime } from 'luxon'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class AdminUserNotifications extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public data: object

  @column()
  public notifiableId: number

  @column.dateTime()
  public reatAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
