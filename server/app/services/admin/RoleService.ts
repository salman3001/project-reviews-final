import BaseService from '../BaseService'
import Role from 'App/Models/adminUser/Role'

class RoleService extends BaseService<typeof Role> {}

export default new RoleService(Role)
