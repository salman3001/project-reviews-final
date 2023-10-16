import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RoleService from 'App/services/admin/RoleService'

export default class RolesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const roles = await RoleService.index(qs)
    return response.json(roles)
  }

  public async store({}: HttpContextContract) {}

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const role = await RoleService.show(+params.id, qs)
    response.json(role)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const permissions = request.input('permissionId')
      ? request.input('permissionId').map((p: string) => p)
      : []

    console.log(permissions)

    const role = await RoleService.show(+params.id)

    if (role) {
      await role.related('permissions').detach()
      await role.related('permissions').attach([...permissions])
    }
    return response.json({ message: 'role updated' })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await RoleService.destroy(+params.id)
    return response.json({ message: 'role deleted' })
  }
}
