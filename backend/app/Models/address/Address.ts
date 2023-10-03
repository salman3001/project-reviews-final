import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Country from './Country'
import AdminUser from '../adminUser/AdminUser'
import State from './State'
import City from './City'
import Street from './Street'
import Continent from './Continent'
import User from '../user/User'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public address: string

  @column()
  public adminUserId: number

  @column()
  public userId: number

  @column()
  public continentId: number | null

  @belongsTo(() => Continent)
  public continent: BelongsTo<typeof Continent>

  @column()
  public countryId: number | null

  @belongsTo(() => Country)
  public country: BelongsTo<typeof Country>

  @column()
  public stateId: number

  @belongsTo(() => State)
  public state: BelongsTo<typeof State>

  @column()
  public cityId: number

  @belongsTo(() => City)
  public city: BelongsTo<typeof City>

  @column()
  public streetId: number

  @belongsTo(() => Street)
  public street: BelongsTo<typeof Street>

  @column()
  public zip: string
}
