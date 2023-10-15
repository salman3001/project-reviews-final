import BaseService from '../BaseService'
import User from 'App/Models/user/User'

class UserService extends BaseService<typeof User> {}

export default new UserService(User)
