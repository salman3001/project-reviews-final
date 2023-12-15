import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import State from 'App/Models/address/State'
import BaseController from '../BaseController'

export default class StatesController extends BaseController {
  constructor() {
    super(State, {}, {}, 'LocationPolicy')
  }
  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('create')
    const StateSchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
      countryId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: StateSchema })
    const record = await State.create(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('LocationPolicy').authorize('update')
    const state = await State.findOrFail(+params.id)
    const StateSchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
      countryId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: StateSchema })
    state.merge(payload)
    await state.save()
    return response.json({ message: 'record updated', data: state })
  }
}
