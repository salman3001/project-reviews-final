import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Continent from 'App/Models/address/Continent'

export default class ContinentsController {
  public async index({ response, request }: HttpContextContract) {
    const { page, search } = request.qs()
    let continents: null | Continent[] = []
    const query = Continent.query()

    if (search) {
      query.whereLike('name', '%' + search + '%')
    }

    if (page) {
      continents = await query.paginate(page || 1, 10)
    } else {
      continents = await query.exec()
    }

    return response.ok(continents)
  }

  public async store({ response, request }: HttpContextContract) {
    const continentSchema = schema.create({
      name: schema.string({ trim: true }),
    })
    const payload = await request.validate({ schema: continentSchema })
    await Continent.create(payload)
    return response.ok({ message: 'Continent Created' })
  }

  public async show({ response, params }: HttpContextContract) {
    const continent = await Continent.findOrFail(+params.id)
    return response.ok(continent)
  }

  public async update({ response, request, params }: HttpContextContract) {
    const continentSchema = schema.create({
      name: schema.string({ trim: true }),
    })
    const payload = await request.validate({ schema: continentSchema })
    const continent = await Continent.findOrFail(+params.id)
    continent.merge(payload)
    await continent.save()
    return response.ok({ message: 'Continent updated' })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const continent = await Continent.findOrFail(+params.id)
    await continent.delete()
    return response.ok({ message: 'Continent deleted' })
  }
}
