import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image'
import Language from 'App/Models/Language'

import Blog from 'App/Models/blogs/Blog'
import BlogCategory from 'App/Models/blogs/BlogCategory'
import BlogValidator from 'App/Validators/blogs/BlogValidator'
import slugify from 'slugify'

export default class BlogsController {
  public async index({ request, response }: HttpContextContract) {
    const { page, categoryId, languageId, isPublished, search } = request.qs()

    const query = Blog.query()

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

  public async store({ request, response }: HttpContextContract) {
    const { image, blogCategoryId, slug, ...payload } = await request.validate(BlogValidator)

    const blog = new Blog()

    if (slug) {
      blog.merge({ ...payload })
    } else {
      blog.merge({ slug: slugify(payload.title), ...payload })
    }

    if (blogCategoryId) {
      blog.related('category').attach([blogCategoryId])
    }

    if (image) {
      await image.moveToDisk('./blogs', {
        name: blog.title + Date.now() + '.' + image.extname,
      })
      const imageName = image?.fileName
      const createdimage = await Image.create({ url: '/blogs/' + imageName })
      await blog.related('image').save(createdimage)
    }

    await blog.save()

    return response.json({ message: 'Blog Created' })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    const blog = await Blog.query().where('id', +params.id).firstOrFail()
    await blog.delete()
    return response.ok({ message: 'Blog Deleted' })
  }

  public async uniqueTitle({ request, response }: HttpContextContract) {
    const q = request.qs()
    const blog = await Blog.findBy('title', q.field)

    if (blog) {
      return response.badRequest({ message: 'Name Already Taken' })
    } else {
      return response.ok({ message: 'Name Available Available' })
    }
  }

  public async uniqueSlug({ request, response }: HttpContextContract) {
    const q = request.qs()
    const blog = await Blog.findBy('slug', q.field)

    if (blog) {
      return response.badRequest({ message: 'Slug already Taken' })
    } else {
      return response.ok({ message: 'Slug Available' })
    }
  }
}
