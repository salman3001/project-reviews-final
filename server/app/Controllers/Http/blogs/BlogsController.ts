import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Blog from 'App/Models/blogs/Blog'
import BlogValidator from 'App/Validators/blogs/BlogValidator'
import slugify from 'slugify'
import BlogService from 'App/services/blogs/BlogService'
import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'

export default class BlogsController {
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('BlogPolicy').authorize('viewList')
    const qs = request.qs() as any
    const records = await BlogService.index(qs)
    return response.json(records)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('BlogPolicy').authorize('create')
    const { image, blogCategoryId, slug, ...payload } = await request.validate(BlogValidator)

    let blog: null | Blog = null

    if (slug) {
      blog = await BlogService.store({ ...payload, slug })
    } else {
      blog = await BlogService.store({ slug: slugify(payload.title), ...payload })
    }

    if (blogCategoryId) {
      blog.related('category').attach([blogCategoryId])
    }

    if (image) {
      blog.thumbnail = await ResponsiveAttachment.fromFile(image)
    }

    await blog.save()
    return response.json({ message: 'Blog Created' })
  }

  public async show({ params, response, request, bouncer }: HttpContextContract) {
    await bouncer.with('BlogPolicy').authorize('view')

    const qs = request.qs() as any
    const record = await BlogService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('BlogPolicy').authorize('update')

    const { image, blogCategoryId, slug, ...payload } = await request.validate(BlogValidator)

    let blog: null | Blog = null

    if (slug) {
      blog = await BlogService.update(+params.id, { ...payload, slug })
    } else {
      blog = await BlogService.update(+params.id, { slug: slugify(payload.title), ...payload })
    }

    if (blogCategoryId) {
      blog && (await blog.related('category').detach())
      blog && (await blog.related('category').attach([blogCategoryId]))
    }

    if (image) {
      blog.thumbnail = await ResponsiveAttachment.fromFile(image)
    }

    await blog.save()
    return response.json({ message: 'Blog Updated' })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('BlogPolicy').authorize('delete')
    await BlogService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }

  public async uniqueField({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const exist = await BlogService.uniqueField(qs)
    if (exist) {
      return response.badRequest({ message: 'Field is not unique' })
    } else {
      return response.ok({ message: 'Field available' })
    }
  }
}
