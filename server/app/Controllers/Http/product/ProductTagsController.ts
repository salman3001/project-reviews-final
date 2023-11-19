import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductTag from 'App/Models/product/ProductTag'
import CategoryCreateValidator from 'App/Validators/product/CategoryCreateValidator'
import CategoryUpdateValidator from 'App/Validators/product/CategoryUpdateValidator'
import ImageService from 'App/services/ImageService'
import ProductTagService from 'App/services/product/ProductTagService'

export default class ProductTagsController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await ProductTagService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CategoryCreateValidator)
    const tag = await ProductTag.create(payload.category)

    if (payload.seo) {
      await tag.related('seo').create(payload.seo)
    }

    if (payload.faq) {
      await tag.related('faqs').createMany(payload.faq)
    }

    if (payload.image) {
      const img = await ImageService.store(payload.image, `/product-tags/`, 'thumb')
      await tag.related('thumbnail').save(img)
    }

    return response.json({ message: 'record created', data: tag })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await ProductTagService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(CategoryUpdateValidator)
    const tag = await ProductTag.findOrFail(+params.id)

    if (payload.category) {
      tag.merge(payload.category)
      await tag.save()
    }

    if (payload.seo) {
      await tag.load('seo')
      if (tag.seo) {
        tag.seo.merge(payload.seo)
        await tag.seo.save()
      } else {
        await tag.related('seo').create(payload.seo)
      }
    }

    if (payload.faq) {
      await tag.load('faqs')
      if (tag.faqs) {
        for (const f of tag.faqs) {
          await f.delete()
        }
      }
      await tag.related('faqs').createMany(payload.faq)
    }

    if (payload.image) {
      await tag.load('thumbnail')
      if (tag.thumbnail) {
        await ImageService.destroy(tag.thumbnail.id)
      }
      const img = await ImageService.store(payload.image, `/product-category/`, 'thumb')

      await tag.related('thumbnail').save(img)
    }

    return response.json({ message: 'record created', data: tag })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const tag = await ProductTag.findOrFail(+params.id)
    await tag.load('thumbnail')
    if (tag.thumbnail) {
      await ImageService.destroy(tag.thumbnail.id)
    }
    await ProductTagService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
