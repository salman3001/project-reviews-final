import BaseService from '../BaseService'
import Education from 'App/Models/user/Education'

class EducationService extends BaseService<typeof Education> {}

export default new EducationService(Education)
