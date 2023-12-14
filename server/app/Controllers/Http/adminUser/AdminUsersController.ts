import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminUser from 'App/Models/adminUser/AdminUser'
import AdminUserValidator from 'App/Validators/adminUser/AdminUserValidator'
import AdminUserUpdateValidator from 'App/Validators/adminUser/AdminUserUpdateValidator'
import Role from 'App/Models/adminUser/Role'
import AdminUserService from 'App/services/admin/AdminUserService'
import { IndexQs } from 'App/services/BaseService'
import AddressService from 'App/services/address/AddressService'
import SocialService from 'App/services/SocialService'
import RoleService from 'App/services/admin/RoleService'
import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { TestNotification } from 'App/Notifications/TestNotification'

export default class AdminUsersController {
  public async index({ response, request, bouncer }: HttpContextContract) {
    await bouncer.with('AdminUserPolicy').authorize('viewList')
    const qs = request.qs() as IndexQs
    const users = await AdminUserService.index(qs)
    return response.json(users)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('AdminUserPolicy').authorize('create')
    const payload = await request.validate(AdminUserValidator)
    const user = await AdminUserService.store(payload.user)

    if (payload.address) {
      const address = await AddressService.store({
        address: payload?.address?.address || '',
        continentId: payload?.address?.continentId
          ? Number(payload?.address?.continentId)
          : undefined,
        countryId: payload?.address?.countryId ? Number(payload?.address?.countryId) : undefined,
        stateId: payload?.address?.stateId ? Number(payload?.address?.stateId) : undefined,
        cityId: payload?.address?.cityId ? Number(payload?.address?.cityId) : undefined,
        streetId: payload?.address?.streetId ? Number(payload?.address?.streetId) : undefined,
        zip: payload?.address?.zip,
      })

      user.related('address').save(address)
    }

    if (payload.social) {
      const social = await SocialService.store(payload.social)
      user.related('social').save(social)
    }

    if (payload.user.roleId) {
      const role = await RoleService.show(+payload.user.roleId)
      if (role) await user.related('role').associate(role)
    }

    if (payload.image) {
      user.avatar = await ResponsiveAttachment.fromFile(payload.image)
    }

    await user.save()

    return response.json(user)
  }

  public async show({ response, params, request, bouncer }: HttpContextContract) {
    const qs = request.qs() as IndexQs
    const user = await AdminUserService.show(+params.id, qs)
    await bouncer.with('AdminUserPolicy').authorize('view', user as AdminUser)
    new TestNotification().create(user as AdminUser)
    return response.json(user)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    const payload = await request.validate(AdminUserUpdateValidator)
    let user = await AdminUserService.update(+params.id, payload.user)
    await bouncer.with('AdminUserPolicy').authorize('update', user as AdminUser)
    if (user) {
      if (payload.address) {
        await user.load('address')
        if (user.address) {
          await user.address.delete()
          await user.related('address').create(payload.address)
        } else {
          await user.related('address').create(payload.address)
        }
      }
      if (payload.social) {
        await user.load('social')
        console.log(payload.social)

        if (user.social) {
          await SocialService.update(user.social.id, payload.social)
        } else {
          const social = await SocialService.store(payload.social)
          user.related('social').save(social)
        }
      }
      if (payload.user.roleId) {
        user.roleId = +payload.user.roleId
      }

      if (payload.image) {
        user.avatar = await ResponsiveAttachment.fromFile(payload.image)
      }
    }

    await user?.save()

    return response.json(user)
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('AdminUserPolicy').authorize('delete')
    await AdminUserService.destroy(+params.id)

    return response.json({ message: 'User Deleted' })
  }

  public async banUser({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('AdminUserPolicy').authorize('delete')
    const user = await AdminUser.find(+params.id)
    if (user) {
      user.isActive = false
      await user.save()
      return response.json({ message: 'User Baned Successfully' })
    } else {
      return response.badRequest({ message: 'User not Fund' })
    }
  }

  public async changeRole({ params, response, request, bouncer }: HttpContextContract) {
    await bouncer.with('AdminUserPolicy').authorize('delete')
    const roleId = request.input('roleId')
    const role = await Role.find(+roleId)
    console.log(roleId)
    console.log(role)

    const user = await AdminUser.find(+params.id)
    await user?.related('role').dissociate()
    if (role) await user?.related('role').associate(role)
    return response.json({ message: 'Role Updates' })
  }

  public async uniqueField({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const exist = await AdminUserService.uniqueField(qs)
    if (exist) {
      return response.badRequest({ message: 'Field is not unique' })
    } else {
      return response.ok({ message: 'Field available' })
    }
  }

  public async updateUserPassword({ params, response, request, bouncer }: HttpContextContract) {
    const user = await AdminUser.findOrFail(+params.id)

    await bouncer.with('AdminUserPolicy').authorize('update', user)

    const validationSchema = schema.create({
      password: schema.string({ trim: true }, [rules.minLength(8)]),
      password_confirmation: schema.string({ trim: true }, [rules.confirmed('password')]),
    })

    const payload = await request.validate({
      schema: validationSchema,
    })
    // const newPassword = await Hash.make(payload.password)
    user.password = payload.password
    await user.save()
    return response.json({ message: 'Password Changed' })
  }
}
