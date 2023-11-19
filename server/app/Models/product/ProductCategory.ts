import { DateTime } from 'luxon'
import {
  BaseModel,
  HasMany,
  HasOne,
  column,
  computed,
  hasMany,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
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
  public shortDesc: string

  @column()
  public longDesc: string

  @column()
  public status: boolean

  @hasOne(() => Image)
  public thumbnail: HasOne<typeof Image>

  @hasMany(() => ProductSubcategory)
  public subCategory: HasMany<typeof ProductSubcategory>

  @hasMany(() => Faq)
  public faqs: HasMany<typeof Faq>

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @hasOne(() => Seo)
  public seo: HasOne<typeof Seo>

  @computed()
  public get subCategoryCount() {
    let count = 0
    if (this.subCategory) {
      count = this.subCategory.length
    }

    return count
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
