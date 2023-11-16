import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceSubcategoryService from 'App/services/service/ServiceSubcategoryService'

export default class ServiceSubcategoriesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await ServiceSubcategoryService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await ServiceSubcategoryService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await ServiceSubcategoryService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await ServiceSubcategoryService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await ServiceSubcategoryService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
