import {
  BaseModel,
  LucidModel,
  LucidRow,
  ModelPaginatorContract,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PoliciesList } from '@ioc:Adonis/Addons/Bouncer'

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

export default class BaseController {
  constructor(
    public model: LucidModel,
    public storeValidator: any,
    public updateValidator: any,
    private bauncerPolicy?: keyof PoliciesList,
    public perPage?: number
  ) {}

  public async index({ request, response, bouncer }: HttpContextContract) {
    if (bouncer && this.bauncerPolicy) {
      await bouncer.with(this.bauncerPolicy).authorize('viewList')
    }
    const qs = request.qs() as unknown as IndexQs
    let records: ModelPaginatorContract<LucidRow> | LucidRow[] | [] = []
    const query = this.model.query()
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

    return response.json(records)
  }

  public async show({ request, params, response, bouncer }: HttpContextContract) {
    const qs = request.qs() as unknown as { fields: string[]; populate: Populate }
    const id = +params.id

    const query = this.model.query()
    query.where('id', id)

    if (qs?.populate) {
      await this.populate(qs.populate, query)
    }

    if (qs?.fields) {
      query.select(qs?.fields)
    }

    const record = await query.first()

    if (record && bouncer && this.bauncerPolicy) {
      await bouncer.with(this.bauncerPolicy).authorize('view', record)
    }

    return response.json(record)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    if (bouncer && this.bauncerPolicy) {
      await bouncer.with(this.bauncerPolicy).authorize('create')
    }
    const payload = await request.validate(this.storeValidator)
    const record = await this.model.create(payload)
    return response.json({ record })
  }

  public async update({ params, request, response, bouncer }: HttpContextContract) {
    const id = params.id
    const record = await this.model.findOrFail(id)
    if (bouncer && this.bauncerPolicy) {
      await bouncer.with(this.bauncerPolicy).authorize('update', record)
    }
    const payload = await request.validate(this.updateValidator)
    record?.merge(payload)
    await record?.save()
    return response.json({ record })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    const id = params.id
    const record = await this.model.findOrFail(id)
    if (bouncer && this.bauncerPolicy) {
      await bouncer.with(this.bauncerPolicy).authorize('delete', record)
    }

    await record?.delete()
    return response.json({ record })
  }

  public async uniqueField({ response, request }: HttpContextContract) {
    const qs = request.qs() as { field: string; value: string }
    const record = await this.model.findBy(qs.field, qs.value)

    if (record) {
      return response.badRequest({ message: 'Field already exist' })
    } else {
      return response.ok({ message: 'Field Available' })
    }
  }

  public async populate(populate: Populate, query: ModelQueryBuilderContract<any>) {
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

  public relationFiler(filter: RelationFilter, query: ModelQueryBuilderContract<any>) {
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
