import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BlogCategoryValidator from 'App/Validators/blogs/BlogCategoryValidator'
import BlogCategoryService from 'App/services/blogs/BlogCategoryService'
import slugify from 'slugify'

export default class BlogCategoriesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await BlogCategoryService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const { slug, ...payload } = await request.validate(BlogCategoryValidator)

    if (slug) {
      await BlogCategoryService.store({ ...payload, slug })
    } else {
      await BlogCategoryService.store({ slug: slugify(payload.name), ...payload })
    }

    return response.json({ message: 'Blog Created' })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await BlogCategoryService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { slug, ...payload } = await request.validate(BlogCategoryValidator)

    if (slug) {
      await BlogCategoryService.update(+params.id, { ...payload, slug })
    } else {
      await BlogCategoryService.update(+params.id, { slug: slugify(payload.name), ...payload })
    }

    return response.json({ message: 'Blog Updated' })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await BlogCategoryService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }

  public async uniqueField({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const exist = await BlogCategoryService.uniqueField(qs)
    if (exist) {
      return response.badRequest({ message: 'Field is not unique' })
    } else {
      return response.ok({ message: 'Field available' })
    }
  }
}
