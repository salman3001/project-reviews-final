import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Language from 'App/Models/Language'

import Blog from 'App/Models/blogs/Blog'
import BlogCategory from 'App/Models/blogs/BlogCategory'

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

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    const blog = await Blog.query().where('id', +params.id).firstOrFail()
    await blog.delete()
    return response.ok({ message: 'Blog Deleted' })
  }
}
