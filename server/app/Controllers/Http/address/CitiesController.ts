import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import qs from 'qs'

import CityService from 'App/services/address/CityService'

export default class CitiesController {
  public async index({ request, response }: HttpContextContract) {
    const query = request.qs() as any
    const q = qs.parse(query, { depth: 10 })
    console.log(q?.relationFilter?.state?.filter?.country)
    const records = await CityService.index(q)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const citySchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
      stateId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: citySchema })
    const record = await CityService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await CityService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const citySchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
      stateId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: citySchema })
    const record = await CityService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await CityService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
