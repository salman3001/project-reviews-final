import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Blog from 'App/Models/blogs/Blog'

export default class BlogsController {
  public async index({ request, response }: HttpContextContract) {
    const { page, catgeoryId, languageId, isPublished, search } = request.qs()

    const query = Blog.query()

    if (isPublished) {
      query.where('is_published', isPublished)
    }

    if (catgeoryId) {
      query.whereHas('category', (q) => {
        q.where('id', catgeoryId)
      })
    }

    if (languageId) {
      query.where('language_id', languageId)
    }

    if (search) {
      query.whereILike('title', '%' + search + '%')
    }

    await query.preload('category', (q) => {
      q.select(['name'])
    })

    const blog = await query.paginate(page || 1, 10)

    return response.json(blog)
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
