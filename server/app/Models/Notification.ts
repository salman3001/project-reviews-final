import { DateTime } from 'luxon'
import { column, BaseModel, afterCreate } from '@ioc:Adonis/Lucid/Orm'
import Ws from 'App/services/Ws'

export default class Notification extends BaseModel {
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

  @afterCreate()
  public static pushNotification(notification: Notification) {
    let room = ''
    if (notification.userId) {
      room = `user:${notification.userId}`
    }
    if (notification.adminUserId) {
      room = `admin:${notification.adminUserId}`
    }
    Ws.io.of('/notifications/').to(room).emit('new-notification', notification)
  }
}
