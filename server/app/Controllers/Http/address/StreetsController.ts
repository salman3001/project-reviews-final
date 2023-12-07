import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import StreetService from 'App/services/address/StreetService'

export default class StreetsController {
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('viewList')
    const qs = request.qs() as any
    const records = await StreetService.index(qs)
    return response.json(records)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('create')
    const streetSchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
      cityId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: streetSchema })
    const record = await StreetService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('view')

    const qs = request.qs() as any
    const record = await StreetService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('update')

    const streetSchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
      cityId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: streetSchema })
    const record = await StreetService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('delete')

    await StreetService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
