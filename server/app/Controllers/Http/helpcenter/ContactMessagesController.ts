import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ContactMessageService from 'App/services/helpcenter/ContactMessageService'

export default class ContactMessagesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await ContactMessageService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await ContactMessageService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await ContactMessageService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await ContactMessageService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await ContactMessageService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
