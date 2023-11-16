import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InterestService from 'App/services/email/InterestService'

export default class InterestController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await InterestService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await InterestService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await InterestService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await InterestService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await InterestService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
