import BaseService from '../BaseService'
import Service from 'App/Models/service/Service'

class ServiceService extends BaseService<typeof Service> {}

export default new ServiceService(Service)
