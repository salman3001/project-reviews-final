import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Country from 'App/Models/address/Country'
import { schema } from '@ioc:Adonis/Core/Validator'
import Continent from 'App/Models/address/Continent'

export default class CountriesController {
  public async index({ response, request }: HttpContextContract) {
    const { page, search, continentId } = request.qs()
    let countries: null | Country[] = []
    const query = Country.query().preload('continent', (q) => {
      q.select(['name'])
    })

    if (search) {
      query.whereLike('name', '%' + search + '%')
    }

    if (continentId) {
      query.whereHas('continent', (q) => {
        q.where('id', continentId)
      })
    }

    if (page) {
      countries = await query.paginate(page || 1, 10)
    } else {
      countries = await query.exec()
    }

    const continents = await Continent.query().select(['name', 'id'])

    return response.ok({ countries, continents })
  }

  public async create({ response }: HttpContextContract) {
    const continents = await Continent.query().select(['name', 'id'])
    return response.ok(continents)
  }

  public async store({ response, request }: HttpContextContract) {
    const countrySchema = schema.create({
      name: schema.string({ trim: true }),
      continentId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: countrySchema })
    await Country.create(payload)
    return response.ok({ message: 'Country Created' })
  }

  public async show({}: HttpContextContract) {}

  public async edit({ response, params }: HttpContextContract) {
    const country = await Country.findOrFail(+params.id)
    const continents = await Continent.query().select(['name', 'id'])
    return response.ok({ country, continents })
  }

  public async update({ response, request, params }: HttpContextContract) {
    const countrySchema = schema.create({
      name: schema.string({ trim: true }),
      continentId: schema.number.optional(),
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
