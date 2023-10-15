import AdminUser from 'App/Models/adminUser/AdminUser'
import BaseService from '../BaseService'

class AdminUserService extends BaseService<typeof AdminUser> {}

export default new AdminUserService(AdminUser)
