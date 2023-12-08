import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ContactMessageService from 'App/services/helpcenter/ContactMessageService'

export default class ContactMessagesController {
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('ContactMessagePolicy').authorize('viewList')

    const qs = request.qs() as any
    const records = await ContactMessageService.index(qs)
    return response.json(records)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('ContactMessagePolicy').authorize('create')

    const payload = await request.validate({} as any)
    const record = await ContactMessageService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request, bouncer }: HttpContextContract) {
    await bouncer.with('ContactMessagePolicy').authorize('view')

    const qs = request.qs() as any
    const record = await ContactMessageService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('ContactMessagePolicy').authorize('update')

    const payload = await request.validate({} as any)
    const record = await ContactMessageService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('ContactMessagePolicy').authorize('delete')

    await ContactMessageService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
