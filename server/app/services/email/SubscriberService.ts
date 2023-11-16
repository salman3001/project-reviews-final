import Subscriber from 'App/Models/email/Subscriber'
import BaseService from '../BaseService'

class SubscriberService extends BaseService<typeof Subscriber> {}

export default new SubscriberService(Subscriber)
