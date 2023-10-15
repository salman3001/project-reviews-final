import BaseService from './BaseService'
import Social from 'App/Models/Social'

class SocialService extends BaseService<typeof Social> {}

export default new SocialService(Social)
