import Street from 'App/Models/address/Street'
import BaseService from '../BaseService'

class StreetService extends BaseService<typeof Street> {}

export default new StreetService(Street)
