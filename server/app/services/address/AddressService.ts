import Address from 'App/Models/address/Address'
import BaseService from '../BaseService'

class AddressService extends BaseService<typeof Address> {}

export default new AddressService(Address)
