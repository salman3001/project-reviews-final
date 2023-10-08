import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KnowledgeBaseCategory from 'App/Models/helpcenter/KnowledgeBaseCategory'

import KnowledgeBaseContent from 'App/Models/helpcenter/KnowledgeBaseContent'

export default class KnowledgeBaseContentsController {
  public async index({ response, request }: HttpContextContract) {
    const { orderBy, categoryId, search, page } = request.qs()

    const query = KnowledgeBaseContent.query()

    if (search) {
      query.whereLike('title', '%' + search + '%')
    }

    if (categoryId) {
      query.whereHas('category', (q) => {
        q.where('id', categoryId)
      })
    }

    await query.preload('language').preload('category')

    const content = await query.paginate(page || 1, 10)
    const categories = await KnowledgeBaseCategory.all()

    return response.json({ content, categories })
  }
}
