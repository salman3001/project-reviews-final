import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceTag from 'App/Models/service/ServiceTag'
import ServiceCategoryCreateValidator from 'App/Validators/service/ServiceCategoryCreateValidator'
import ServiceCategoryUpdateValidator from 'App/Validators/service/ServiceCategoryUpdateValidator'
import ServiceTagService from 'App/services/service/ServiceTagService'

export default class ServiceTagsController {
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('ServicePolicy').authorize('viewList')

    const qs = request.qs() as any
    const records = await ServiceTagService.index(qs)
    return response.json(records)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('ServicePolicy').authorize('create')

    const payload = await request.validate(ServiceCategoryCreateValidator)
    const tag = await ServiceTag.create(payload.category)

    if (payload.seo) {
      await tag.related('seo').create(payload.seo)
    }

    if (payload.faq) {
      await tag.related('faqs').createMany(payload.faq)
    }

    if (payload.image) {
      tag.thumbnail = await ResponsiveAttachment.fromFile(payload.image)
    }
    await tag.save()

    return response.json({ message: 'record created', data: tag })
  }

  public async show({ params, response, request, bouncer }: HttpContextContract) {
    await bouncer.with('ServicePolicy').authorize('view')

    const qs = request.qs() as any
    const record = await ServiceTagService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('ServicePolicy').authorize('update')

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
      tag.thumbnail = await ResponsiveAttachment.fromFile(payload.image)
    }
    await tag.save()

    return response.json({ message: 'record created', data: tag })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('ServicePolicy').authorize('delete')

    await ServiceTagService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
