import Country from 'App/Models/address/Country'
import BaseService from '../BaseService'

class CountryService extends BaseService<typeof Country> {}

export default new CountryService(Country)
