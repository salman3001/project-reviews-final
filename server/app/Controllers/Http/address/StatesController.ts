import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import StateService from 'App/services/address/StateService'

export default class StatesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await StateService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const StateSchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
      countryId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: StateSchema })
    const record = await StateService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await StateService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const StateSchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
      countryId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: StateSchema })
    const record = await StateService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await StateService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
