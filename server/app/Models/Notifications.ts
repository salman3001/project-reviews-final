import { DateTime } from 'luxon'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Notifications extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
    consume: (v) => {
      return JSON.parse(v)
    },
  })
  public data: object

  @column()
  public userId: number

  @column()
  public adminUserId: number

  public markAsRead() {
    this.reatAt = DateTime.now()
  }

  @column.dateTime()
  public reatAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
