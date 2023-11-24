import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Campaign from 'App/Models/email/Campaign'
import Template from 'App/Models/email/Template'
import CreateCampaignValidator from 'App/Validators/news-letter/CreateCampaignValidator'
import CampaignService from 'App/services/email/CampaignService'

export default class CampaignsController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await CampaignService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateCampaignValidator)
    const campaign = await Campaign.create(payload.campaign)

    if (payload.interests) {
      await campaign.related('interests').attach(payload.interests)
    }

    if (payload.templateId) {
      const template = await Template.findBy('id', payload.templateId)
      if (template) {
        await campaign.related('template').save(template)
      }
    }

    return response.json({ message: 'record created', data: campaign })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await CampaignService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const campaign = await Campaign.findOrFail(+params.id)
    const payload = await request.validate(CreateCampaignValidator)

    campaign.merge(payload.campaign)
    await campaign.save()

    if (payload.interests) {
      await campaign.related('interests').detach()
      await campaign.related('interests').attach(payload.interests)
    }

    if (payload.templateId) {
      await campaign.load('template')

      if (campaign.template) {
        console.log(campaign.template.id != payload.templateId)
        if (campaign.template.id != payload.templateId) {
          await campaign.template.related('campaign').dissociate()
          await campaign.refresh()
          const template = await Template.findBy('id', payload.templateId)
          if (template) {
            await campaign.related('template').save(template)
          }
        }
      } else {
        const template = await Template.findBy('id', payload.templateId)
        if (template) {
          await campaign.related('template').save(template)
        }
      }
    }

    return response.json({ message: 'record created', data: campaign })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await CampaignService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
