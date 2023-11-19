import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductSubcategory from 'App/Models/product/ProductSubcategory'
import CategoryCreateValidator from 'App/Validators/product/CategoryCreateValidator'
import CategoryUpdateValidator from 'App/Validators/product/CategoryUpdateValidator'
import ImageService from 'App/services/ImageService'
import ProductSubcategoryService from 'App/services/product/ProductSubcategoryService'

export default class ProductSubcategoriesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await ProductSubcategoryService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CategoryCreateValidator)
    const category = await ProductSubcategory.create(payload.category)

    if (payload.seo) {
      await category.related('seo').create(payload.seo)
    }

    if (payload.faq) {
      await category.related('faqs').createMany(payload.faq)
    }

    if (payload.image) {
      const img = await ImageService.store(payload.image, `/product-subcategory/`, 'thumb')
      await category.related('thumbnail').save(img)
    }

    return response.json({ message: 'record created', data: category })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await ProductSubcategoryService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(CategoryUpdateValidator)
    const category = await ProductSubcategory.findOrFail(+params.id)

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
      const img = await ImageService.store(payload.image, `/product-subcategory/`, 'thumb')

      await category.related('thumbnail').save(img)
    }

    return response.json({ message: 'record created', data: category })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const category = await ProductSubcategory.findOrFail(+params.id)
    await category.load('thumbnail')
    if (category.thumbnail) {
      await ImageService.destroy(category.thumbnail.id)
    }
    await ProductSubcategoryService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
