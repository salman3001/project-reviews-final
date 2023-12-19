import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BlogCategoryValidator from 'App/Validators/blogs/BlogCategoryValidator'
import slugify from 'slugify'
import BlogCategory from 'App/Models/blogs/BlogCategory'
import BaseController from '../BaseController'

export default class BlogCategoriesController extends BaseController {
  constructor() {
    super(BlogCategory, BlogCategoryValidator, BlogCategoryValidator, 'BlogPolicy')
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('BlogPolicy').authorize('create')
    const { slug, ...payload } = await request.validate(BlogCategoryValidator)

    if (slug) {
      await BlogCategory.create({ ...payload, slug })
    } else {
      await BlogCategory.create({ slug: slugify(payload.name), ...payload })
    }

    return response.json({ message: 'Blog Created' })
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('BlogPolicy').authorize('update')
    const { slug, ...payload } = await request.validate(this.updateValidator)
    const category = await BlogCategory.findOrFail(+params.id)

    if (slug) {
      category.merge({ ...payload, slug })
    } else {
      category.merge({ slug: slugify(payload.name), ...payload })
    }
    await category.save()

    return response.json({ message: 'Blog Updated' })
  }
}
