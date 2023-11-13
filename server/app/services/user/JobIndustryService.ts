import BaseService from '../BaseService'
import JobIndustry from 'App/Models/user/JobIndustry'

class JobIndustryService extends BaseService<typeof JobIndustry> {}

export default new JobIndustryService(JobIndustry)
