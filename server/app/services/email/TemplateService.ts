import BaseService from '../BaseService'
import Template from 'App/Models/email/Template'

class TemplateService extends BaseService<typeof Template> {}

export default new TemplateService(Template)
