import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ContactMessage from 'App/Models/helpcenter/ContactMessage'

export default class ContactMessagesController {
  public async index({ response, request }: HttpContextContract) {
    const { search, page } = request.qs()

    const query = ContactMessage.query()
    if (search) {
      query.whereLike('message', '%' + search + '%')
    }

    const contactMessages = await query.paginate(page || 1, 10)

    return response.json(contactMessages)
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {
    const id = +params.id
    const message = await ContactMessage.findOrFail(id)
    await message.delete()
    return response.ok({ message: 'Message Deleted' })
  }
}
