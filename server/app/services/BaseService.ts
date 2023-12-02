import {
  LucidModel,
  LucidRow,
  ModelPaginatorContract,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'

type Populate = Record<string, { fields: string[]; populate: Populate }>
type Search = Record<string, string> | null
type Filter = Record<string, string> | null
type RelationFilter = Record<string, { field: string; value: string; filter: RelationFilter }>

export interface IndexQs {
  page: number | null
  rowsPerPage: string | null
  sortBy: string | null
  descending: boolean | null
  search: Search | null
  filter: Filter | null
  relationFilter: RelationFilter | null
  populate: Populate | null
  fields: string[] | null
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
      this.relationFiler(qs.relationFilter, query)
    }

    if (qs.sortBy) {
      if (qs.descending === true) {
        query.orderBy(qs.sortBy, 'desc')
      } else if (qs.descending === false) {
        query.orderBy(qs.sortBy, 'asc')
      }
    }

    if (qs.populate) {
      await this.populate(qs.populate, query)
    }

    if (qs.filter) {
      for (const key in qs.filter) {
        const element = qs.filter[key]
        if (element !== null) {
          query.where(key, element)
        }
      }
    }

    if (qs.search) {
      let i = 0

      query.where((b) => {
        for (const key in qs.search) {
          const element = qs.search[key]
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
      records = await query.paginate(qs.page, Number(qs?.rowsPerPage) || this.perPage)
    } else {
      records = await query.exec()
    }

    return records
  }

  public async show(id: number, qs?: { fields: string[]; populate: Populate }) {
    const query = this.modal.query()
    if (qs?.populate) {
      await this.populate(qs.populate, query)
    }

    query.where('id', id)

    if (qs?.fields) {
      query.select(qs?.fields)
    }

    return await query.first()
  }

  public async store(payload: any) {
    const record = await this.modal.create(payload)
    return record
  }

  public async update(id: number, payload: any) {
    const record = await this.modal.findOrFail(id)
    record?.merge(payload)
    await record?.save()
    return record
  }

  public async destroy(id: number) {
    const record = await this.modal.findOrFail(id)
    await record?.delete()
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
        query.preload(key, (q) => {
          q.select(fields)
          if (antoherPopulate) {
            this.populate(antoherPopulate, q)
          }
        })
      } else {
        query.preload(key, (q) => {
          if (antoherPopulate) {
            this.populate(antoherPopulate, q)
          }
        })
      }
    }

    return query
  }

  private relationFiler(filter: RelationFilter, query: ModelQueryBuilderContract<any>) {
    for (const key in filter) {
      const element = filter[key]

      if (element.value !== null && element.value !== '' && element.value !== undefined) {
        query.whereHas(key, (q) => {
          q.where(element.field, element.value)
          if (element.filter) {
            this.relationFiler(element.filter, q)
          }
        })
      } else if (element.filter) {
        query.whereHas(key, (q) => {
          if (element.filter) {
            this.relationFiler(element.filter, q)
          }
        })
      }
    }
  }
}

export default BaseService
