import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SupportTicket from 'App/Models/helpcenter/SupportTicket'
import SupportTicketService from 'App/services/helpcenter/SupportTicketService'

export default class SupportTicketsController {
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('SupportTicketPolicy').authorize('viewList')

    const qs = request.qs() as any
    const records = await SupportTicketService.index(qs)
    return response.json(records)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('SupportTicketPolicy').authorize('create')

    const payload = await request.validate({} as any)
    const record = await SupportTicketService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request, bouncer }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await SupportTicketService.show(+params.id, qs)
    await bouncer.with('SupportTicketPolicy').authorize('view', record as SupportTicket)
    response.json(record)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('SupportTicketPolicy').authorize('update')
    const payload = await request.validate({} as any)
    const record = await SupportTicketService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('SupportTicketPolicy').authorize('delete')

    await SupportTicketService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
