import BaseService from './BaseService'
import NotificationSetting from 'App/Models/NotificationSetting'

class NotificationSettingService extends BaseService<typeof NotificationSetting> {}

export default new NotificationSettingService(NotificationSetting)
