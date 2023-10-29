import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Blog from 'App/Models/blogs/Blog'
import BlogValidator from 'App/Validators/blogs/BlogValidator'
import slugify from 'slugify'
import BlogService from 'App/services/blogs/BlogService'
import ImageService from 'App/services/ImageService'

export default class BlogsController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await BlogService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    console.log(request.file('image'))

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
      const createdImage = await ImageService.store(image, '/blogs/', 'blog')
      await blog.related('image').save(createdImage)
    }

    return response.json({ message: 'Blog Created' })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await BlogService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
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
      await blog?.load('image')
      if (blog?.image) {
        await ImageService.destroy(blog.image.id)
        await blog.image.delete()
      }
      const createdImage = await ImageService.store(image, '/blogs/', 'blog')
      blog && (await blog.related('image').save(createdImage))
    }

    return response.json({ message: 'Blog Updated' })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const blog = await BlogService.show(+params.id)
    if (blog) {
      await blog.load('image')
      if (blog.image) {
        await blog.image.delete()
      }
      await blog.delete()
    }
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
