import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Street from 'App/Models/address/Street'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class StreetsController {
  public async index({ response, request }: HttpContextContract) {
    const { page, search } = request.qs()
    let streets: null | Street[] = []
    const query = Street.query()

    if (search) {
      query.whereLike('name', '%' + search + '%')
    }

    if (page) {
      streets = await query.paginate(page || 1, 10)
    } else {
      streets = await query.exec()
    }
    return response.ok(streets)
  }

  public async store({ response, request }: HttpContextContract) {
    const streetSchema = schema.create({
      name: schema.string({ trim: true }),
      cityId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: streetSchema })
    await Street.create(payload)
    return response.ok({ message: 'street Created' })
  }

  public async show({}: HttpContextContract) {}

  public async update({ response, request, params }: HttpContextContract) {
    const streetSchema = schema.create({
      name: schema.string({ trim: true }),
      cityId: schema.number.optional(),
    })
    const payload = await request.validate({ schema: streetSchema })
    const street = await Street.findOrFail(+params.id)
    street.merge(payload)
    await street.save()
    return response.ok({ message: 'street updated' })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const street = await Street.findOrFail(+params.id)
    await street.delete()
    return response.ok({ message: 'street deleted' })
  }
}
