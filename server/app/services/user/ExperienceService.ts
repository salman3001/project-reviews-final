import BaseService from '../BaseService'
import Experience from 'App/Models/user/Experience'

class ExperienceService extends BaseService<typeof Experience> {}

export default new ExperienceService(Experience)
