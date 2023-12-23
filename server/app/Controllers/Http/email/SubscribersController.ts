import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscriber from 'App/Models/email/Subscriber'
import CreateSubscriberValidator from 'App/Validators/news-letter/CreateSubscriberValidator'
import BaseController from '../BaseController'

export default class SubscribersController extends BaseController {
  constructor() {
    super(Subscriber, CreateSubscriberValidator, CreateSubscriberValidator, 'SubscriberPolicy')
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('SubscriberPolicy').authorize('create')

    const payload = await request.validate(CreateSubscriberValidator)
    const subscriber = await Subscriber.create(payload.subscriber)

    if (payload.interests) {
      await subscriber.related('interests').attach(payload.interests)
    }

    return response.json({ message: 'record created', data: subscriber })
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('SubscriberPolicy').authorize('update')

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
}
