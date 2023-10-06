import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/address/City'
import Continent from 'App/Models/address/Continent'
import Country from 'App/Models/address/Country'
import State from 'App/Models/address/State'
import Street from 'App/Models/address/Street'

export default class AddressesController {
  public async getContinents({ response }: HttpContextContract) {
    const continents = await Continent.all()

    response.json({ continents })
  }

  public async getCountries({ response, request }: HttpContextContract) {
    const continentId = request.qs().continentId
    const countries = await Country.query().where('continentId', continentId)

    response.json({ countries })
  }

  public async getStates({ response, request }: HttpContextContract) {
    const countryId = request.qs().countryId
    const states = await State.query().where('countryId', countryId)

    response.json({ states })
  }

  public async getCities({ response, request }: HttpContextContract) {
    const stateId = request.qs().stateId
    const cities = await City.query().where('stateId', stateId)

    response.json({ cities })
  }

  public async getStreets({ response, request }: HttpContextContract) {
    const cityId = request.qs().cityId
    const streets = await Street.query().where('cityId', cityId)

    response.json({ streets })
  }
}
