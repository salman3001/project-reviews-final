import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/product/ProductCategory'
import CategoryCreateValidator from 'App/Validators/product/CategoryCreateValidator'
import CategoryUpdateValidator from 'App/Validators/product/CategoryUpdateValidator'
import ProductCategoryService from 'App/services/product/ProductCategoryService'

export default class ProductCategoriesController {
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('ProductPolicy').authorize('viewList')
    const qs = request.qs() as any
    const records = await ProductCategoryService.index(qs)
    return response.json(records)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('ProductPolicy').authorize('create')
    const payload = await request.validate(CategoryCreateValidator)
    const category = await ProductCategory.create(payload.category)

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
    await bouncer.with('ProductPolicy').authorize('view')

    const qs = request.qs() as any
    const record = await ProductCategoryService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('ProductPolicy').authorize('update')

    const payload = await request.validate(CategoryUpdateValidator)
    const category = await ProductCategory.findOrFail(+params.id)

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
    await bouncer.with('ProductPolicy').authorize('delete')

    await ProductCategoryService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
