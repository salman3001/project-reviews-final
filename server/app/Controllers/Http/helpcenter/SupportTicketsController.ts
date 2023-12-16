import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SupportTicket from 'App/Models/helpcenter/SupportTicket'
import BaseController from '../BaseController'
import { TicketStatus } from 'App/Helpers/enums'
import SupportTicketCreateValidator from 'App/Validators/helpcenter/SupportTicketCreateValidator'
import ChatMessage from 'App/Models/helpcenter/ChatMessage'

export default class SupportTicketsController extends BaseController {
  constructor() {
    super(SupportTicket, {}, {}, 'SupportTicketPolicy')
  }

  public async store({ request, response, bouncer }: HttpContextContract): Promise<void> {
    await bouncer.with('SupportTicketPolicy').authorize('create')
    const payload = await request.validate(SupportTicketCreateValidator)
    const { message, ...restPayload } = payload
    const ticket = await SupportTicket.create(restPayload)
    if (message) {
      await ticket.related('messages').create({ message: message, type: 'User' })
    }

    return response.json({ message: 'Ticket Created' })
  }

  public async changeStatus({ params, response, bouncer, request }: HttpContextContract) {
    const status = request.input('status') as TicketStatus
    bouncer.with('SupportTicketPolicy').authorize('update')
    const ticket = await SupportTicket.findOrFail(+params.id)

    ticket.status = status
    await ticket.save()
    response.json({ message: 'Support ticket status updated' })
  }

  public async ticketMessages({ params, response, bouncer, request }: HttpContextContract) {
    const limit = request.qs().limit
    const page = request.qs().limit
    const ticket = await SupportTicket.findOrFail(+params.id)
    bouncer.with('SupportTicketPolicy').authorize('view', ticket)

    const messages = await ChatMessage.query()
      .where('support_ticket_id', ticket.id)
      .orderBy('created_at', 'desc')
      .paginate(page ?? 1, limit ?? 20)

    response.json({ messages })
  }
}
