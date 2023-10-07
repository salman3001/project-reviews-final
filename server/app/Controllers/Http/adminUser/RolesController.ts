import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/adminUser/Permission'
import Role from 'App/Models/adminUser/Role'

export default class RolesController {
  public async index({ response }: HttpContextContract) {
    const roles = await Role.query().preload('permissions')

    return response.json({ roles })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({ response, params }: HttpContextContract) {
    const role = await Role.query().where('id', +params.id).preload('permissions').first()
    const permissions = await Permission.all()
    const rolePermissions = role ? role.permissions.map((p) => p.id) : []
    return response.json({ role, permissions, rolePermissions })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const permissions = request.input('permissionId')
      ? request.input('permissionId').map((p: string) => p)
      : []

    console.log(permissions)

    const role = await Role.findOrFail(+params.id)

    await role.related('permissions').detach()
    await role.related('permissions').attach([...permissions])

    return response.json({ message: 'role updated' })
  }

  public async destroy({}: HttpContextContract) {}
}
