import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  HasOne,
  ManyToMany,
  belongsTo,
  column,
  computed,
  hasMany,
  hasOne,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from '../user/User'
import ProductCategory from './ProductCategory'
import ProductSubcategory from './ProductSubcategory'
import ProductTag from './ProductTag'
import Seo from '../Seo'
import Image from '../Image'
import Faq from '../Faq'
import Social from '../Social'

export default class Product extends BaseModel {
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
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public productCategoryId: number

  @belongsTo(() => ProductCategory)
  public productCategory: BelongsTo<typeof ProductCategory>

  @column()
  public productSubcategoryId: number

  @belongsTo(() => ProductSubcategory)
  public productSubcategory: BelongsTo<typeof ProductSubcategory>

  @hasOne(() => Seo)
  public seo: HasOne<typeof Seo>

  @hasOne(() => Social)
  public social: HasOne<typeof Social>

  @hasMany(() => Faq)
  public faq: HasMany<typeof Faq>

  @manyToMany(() => ProductTag, {
    pivotTable: 'product_tags_pivot',
  })
  public tags: ManyToMany<typeof ProductTag>

  @hasMany(() => Image)
  public images: HasMany<typeof Image>

  @computed()
  public get logo() {
    const logo = this.images.filter((i) => {
      if (i.type === 'Thumbnail') {
        return true
      } else {
        return false
      }
    })

    if (logo.length > 0) {
      return logo[0]
    } else {
      return null
    }
  }

  @computed()
  public get coverImage() {
    const cover = this.images.filter((i) => {
      if (i.type === 'Cover') {
        return true
      } else {
        return false
      }
    })

    if (cover.length > 0) {
      return cover[0]
    } else {
      return null
    }
  }

  @computed()
  public get brocherImage() {
    const Brocher = this.images.filter((i) => {
      if (i.type === 'Brocher') {
        return true
      } else {
        return false
      }
    })

    if (Brocher.length > 0) {
      return Brocher[0]
    } else {
      return null
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
