import BaseService from '../BaseService'
import Skill from 'App/Models/user/Skill'

class SkillService extends BaseService<typeof Skill> {}

export default new SkillService(Skill)
