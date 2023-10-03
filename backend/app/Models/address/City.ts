import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Street from './Street'

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public stateId: number

  @hasMany(() => Street)
  public street: HasMany<typeof Street>
}
