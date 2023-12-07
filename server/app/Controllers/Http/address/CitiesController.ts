import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import qs from 'qs'

import CityService from 'App/services/address/CityService'

export default class CitiesController {
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('viewList')
    const query = request.qs() as any
    const q = qs.parse(query, { depth: 10 })
    const records = await CityService.index(q)
    return response.json(records)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('create')
    const citySchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
      stateId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: citySchema })
    const record = await CityService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('view')
    const qs = request.qs() as any
    const record = await CityService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('update')
    const citySchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
      stateId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: citySchema })
    const record = await CityService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('delete')
    await CityService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
