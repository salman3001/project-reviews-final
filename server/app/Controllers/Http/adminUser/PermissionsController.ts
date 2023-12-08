import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermissionService from 'App/services/admin/PermissionService'

export default class PermissionsController {
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('viewList')
    const qs = request.qs() as any
    const records = await PermissionService.index(qs)
    return response.json(records)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')
    const payload = await request.validate({} as any)
    const record = await PermissionService.store(payload)

    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('create')
    const qs = request.qs() as any
    const record = await PermissionService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('update')
    const payload = await request.validate({} as any)
    const record = await PermissionService.update(+params.id, payload)

    return response.json({ message: 'record updated', data: record })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('delete')
    await PermissionService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }
}
