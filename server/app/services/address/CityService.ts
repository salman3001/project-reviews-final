import City from 'App/Models/address/City'
import BaseService from '../BaseService'

class CityService extends BaseService<typeof City> {}

export default new CityService(City)
