import BaseService from '../BaseService'
import Campaign from 'App/Models/email/Campaign'

class CampaignService extends BaseService<typeof Campaign> {}

export default new CampaignService(Campaign)
