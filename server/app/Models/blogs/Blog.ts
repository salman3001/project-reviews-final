import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasOne,
  ManyToMany,
  belongsTo,
  column,
  hasOne,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import BlogCategory from './BlogCategory'
import Language from '../Language'
import Image from '../Image'

export default class Blog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public slug: string

  @hasOne(() => Image)
  public image: HasOne<typeof Image>

  @manyToMany(() => BlogCategory, {
    pivotTable: 'blog_categories_pivot',
  })
  public category: ManyToMany<typeof BlogCategory>

  @column()
  public languageId: number

  @belongsTo(() => Language)
  public language: BelongsTo<typeof Language>

  @column()
  public shortDesc: string

  @column()
  public longDesc: string

  @column()
  public isPublished: boolean

  @column()
  public metaTitle: string

  @column()
  public metaKeywords: string

  @column()
  public metaDesc: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
