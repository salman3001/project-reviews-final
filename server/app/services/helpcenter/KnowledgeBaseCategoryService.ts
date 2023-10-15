import BaseService from '../BaseService'
import KnowledgeBaseCategory from 'App/Models/helpcenter/KnowledgeBaseCategory'

class KnowledgeBaseCategoryService extends BaseService<typeof KnowledgeBaseCategory> {}

export default new KnowledgeBaseCategoryService(KnowledgeBaseCategory)
