import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Language from 'App/Models/Language'
import KnowledgeBaseCategory from 'App/Models/helpcenter/KnowledgeBaseCategory'
import KnowledgeBaseContent from 'App/Models/helpcenter/KnowledgeBaseContent'
import HelpcenterContentValidator from 'App/Validators/helpcenter/HelpcenterContentValidator'
import slugify from 'slugify'

export default class KnowledgeBaseContentsController {
  public async index({ response, request }: HttpContextContract) {
    const { categoryId, search, page, isActive } = request.qs()

    const query = KnowledgeBaseContent.query()

    if (search) {
      query.whereLike('title', '%' + search + '%')
    }

    if (categoryId) {
      query.whereHas('category', (q) => {
        q.where('id', categoryId)
      })
    }

    if (isActive) {
      query.where('is_active', +isActive)
    }

    await query.preload('language').preload('category')

    const content = await query.paginate(page || 1, 10)
    const categories = await KnowledgeBaseCategory.all()

    return response.json({ content, categories })
  }

  public async create({ response }: HttpContextContract) {
    const categories = await KnowledgeBaseCategory.query().select(['name', 'id'])
    const languages = await Language.query().select(['name', 'id'])
    return response.ok({ categories, languages })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(HelpcenterContentValidator)
    const { slug, ...restPayload } = payload

    try {
      if (slug) {
        await KnowledgeBaseContent.create(payload)
      } else {
        await KnowledgeBaseContent.create({ ...restPayload, slug: slugify(payload.title) })
      }
      return response.created({ message: 'Content Created' })
    } catch (error) {
      console.log(error)

      return response.abort({ message: 'Something went wrong' })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const content = await KnowledgeBaseContent.query()
      .where('id', +params.id)
      .preload('category', (q) => {
        q.select(['name'])
      })
      .preload('language', (q) => {
        q.select(['name'])
      })
      .first()

    return response.ok(content)
  }

  public async edit({ response, params }: HttpContextContract) {
    const content = await KnowledgeBaseContent.query()
      .where('id', +params.id)
      .preload('category', (ct) => {
        ct.select(['id'])
      })
      .first()
    const categories = await KnowledgeBaseCategory.query().select(['name', 'id'])
    const languages = await Language.query().select(['name', 'id'])
    return response.ok({ content, categories, languages })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(HelpcenterContentValidator)
    const content = await KnowledgeBaseContent.findOrFail(+params.id)

    try {
      content.merge(payload)
      await content.save()
      return response.ok({ message: 'Content updated' })
    } catch (error) {
      return response.abort({ message: 'Something went wrong' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const content = await KnowledgeBaseContent.findOrFail(+params.id)
    await content.delete()
    return response.ok({ message: 'Content deleted' })
  }

  public async uniqueTitle({ request, response }: HttpContextContract) {
    const q = request.qs()
    const content = await KnowledgeBaseContent.findBy('title', q.field)

    if (content) {
      return response.badRequest({ message: 'Title Already Taken' })
    } else {
      return response.ok({ message: 'Title Available Available' })
    }
  }

  public async uniqueSlug({ request, response }: HttpContextContract) {
    const q = request.qs()
    const content = await KnowledgeBaseContent.findBy('slug', q.field)

    if (content) {
      return response.badRequest({ message: 'Slug already Taken' })
    } else {
      return response.ok({ message: 'Slug Available' })
    }
  }

  public async uniqueOrder({ request, response }: HttpContextContract) {
    const q = request.qs()
    const content = await KnowledgeBaseContent.findBy('order', +q.field)

    if (content) {
      return response.badRequest({ message: 'Order already Taken' })
    } else {
      return response.ok({ message: 'Order Available' })
    }
  }
}
