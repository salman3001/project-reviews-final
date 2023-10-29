import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import CountryService from 'App/services/address/CountryService'

export default class CountriesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await CountryService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const countrySchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
      continentId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: countrySchema })
    const record = await CountryService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await CountryService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const countrySchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
      continentId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: countrySchema })
    const record = await CountryService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await CountryService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
