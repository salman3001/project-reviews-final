import BaseService from '../BaseService'
import KnowledgeBaseContent from 'App/Models/helpcenter/KnowledgeBaseContent'

class KnowledgeBaseContentService extends BaseService<typeof KnowledgeBaseContent> {}

export default new KnowledgeBaseContentService(KnowledgeBaseContent)
