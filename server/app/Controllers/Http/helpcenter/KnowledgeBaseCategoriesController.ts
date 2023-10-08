import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KnowledgeBaseCategory from 'App/Models/helpcenter/KnowledgeBaseCategory'

export default class KnowledgeBaseCategoriesController {
  public async index({ response, request }: HttpContextContract) {
    const { search, page } = request.qs()

    const query = KnowledgeBaseCategory.query()

    if (search) {
      query.whereLike('name', '%' + search + '%')
    }

    await query.preload('language')

    const categories = await query.paginate(page || 1, 10)

    return response.json({ categories })
  }
}
