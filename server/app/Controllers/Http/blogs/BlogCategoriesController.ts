import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BlogCategory from 'App/Models/blogs/BlogCategory'

export default class BlogCategoriesController {
  public async index({ request, response }: HttpContextContract) {
    const { page, categoryId, languageId, isPublished, search } = request.qs()

    const query = BlogCategory.query()

    if (isPublished) {
      query.where('is_published', isPublished)
    }

    if (categoryId) {
      query.whereHas('category', (c) => {
        c.where('blog_category_id', +categoryId)
      })
    }

    if (languageId) {
      query.where('language_id', languageId)
    }

    if (search) {
      query.whereLike('title', '%' + search + '%')
    }

    await query.preload('category', (q) => {
      q.select(['name'])
    })

    await query.preload('language', (q) => {
      q.select(['name'])
    })

    const blogs = await query.paginate(page || 1, 10)
    const blogCategories = await BlogCategory.query().select(['name', 'id'])
    const languages = await Language.query().select(['name', 'id'])

    return response.json({ blogs, blogCategories, languages })
  }

  public async create({ response }: HttpContextContract) {
    const categories = await BlogCategory.query().select(['name', 'id'])
    const languages = await Language.query().select(['name', 'id'])

    response.ok({ languages, categories })
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    const blogCategory = await BlogCategory.query().where('id', +params.id).firstOrFail()
    await blogCategory.delete()
    return response.ok({ message: 'Blog Deleted' })
  }

  public async uniqueTitle({ request, response }: HttpContextContract) {
    const q = request.qs()
    const blogCategory = await BlogCategory.findBy('title', q.field)

    if (blogCategory) {
      return response.badRequest({ message: 'Name Already Taken' })
    } else {
      return response.ok({ message: 'Name Available Available' })
    }
  }

  public async uniqueSlug({ request, response }: HttpContextContract) {
    const q = request.qs()
    const blogCategory = await BlogCategory.findBy('slug', q.field)

    if (blogCategory) {
      return response.badRequest({ message: 'Slug already Taken' })
    } else {
      return response.ok({ message: 'Slug Available' })
    }
  }

  public async uniqueOrder({ request, response }: HttpContextContract) {
    const q = request.qs()
    const blogCategory = await BlogCategory.findBy('order', +q.field)

    if (blogCategory) {
      return response.badRequest({ message: 'Order already Taken' })
    } else {
      return response.ok({ message: 'Order Available' })
    }
  }
}
