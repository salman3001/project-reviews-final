import BaseService from '../BaseService'
import ContactMessage from 'App/Models/helpcenter/ContactMessage'

class ContactMessageService extends BaseService<typeof ContactMessage> {}

export default new ContactMessageService(ContactMessage)
