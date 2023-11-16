import BaseService from '../BaseService'
import Interest from 'App/Models/email/Interest'

class InterestService extends BaseService<typeof Interest> {}

export default new InterestService(Interest)
