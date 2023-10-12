import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import State from 'App/Models/address/State'

export default class StatesController {
  public async index({ response, request }: HttpContextContract) {
    const { page, search } = request.qs()
    let states: null | State[] = []
    const query = State.query()

    if (search) {
      query.whereLike('name', '%' + search + '%')
    }

    if (page) {
      states = await query.paginate(page || 1, 10)
    } else {
      states = await query.exec()
    }

    return response.ok(states)
  }

  public async store({ response, request }: HttpContextContract) {
    const StateSchema = schema.create({
      name: schema.string({ trim: true }),
      countryId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: StateSchema })
    await State.create(payload)
    return response.ok({ message: 'State Created' })
  }

  public async show({}: HttpContextContract) {}

  public async update({ response, request, params }: HttpContextContract) {
    const StateSchema = schema.create({
      name: schema.string({ trim: true }),
      countryId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: StateSchema })
    const state = await State.findOrFail(+params.id)
    state.merge(payload)
    await state.save()
    return response.ok({ message: 'State updated' })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const state = await State.findOrFail(+params.id)
    await state.delete()
    return response.ok({ message: 'State deleted' })
  }
}
