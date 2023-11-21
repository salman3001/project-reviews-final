import { BaseModel, BelongsTo, HasOne, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Campaign from './Campaign'
import Image from '../Image'

export default class Template extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public desc: string

  @column()
  public content: string

  @column()
  public campaignId: number

  @hasOne(() => Image)
  public thumbnail: HasOne<typeof Image>

  @belongsTo(() => Campaign)
  public campaign: BelongsTo<typeof Campaign>
}
