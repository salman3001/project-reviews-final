import ServiceTag from 'App/Models/service/ServiceTag'
import BaseService from '../BaseService'

class ServiceTagService extends BaseService<typeof ServiceTag> {}

export default new ServiceTagService(ServiceTag)
