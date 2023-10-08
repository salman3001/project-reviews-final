import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Language from 'App/Models/Language'
import KnowledgeBaseCategory from 'App/Models/helpcenter/KnowledgeBaseCategory'
import HelpcenterContentCategoryValidator from 'App/Validators/helpcenter/HelpcenterContentCategoryValidator'
import slugify from 'slugify'

export default class KnowledgeBaseCategoriesController {
  public async index({ response, request }: HttpContextContract) {
    const { search, page, isActive } = request.qs()

    const query = KnowledgeBaseCategory.query()

    if (search) {
      query.whereLike('name', '%' + search + '%')
    }

    if (isActive) {
      query.where('is_active', +isActive)
    }

    await query.preload('language')

    const categories = await query.paginate(page || 1, 10)

    return response.json({ categories })
  }

  public async create({ response }: HttpContextContract) {
    const languages = await Language.query().select(['name', 'id'])
    return response.ok(languages)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(HelpcenterContentCategoryValidator)
    const { slug, ...restPayload } = payload

    try {
      if (slug) {
        await KnowledgeBaseCategory.create(payload)
      } else {
        await KnowledgeBaseCategory.create({ ...restPayload, slug: slugify(payload.name) })
      }
      return response.created({ message: 'Content Created' })
    } catch (error) {
      console.log(error)
      return response.abort({ message: 'Something went wrong' })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const content = await KnowledgeBaseCategory.query()
      .where('id', +params.id)
      .preload('language', (q) => {
        q.select(['name'])
      })
      .first()

    return response.ok(content)
  }

  public async edit({ response, params }: HttpContextContract) {
    const category = await KnowledgeBaseCategory.query().where('id', +params.id).first()
    const languages = await Language.query().select(['name', 'id'])
    return response.ok({ category, languages })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(HelpcenterContentCategoryValidator)
    const content = await KnowledgeBaseCategory.findOrFail(+params.id)

    try {
      content.merge(payload)
      await content.save()
      return response.ok({ message: 'Category updated' })
    } catch (error) {
      return response.abort({ message: 'Something went wrong' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const content = await KnowledgeBaseCategory.findOrFail(+params.id)
    await content.delete()
    return response.ok({ message: 'Category deleted' })
  }

  public async uniqueName({ request, response }: HttpContextContract) {
    const q = request.qs()
    const category = await KnowledgeBaseCategory.findBy('name', q.field)

    if (category) {
      return response.badRequest({ message: 'Name Already Taken' })
    } else {
      return response.ok({ message: 'Name Available Available' })
    }
  }

  public async uniqueSlug({ request, response }: HttpContextContract) {
    const q = request.qs()
    const category = await KnowledgeBaseCategory.findBy('slug', q.field)

    if (category) {
      return response.badRequest({ message: 'Slug already Taken' })
    } else {
      return response.ok({ message: 'Slug Available' })
    }
  }

  public async uniqueOrder({ request, response }: HttpContextContract) {
    const q = request.qs()
    const category = await KnowledgeBaseCategory.findBy('order', +q.field)

    if (category) {
      return response.badRequest({ message: 'Order already Taken' })
    } else {
      return response.ok({ message: 'Order Available' })
    }
  }
}
