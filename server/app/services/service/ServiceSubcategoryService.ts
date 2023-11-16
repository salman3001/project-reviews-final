import ServiceSubcategory from 'App/Models/service/ServiceSubcategory'
import BaseService from '../BaseService'

class ServiceSubcategoryService extends BaseService<typeof ServiceSubcategory> {}

export default new ServiceSubcategoryService(ServiceSubcategory)
