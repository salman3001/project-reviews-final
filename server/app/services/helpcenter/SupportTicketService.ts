import BaseService from '../BaseService'
import SupportTicket from 'App/Models/helpcenter/SupportTicket'

class SupportTicketService extends BaseService<typeof SupportTicket> {}

export default new SupportTicketService(SupportTicket)
