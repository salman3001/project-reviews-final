import { DateTime } from 'luxon'
import { BaseModel, afterDelete, column } from '@ioc:Adonis/Lucid/Orm'
import Drive from '@ioc:Adonis/Core/Drive'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  @column()
  public url_sm: string

  @column()
  public userId: number

  @column()
  public adminUserId: number

  @column()
  public blogId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @afterDelete()
  public static async deleteImage(image: Image) {
    await Drive.delete(image?.url)
  }
}
