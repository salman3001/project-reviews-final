import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscriber from 'App/Models/email/Subscriber'
import CreateSubscriberValidator from 'App/Validators/news-letter/CreateSubscriberValidator'
import SubscriberService from 'App/services/email/SubscriberService'

export default class SubscribersController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await SubscriberService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateSubscriberValidator)
    const subscriber = await Subscriber.create(payload.subscriber)

    if (payload.interests) {
      await subscriber.related('interests').attach(payload.interests)
    }

    return response.json({ message: 'record created', data: subscriber })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await SubscriberService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const subscriber = await Subscriber.findOrFail(+params.id)
    const payload = await request.validate(CreateSubscriberValidator)

    subscriber.merge(payload.subscriber)
    await subscriber.save()

    if (payload.interests) {
      await subscriber.related('interests').detach()
      await subscriber.related('interests').attach(payload.interests)
    }

    return response.json({ message: 'record created', data: subscriber })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await SubscriberService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }

  public async uniqueField({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const exist = await SubscriberService.uniqueField(qs)
    if (exist) {
      return response.badRequest({ message: 'Field is not unique' })
    } else {
      return response.ok({ message: 'Field available' })
    }
  }
}
