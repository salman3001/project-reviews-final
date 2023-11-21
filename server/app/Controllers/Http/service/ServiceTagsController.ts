import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceTag from 'App/Models/service/ServiceTag'
import ServiceCategoryCreateValidator from 'App/Validators/service/ServiceCategoryCreateValidator'
import ServiceCategoryUpdateValidator from 'App/Validators/service/ServiceCategoryUpdateValidator'
import ImageService from 'App/services/ImageService'
import ServiceTagService from 'App/services/service/ServiceTagService'

export default class ServiceTagsController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await ServiceTagService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(ServiceCategoryCreateValidator)
    const tag = await ServiceTag.create(payload.category)

    if (payload.seo) {
      await tag.related('seo').create(payload.seo)
    }

    if (payload.faq) {
      await tag.related('faqs').createMany(payload.faq)
    }

    if (payload.image) {
      const img = await ImageService.store(payload.image, `/service-tags/`, 'thumb')
      await tag.related('thumbnail').save(img)
    }

    return response.json({ message: 'record created', data: tag })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await ServiceTagService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(ServiceCategoryUpdateValidator)
    const tag = await ServiceTag.findOrFail(+params.id)

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
      const img = await ImageService.store(payload.image, `/service-category/`, 'thumb')

      await tag.related('thumbnail').save(img)
    }

    return response.json({ message: 'record created', data: tag })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const tag = await ServiceTag.findOrFail(+params.id)
    await tag.load('thumbnail')
    if (tag.thumbnail) {
      await ImageService.destroy(tag.thumbnail.id)
    }
    await ServiceTagService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
