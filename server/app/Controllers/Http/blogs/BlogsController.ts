import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Blog from 'App/Models/blogs/Blog'
import BlogValidator from 'App/Validators/blogs/BlogValidator'
import slugify from 'slugify'
import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import BaseController from '../BaseController'
import { validator } from '@ioc:Adonis/Core/Validator'

export default class BlogsController extends BaseController {
  constructor() {
    super(Blog, BlogValidator, BlogValidator, 'BlogPolicy')
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('BlogPolicy').authorize('create')
    const { image, blogCategoryId, slug, ...payload } = await request.validate(BlogValidator)

    let blog: null | Blog = null

    if (slug) {
      blog = await Blog.create({ ...payload, slug })
    } else {
      blog = await Blog.create({ slug: slugify(payload.title), ...payload })
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

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('BlogPolicy').authorize('update')

    const blog = await Blog.findOrFail(+params.id)

    const { image, blogCategoryId, slug, ...payload } = await request.validate(BlogValidator)

    if (slug) {
      blog.merge({ ...payload, slug })
      await blog.save()
    } else {
      blog.merge({ slug: slugify(payload.title), ...payload })
      await blog.save()
    }

    if (blogCategoryId) {
      await blog.related('category').detach()
      await blog.related('category').attach([blogCategoryId])
    }

    if (image) {
      blog.thumbnail = await ResponsiveAttachment.fromFile(image)
    }

    await blog.save()
    return response.json({ message: 'Blog Updated' })
  }

  public excludeIncludeExportProperties(record: any) {
    const { createdAt, updatedAt, ...rest } = record
    return rest
  }

  public async storeExcelData(data: any, ctx: HttpContextContract): Promise<void> {
    const validatedData = await validator.validate({
      schema: new BlogValidator(ctx).schema,
      data,
    })
    await Blog.updateOrCreate(
      { id: validatedData.id },
      {
        ...validatedData,
        slug: validatedData.slug ? slugify(validatedData.slug) : slugify(validatedData.title),
      }
    )
  }
}
