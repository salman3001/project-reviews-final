import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { VideoType } from 'App/Helpers/enums'
import { AttachmentContract, attachment } from '@ioc:Adonis/Addons/AttachmentLite'

export default class Video extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @attachment({
    folder: 'videos',
    preComputeUrl: true,
  })
  file: AttachmentContract

  @column()
  public type: VideoType

  @column()
  public productId: number

  @column()
  public serviceId: number
}
