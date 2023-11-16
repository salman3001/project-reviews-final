import CampaignType from 'App/Models/email/CampaignType'
import BaseService from '../BaseService'

class CampaignTypeService extends BaseService<typeof CampaignType> {}

export default new CampaignTypeService(CampaignType)
