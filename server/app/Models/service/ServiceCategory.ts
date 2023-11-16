import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Faq from '../Faq'
import Seo from '../Seo'
import Image from '../Image'
import Service from './Service'
import ServiceSubcategory from './ServiceSubcategory'

export default class ServiceCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public short_desc: string

  @column()
  public long_desc: string

  @column()
  public status: boolean

  @hasOne(() => Image)
  public thumbnail: HasOne<typeof Image>

  @hasMany(() => ServiceSubcategory)
  public subCategory: HasMany<typeof ServiceSubcategory>

  @hasMany(() => Service)
  public services: HasMany<typeof Service>

  @hasMany(() => Faq)
  public faqs: HasMany<typeof Faq>

  @hasOne(() => Seo)
  public seo: HasOne<typeof Seo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
