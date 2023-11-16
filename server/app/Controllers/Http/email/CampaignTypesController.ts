import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CampaignTypeService from 'App/services/email/CampaignTypeService'

export default class CampaignTypesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await CampaignTypeService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await CampaignTypeService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await CampaignTypeService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await CampaignTypeService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await CampaignTypeService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
