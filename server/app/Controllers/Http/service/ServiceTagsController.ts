import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceTagService from 'App/services/service/ServiceTagService'

export default class ServiceTagsController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await ServiceTagService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await ServiceTagService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await ServiceTagService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await ServiceTagService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await ServiceTagService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
