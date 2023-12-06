import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Template from 'App/Models/email/Template'
import CreateTemplateValidator from 'App/Validators/news-letter/CreateTemplateValidator'
import TemplateService from 'App/services/email/TemplateService'

export default class TemplatesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await TemplateService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateTemplateValidator)
    const template = await Template.create(payload.template)

    if (payload.thumbnail) {
      template.thumbnail = await ResponsiveAttachment.fromFile(payload.thumbnail)
    }

    await template.save()
    return response.json({ message: 'record created', data: template })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await TemplateService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const template = await Template.findOrFail(+params.id)
    const payload = await request.validate(CreateTemplateValidator)
    template.merge(payload.template)

    await template.save()

    if (payload.thumbnail) {
      template.thumbnail = await ResponsiveAttachment.fromFile(payload.thumbnail)
    }
    await template.save()
    return response.json({ message: 'record created', data: template })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const template = await Template.findOrFail(+params.id)
    await template.delete()
    return response.json({ message: 'record deleted' })
  }
}
