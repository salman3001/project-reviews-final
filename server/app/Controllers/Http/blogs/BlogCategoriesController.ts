import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Language from 'App/Models/Language'
import BlogCategory from 'App/Models/blogs/BlogCategory'
import BlogCategoryValidator from 'App/Validators/blogs/BlogCategoryValidator'
import slugify from 'slugify'

export default class BlogCategoriesController {
  public async index({ request, response }: HttpContextContract) {
    const { page, languageId, status, search } = request.qs()

    const query = BlogCategory.query()

    if (status) {
      query.where('status', status === 'true')
    }

    if (languageId) {
      query.where('language_id', languageId)
    }

    if (search) {
      query.whereLike('name', '%' + search + '%')
    }

    await query.preload('language', (q) => {
      q.select(['name'])
    })

    const blogCategories = await query.paginate(page || 1, 10)

    const languages = await Language.query().select(['name', 'id'])

    return response.json({ blogCategories, languages })
  }

  public async create({ response }: HttpContextContract) {
    const languages = await Language.query().select(['name', 'id'])
    response.ok({ languages })
  }

  public async store({ request, response }: HttpContextContract) {
    const { slug, ...payload } = await request.validate(BlogCategoryValidator)

    let category: BlogCategory | null = null

    if (slug) {
      category = await BlogCategory.create({ ...payload, slug })
    } else {
      category = await BlogCategory.create({ slug: slugify(payload.name), ...payload })
    }

    await category.save()

    return response.json({ message: 'Blog Created' })
  }

  public async show({ response, params }: HttpContextContract) {
    const blog = await BlogCategory.findOrFail(+params.id)
    await blog.load('language', (q) => {
      q.select(['name', 'id']).first()
    })
    response.ok(blog)
  }

  public async edit({ response, params }: HttpContextContract) {
    const blog = await BlogCategory.findOrFail(+params.id)
    await blog.load('language', (q) => {
      q.select(['name', 'id']).first()
    })

    const languages = await Language.query().select(['name', 'id'])

    response.ok({ languages, blog })
  }

  public async update({ response, params, request }: HttpContextContract) {
    const category = await BlogCategory.findOrFail(+params.id)
    const { slug, ...payload } = await request.validate(BlogCategoryValidator)

    if (slug) {
      category.merge({ ...payload, slug })
    } else {
      category.merge({ slug: slugify(payload.name), ...payload })
    }

    await category.save()

    return response.json({ message: 'Category updated' })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const blogCategory = await BlogCategory.findOrFail(+params.id)
    await blogCategory.delete()
    return response.ok({ message: 'Category Deleted' })
  }

  public async uniqueName({ request, response }: HttpContextContract) {
    const q = request.qs()
    const blogCategory = await BlogCategory.findBy('name', q.field)

    if (blogCategory) {
      return response.badRequest({ message: 'Name Already Taken' })
    } else {
      return response.ok({ message: 'Name Available' })
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
