import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KnowledgeBaseCategory from 'App/Models/helpcenter/KnowledgeBaseCategory'

export default class KnowledgeBaseCategoriesController {
  public async index({ response }: HttpContextContract) {
    const content = await KnowledgeBaseCategory.all()
    return response.json({ content })
  }
}
