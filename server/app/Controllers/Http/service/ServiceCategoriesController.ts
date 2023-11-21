import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceCategory from 'App/Models/service/ServiceCategory'
import ServiceCategoryCreateValidator from 'App/Validators/service/ServiceCategoryCreateValidator'
import ServiceCategoryUpdateValidator from 'App/Validators/service/ServiceCategoryUpdateValidator'
import ImageService from 'App/services/ImageService'
import ServiceCategoryService from 'App/services/service/ServiceCategoryService'

export default class ServiceCategoriesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await ServiceCategoryService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(ServiceCategoryCreateValidator)
    const category = await ServiceCategory.create(payload.category)

    if (payload.seo) {
      await category.related('seo').create(payload.seo)
    }

    if (payload.faq) {
      await category.related('faqs').createMany(payload.faq)
    }

    if (payload.image) {
      const img = await ImageService.store(payload.image, `/service-category/`, 'thumb')
      await category.related('thumbnail').save(img)
    }

    return response.json({ message: 'record created', data: category })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await ServiceCategoryService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
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
      await category.load('thumbnail')
      if (category.thumbnail) {
        await ImageService.destroy(category.thumbnail.id)
      }
      const img = await ImageService.store(payload.image, `/service-category/`, 'thumb')

      await category.related('thumbnail').save(img)
    }

    return response.json({ message: 'record created', data: category })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const category = await ServiceCategory.findOrFail(+params.id)
    await category.load('thumbnail')
    if (category.thumbnail) {
      await ImageService.destroy(category.thumbnail.id)
    }
    await ServiceCategoryService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
