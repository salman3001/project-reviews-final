import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermissionService from 'App/services/admin/PermissionService'

export default class PermissionsController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await PermissionService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await PermissionService.store(payload)

    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await PermissionService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate({} as any)
    const record = await PermissionService.update(+params.id, payload)

    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await PermissionService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
