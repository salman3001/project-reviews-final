import Continent from 'App/Models/address/Continent'
import BaseService from '../BaseService'

class ContinentService extends BaseService<typeof Continent> {}

export default new ContinentService(Continent)
