import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Country from 'App/Models/address/Country'
import { schema } from '@ioc:Adonis/Core/Validator'
import Continent from 'App/Models/address/Continent'

export default class CountriesController {
  public async index({ response, request }: HttpContextContract) {
    const { page, search } = request.qs()
    let Countries: null | Country[] = []
    const query = Country.query().preload('continent', (q) => {
      q.select(['name'])
    })

    if (search) {
      query.whereLike('name', '%' + search + '%')
    }

    if (page) {
      Countries = await query.paginate(page || 1, 10)
    } else {
      Countries = await query.exec()
    }

    return response.ok(Countries)
  }

  public async create({ response }: HttpContextContract) {
    const continents = await Continent.query().select(['name', 'id'])
    return response.ok(continents)
  }

  public async store({ response, request }: HttpContextContract) {
    const countrySchema = schema.create({
      name: schema.string({ trim: true }),
      continetId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: countrySchema })
    await Country.create(payload)
    return response.ok({ message: 'Country Created' })
  }

  public async show({}: HttpContextContract) {}

  public async edit({ response, params }: HttpContextContract) {
    const contry = await Country.findOrFail(+params.id)
    const continent = await Continent.query().select(['name', 'id'])
    return response.ok({ contry, continent })
  }

  public async update({ response, request, params }: HttpContextContract) {
    const countrySchema = schema.create({
      name: schema.string({ trim: true }),
      continetId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: countrySchema })
    const country = await Country.findOrFail(+params.id)
    country.merge(payload)
    await country.save()
    return response.ok({ message: 'country updated' })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const country = await Country.findOrFail(+params.id)
    await country.delete()
    return response.ok({ message: 'country deleted' })
  }
}
