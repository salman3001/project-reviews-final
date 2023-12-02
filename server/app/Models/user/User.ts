import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Address from '../address/Address'
import Language from '../Language'
import Education from './Education'
import NotificationSetting from '../NotificationSetting'
import Social from '../Social'
import FavoriteLink from '../FavoriteLink'
import Experience from './Experience'
import Skill from './Skill'
import Image from '../Image'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public userName: string

  @column()
  public phone: string

  @column()
  public desc: string

  @column()
  public isActive: boolean

  @column()
  public isPublic: boolean

  @hasOne(() => Image)
  public avatar: HasOne<typeof Image>

  @hasOne(() => Social)
  public social: HasOne<typeof Social>

  @hasOne(() => Address)
  public address: HasOne<typeof Address>

  @hasMany(() => Experience)
  public experiences: HasMany<typeof Experience>

  @hasMany(() => Education)
  public educations: HasMany<typeof Education>

  @manyToMany(() => Language, {
    pivotColumns: ['proficiency'],
    pivotTable: 'user_languages',
  })
  public languages: ManyToMany<typeof Language>

  @manyToMany(() => Skill, {
    pivotTable: 'user_skills',
  })
  public skills: ManyToMany<typeof Skill>

  @hasMany(() => FavoriteLink)
  public favoriteLinks: HasMany<typeof FavoriteLink>

  @hasOne(() => NotificationSetting)
  public NotificationSetting: HasOne<typeof NotificationSetting>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
