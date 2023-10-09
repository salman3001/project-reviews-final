import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SupportTicket from 'App/Models/helpcenter/SupportTicket'

export default class SupportTicketsController {
  public async index({ request, response }: HttpContextContract) {
    const { page, status } = request.qs()

    const query = SupportTicket.query()

    if (status) {
      query.where('status', status)
    }

    await query.preload('user', (q) => {
      q.select(['first_name', 'last_name'])
    })

    const tickets = await query.paginate(page || 1, 10)

    return response.json(tickets)
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    const ticket = await SupportTicket.query().where('id', +params.id).firstOrFail()
    await ticket.delete()
    return response.ok({ message: 'Ticket Deleted' })
  }
}
