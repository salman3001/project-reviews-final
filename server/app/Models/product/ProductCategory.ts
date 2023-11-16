import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Image from '../Image'
import Faq from '../Faq'
import Seo from '../Seo'
import Product from './Product'
import ProductSubcategory from './ProductSubcategory'

export default class ProductCategory extends BaseModel {
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

  @hasOne(() => ProductSubcategory)
  public subCategory: HasOne<typeof ProductSubcategory>

  @hasMany(() => Faq)
  public faqs: HasMany<typeof Faq>

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @hasOne(() => Seo)
  public seo: HasOne<typeof Seo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
