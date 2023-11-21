import { BaseModel, afterDelete, column } from '@ioc:Adonis/Lucid/Orm'
import Drive from '@ioc:Adonis/Core/Drive'
import { ImageTypes } from 'App/Helpers/enums'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  @column()
  public url_sm: string

  @column()
  public type: ImageTypes = ImageTypes.IMG

  @column()
  public userId: number

  @column()
  public adminUserId: number

  @column()
  public blogId: number

  @column()
  public productId: number

  @column()
  public productCategoryId: number

  @column()
  public productSubcategoryId: number

  @column()
  public productTagId: number

  @column()
  public serviceId: number

  @column()
  public serviceCategoryId: number

  @column()
  public serviceSubcategoryId: number

  @column()
  public serviceTagId: number

  @column()
  public templateId: number

  @afterDelete()
  public static async deleteImage(image: Image) {
    await Drive.delete(image?.url)
  }
}
