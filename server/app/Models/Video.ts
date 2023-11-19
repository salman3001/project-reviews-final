import { BaseModel, afterDelete, column } from '@ioc:Adonis/Lucid/Orm'
import { VideoType } from 'App/Helpers/enums'
import Drive from '@ioc:Adonis/Core/Drive'

export default class Video extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  @column()
  public url_sm: string

  @column()
  public type: VideoType

  @column()
  public productId: number

  @column()
  public serviceId: number

  @afterDelete()
  public static async deleteImage(Video: Video) {
    await Drive.delete(Video?.url)
  }
}
