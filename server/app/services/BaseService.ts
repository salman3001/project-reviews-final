import {
  LucidModel,
  LucidRow,
  ModelPaginatorContract,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'

type Populate = Record<string, { fields: string[]; populate: Populate }>
type Search = Record<string, string> | null
type Filter = Record<string, string> | null
type Order = Record<string, 'asc' | 'desc'>
type RelationFilter = Record<string, { field: string; value: string; filter: RelationFilter }>

export interface IndexQs {
  page: number | null
  search: Search
  orderBy: Order
  filter: Filter
  relationFilter: RelationFilter
  populate: Populate
  fields: string[]
}

class BaseService<T extends LucidModel> {
  private perPage = 10
  public modal: T

  constructor(modal: T) {
    this.modal = modal
  }

  public async index(qs: IndexQs) {
    let records: ModelPaginatorContract<LucidRow> | LucidRow[] | [] = []
    const query = this.modal.query()

    if (qs.relationFilter) {
      const relationFilter = JSON.parse(qs.relationFilter as unknown as string) as RelationFilter
      this.relationFiler(relationFilter, query)
    }

    if (qs.orderBy) {
      const orderBy = JSON.parse(qs.orderBy as unknown as string) as Order
      for (const key in orderBy) {
        const type = orderBy[key]
        query.orderBy(key, type)
      }
    }

    if (qs.populate) {
      const populate = JSON.parse(qs.populate as unknown as string) as Populate
      await this.populate(populate, query)
    }

    if (qs.filter) {
      const filter = JSON.parse(qs.filter as unknown as string) as Filter
      for (const key in filter) {
        const element = filter[key]
        if (element !== null) {
          query.where(key, element)
        }
      }
    }

    if (qs.search) {
      const search = JSON.parse(qs.search as unknown as string) as Search
      let i = 0

      query.where((b) => {
        for (const key in search) {
          const element = search[key]
          if (element !== '') {
            if (i === 0) {
              b.whereLike(key, '%' + element + '%')
            } else {
              b.orWhereLike(key, '%' + element + '%')
            }
            i++
          }
        }
      })
    }

    if (qs.fields) {
      records = await query.select(qs.fields)
    }

    if (qs.page) {
      records = await query.paginate(qs.page, this.perPage)
    } else {
      records = await query.exec()
    }

    return records
  }

  public async show(id: number, qs?: { fields: string[]; populate: Populate }) {
    const record = this.modal.query().where('id', id)

    if (qs?.fields) {
      const fileds = JSON.parse(qs.fields as unknown as string)
      record.select(fileds)
    }

    if (qs?.populate) {
      const populate = JSON.parse(qs.populate as unknown as string) as Populate
      console.log(populate)
      await this.populate(populate, record)
    }
    return await record.first()
  }

  public async store(payload: any) {
    const record = await this.modal.create(payload)
    return record
  }

  public async update(id: number, payload: any) {
    const record = await this.modal.query().where('id', id).first()
    record?.merge(payload)
    await record?.save()
    return record
  }

  public async destroy(id: number) {
    const record = await this.modal.find(id)
    return record
  }

  public async uniqueField(qs: { field: string; value: string }) {
    const record = await this.modal.findBy(qs.field, qs.value)

    if (record) {
      return true
    } else {
      return false
    }
  }

  private async populate(populate: Populate, query: ModelQueryBuilderContract<any>) {
    for (const key in populate) {
      const fields = populate[key].fields
      const antoherPopulate = populate[key].populate

      if (fields) {
        await query.preload(key, async (q) => {
          q.select(fields)
          if (antoherPopulate) {
            await this.populate(antoherPopulate, q)
          }
        })
      } else {
        await query.preload(key, async (q) => {
          if (antoherPopulate) {
            await this.populate(antoherPopulate, q)
          }
        })
      }
    }

    return query
  }

  private relationFiler(filter: RelationFilter, query: ModelQueryBuilderContract<any>) {
    for (const key in filter) {
      const element = filter[key]

      if (element.value !== null && element.value !== '') {
        console.log('ren')

        query.whereHas(key, (q) => {
          q.where(element.field, element.value)
          if (element.filter) {
            this.relationFiler(element.filter, q)
          }
        })
      }
    }
  }
}

export default BaseService