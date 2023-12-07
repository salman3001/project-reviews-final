import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ContinentService from 'App/services/address/ContinentService'

export default class ContinentsController {
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('viewList')
    const qs = request.qs() as any
    const records = await ContinentService.index(qs)
    return response.json(records)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('create')
    const continentSchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
    })
    const payload = await request.validate({ schema: continentSchema })
    const record = await ContinentService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('view')
    const qs = request.qs() as any
    const record = await ContinentService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('update')
    const continentSchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
    })
    const payload = await request.validate({ schema: continentSchema })
    const record = await ContinentService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('delete')
    await ContinentService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
