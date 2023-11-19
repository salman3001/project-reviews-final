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
import Image from '../Image'
import Faq from '../Faq'
import Seo from '../Seo'
import ProductCategory from './ProductCategory'
import Product from './Product'

export default class ProductSubcategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public shortDesc: string

  @column()
  public longDesc: string

  @column()
  public status: boolean

  @column()
  public productCategoryId: number

  @belongsTo(() => ProductCategory)
  public productCategory: BelongsTo<typeof ProductCategory>

  @hasOne(() => Image)
  public thumbnail: HasOne<typeof Image>

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @hasMany(() => Faq)
  public faqs: HasMany<typeof Faq>

  @hasOne(() => Seo)
  public seo: HasOne<typeof Seo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
