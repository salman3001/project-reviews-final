import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HelpcenterContentValidator from 'App/Validators/helpcenter/HelpcenterContentValidator'
import KnowledgeBaseContentService from 'App/services/helpcenter/KnowledgeBaseContentService'
import slugify from 'slugify'

export default class KnowledgeBaseContentsController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await KnowledgeBaseContentService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(HelpcenterContentValidator)
    const { slug, ...restPayload } = payload

    let record: any = null
    try {
      if (slug) {
        record = await KnowledgeBaseContentService.store(payload)
      } else {
        record = await KnowledgeBaseContentService.store({
          ...restPayload,
          slug: slugify(payload.title),
        })
      }
      return response.json({ message: 'record created', data: record })
    } catch (error) {
      console.log(error)
      return response.abort({ message: 'Something went wrong' })
    }
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await KnowledgeBaseContentService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(HelpcenterContentValidator)
    const { slug, ...restPayload } = payload
    let record: any = null
    try {
      if (slug) {
        record = await KnowledgeBaseContentService.update(+params.id, payload)
      } else {
        record = await KnowledgeBaseContentService.update(+params.id, {
          ...restPayload,
          slug: slugify(payload.title),
        })
      }
      return response.json({ message: 'record updated', data: record })
    } catch (error) {
      console.log(error)
      return response.abort({ message: 'Something went wrong' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    await KnowledgeBaseContentService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }

  ////////

  public async uniqueField({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const exist = await KnowledgeBaseContentService.uniqueField(qs)
    if (exist) {
      return response.badRequest({ message: 'Field is not unique' })
    } else {
      return response.ok({ message: 'Field available' })
    }
  }
}
