import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CampaignService from 'App/services/email/CampaignService'

export default class CampaignsController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await CampaignService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await CampaignService.store(payload)
    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await CampaignService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await CampaignService.update(params.id, payload)
    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await CampaignService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
