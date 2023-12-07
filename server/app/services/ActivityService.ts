import BaseService from './BaseService'
import Activity from 'App/Models/Activity'

class ActivityService extends BaseService<typeof Activity> {}

export default new ActivityService(Activity)
