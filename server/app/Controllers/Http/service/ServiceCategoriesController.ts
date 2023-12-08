import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceCategory from 'App/Models/service/ServiceCategory'
import ServiceCategoryCreateValidator from 'App/Validators/service/ServiceCategoryCreateValidator'
import ServiceCategoryUpdateValidator from 'App/Validators/service/ServiceCategoryUpdateValidator'
import ServiceCategoryService from 'App/services/service/ServiceCategoryService'

export default class ServiceCategoriesController {
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('ServicePolicy').authorize('viewList')

    const qs = request.qs() as any
    const records = await ServiceCategoryService.index(qs)
    return response.json(records)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('ServicePolicy').authorize('create')

    const payload = await request.validate(ServiceCategoryCreateValidator)
    const category = await ServiceCategory.create(payload.category)

    if (payload.seo) {
      await category.related('seo').create(payload.seo)
    }

    if (payload.faq) {
      await category.related('faqs').createMany(payload.faq)
    }

    if (payload.image) {
      category.thumbnail = await ResponsiveAttachment.fromFile(payload.image)
    }
    await category.save()

    return response.json({ message: 'record created', data: category })
  }

  public async show({ params, response, request, bouncer }: HttpContextContract) {
    await bouncer.with('ServicePolicy').authorize('view')

    const qs = request.qs() as any
    const record = await ServiceCategoryService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('ServicePolicy').authorize('update')
    const payload = await request.validate(ServiceCategoryUpdateValidator)
    const category = await ServiceCategory.findOrFail(+params.id)

    if (payload.category) {
      category.merge(payload.category)
      await category.save()
    }

    if (payload.seo) {
      await category.load('seo')
      if (category.seo) {
        category.seo.merge(payload.seo)
        await category.seo.save()
      } else {
        await category.related('seo').create(payload.seo)
      }
    }

    if (payload.faq) {
      await category.load('faqs')
      if (category.faqs) {
        for (const f of category.faqs) {
          await f.delete()
        }
      }
      await category.related('faqs').createMany(payload.faq)
    }

    if (payload.image) {
      category.thumbnail = await ResponsiveAttachment.fromFile(payload.image)
    }
    await category.save()

    return response.json({ message: 'record created', data: category })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('ServicePolicy').authorize('delete')
    await ServiceCategoryService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
