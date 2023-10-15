import BaseService from '../BaseService'
import Permission from 'App/Models/adminUser/Permission'

class PermissionService extends BaseService<typeof Permission> {}

export default new PermissionService(Permission)
