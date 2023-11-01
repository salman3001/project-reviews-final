import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RoleService from 'App/services/admin/RoleService'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class RolesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const roles = await RoleService.index(qs)
    return response.json(roles)
  }

  public async store({ request, response }: HttpContextContract) {
    const payloadSchema = schema.create({
      name: schema.string({ trim: true }),
      isActive: schema.boolean.optional(),
    })

    const payload = await request.validate({ schema: payloadSchema })

    const record = await RoleService.store(payload)

    return response.json({ message: 'record created', data: record })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const role = await RoleService.show(+params.id, qs)
    response.json(role)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const permissions = request.input('permissionId')
      ? request.input('permissionId').map((p: string) => p)
      : []

    const isActive = request.input('isActive')

    const role = await RoleService.show(+params.id)
    console.log(isActive)

    if (role) {
      role.isActive = isActive
      await role.related('permissions').detach()
      await role.related('permissions').attach([...permissions])
      await role.save()
    }
    return response.json({ message: 'role updated' })
  }

  public async destroy({ params, response }: HttpContextContract) {
    await RoleService.destroy(+params.id)
    return response.json({ message: 'role deleted' })
  }
}
