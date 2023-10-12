import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/address/City'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class CitiesController {
  public async index({ response, request }: HttpContextContract) {
    const { page, search } = request.qs()
    let cities: null | City[] = []
    const query = City.query()

    if (search) {
      query.whereLike('name', '%' + search + '%')
    }

    if (page) {
      cities = await query.paginate(page || 1, 10)
    } else {
      cities = await query.exec()
    }
    return response.ok(cities)
  }

  public async store({ response, request }: HttpContextContract) {
    const citySchema = schema.create({
      name: schema.string({ trim: true }),
      stateId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: citySchema })
    await City.create(payload)
    return response.ok({ message: 'city Created' })
  }

  public async show({}: HttpContextContract) {}

  public async update({ response, request, params }: HttpContextContract) {
    const citySchema = schema.create({
      name: schema.string({ trim: true }),
      stateId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: citySchema })
    const city = await City.findOrFail(+params.id)
    city.merge(payload)
    await city.save()
    return response.ok({ message: 'city updated' })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const city = await City.findOrFail(+params.id)
    await city.delete()
    return response.ok({ message: 'city deleted' })
  }
}
