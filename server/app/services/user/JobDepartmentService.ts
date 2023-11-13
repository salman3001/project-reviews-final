import JobDepartment from 'App/Models/user/JobDepartment'
import BaseService from '../BaseService'

class JobDepartmentService extends BaseService<typeof JobDepartment> {}

export default new JobDepartmentService(JobDepartment)
