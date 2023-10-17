import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HelpcenterContentCategoryValidator from 'App/Validators/helpcenter/HelpcenterContentCategoryValidator'
import KnowledgeBaseCategoryService from 'App/services/helpcenter/KnowledgeBaseCategoryService'
import slugify from 'slugify'

export default class KnowledgeBaseCategoriesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await KnowledgeBaseCategoryService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(HelpcenterContentCategoryValidator)
    const { slug, ...restPayload } = payload

    let record: any = null
    try {
      if (slug) {
        record = await KnowledgeBaseCategoryService.store(payload)
      } else {
        record = await KnowledgeBaseCategoryService.store({
          ...restPayload,
          slug: slugify(payload.name),
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
    const record = await KnowledgeBaseCategoryService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(HelpcenterContentCategoryValidator)
    const { slug, ...restPayload } = payload
    let record: any = null
    try {
      if (slug) {
        record = await KnowledgeBaseCategoryService.update(+params.id, payload)
      } else {
        record = await KnowledgeBaseCategoryService.update(+params.id, {
          ...restPayload,
          slug: slugify(payload.name),
        })
      }
      return response.json({ message: 'record updated', data: record })
    } catch (error) {
      console.log(error)
      return response.abort({ message: 'Something went wrong' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    await KnowledgeBaseCategoryService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }

  public async uniqueField({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const exist = await KnowledgeBaseCategoryService.uniqueField(qs)
    if (exist) {
      return response.badRequest({ message: 'Field is not unique' })
    } else {
      return response.ok({ message: 'Field available' })
    }
  }
}
