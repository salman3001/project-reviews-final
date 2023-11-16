import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  HasOne,
  belongsTo,
  column,
  hasMany,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import ServiceCategory from './ServiceCategory'
import Image from '../Image'
import Faq from '../Faq'
import Seo from '../Seo'
import Service from './Service'

export default class ServiceSubcategory extends BaseModel {
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

  @column()
  public serviceCategoryId: boolean

  @belongsTo(() => ServiceCategory)
  public serviceCategory: BelongsTo<typeof ServiceCategory>

  @hasOne(() => Image)
  public thumbnail: HasOne<typeof Image>

  @hasMany(() => Service)
  public Services: HasMany<typeof Service>

  @hasMany(() => Faq)
  public faqs: HasMany<typeof Faq>

  @hasOne(() => Seo)
  public seo: HasOne<typeof Seo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
