import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Campaign from './Campaign'

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

  @belongsTo(() => Campaign)
  public campaign: BelongsTo<typeof Campaign>
}
