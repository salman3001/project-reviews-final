import BaseService from '../BaseService'
import ServiceCategory from 'App/Models/service/ServiceCategory'

class ServiceCategoryService extends BaseService<typeof ServiceCategory> {}

export default new ServiceCategoryService(ServiceCategory)
