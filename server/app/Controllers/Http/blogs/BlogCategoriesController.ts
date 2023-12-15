import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BlogCategoryValidator from 'App/Validators/blogs/BlogCategoryValidator'
import BlogCategoryService from 'App/services/blogs/BlogCategoryService'
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
      await BlogCategoryService.store({ ...payload, slug })
    } else {
      await BlogCategoryService.store({ slug: slugify(payload.name), ...payload })
    }

    return response.json({ message: 'Blog Created' })
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('BlogPolicy').authorize('update')
    const { slug, ...payload } = await request.validate(this.updateValidator)

    if (slug) {
      await BlogCategoryService.update(+params.id, { ...payload, slug })
    } else {
      await BlogCategoryService.update(+params.id, { slug: slugify(payload.name), ...payload })
    }

    return response.json({ message: 'Blog Updated' })
  }
}
