import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductSubcategoryService from 'App/services/product/ProductSubcategoryService'

export default class ProductSubcategoriesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await ProductSubcategoryService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await ProductSubcategoryService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await ProductSubcategoryService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await ProductSubcategoryService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await ProductSubcategoryService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
