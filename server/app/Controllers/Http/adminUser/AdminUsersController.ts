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
import ImageService from 'App/services/ImageService'

export default class AdminUsersController {
  public async index({ response, request }: HttpContextContract) {
    const qs = request.qs() as IndexQs
    const users = await AdminUserService.index(qs)
    return response.json(users)
  }

  public async store({ request, response }: HttpContextContract) {
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
      const image = await ImageService.store(payload.image, '/admin-users/', user.firstName)
      await user.related('avatar').save(image)
    }

    return response.json(user)
  }

  public async show({ response, params, request }: HttpContextContract) {
    const qs = request.qs() as IndexQs
    const user = await AdminUserService.show(+params.id, qs)

    return response.json(user)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(AdminUserUpdateValidator)
    let user = await AdminUserService.update(+params.id, payload.user)

    if (user) {
      if (payload.address) {
        await user.load('address')
        if (user.address) {
          await AddressService.update(user.address.id, {
            address: payload.address.address,
            continentId: payload?.address?.continentId,
            countryId: payload?.address?.continentId,
            stateId: payload?.address?.stateId,
            cityId: payload?.address?.cityId,
            streetId: payload?.address?.streetId,
            zip: payload.address.zip,
          })
        } else {
          const address = await AddressService.store({
            address: payload.address.address,
            continentId: payload?.address?.continentId,
            countryId: payload?.address?.continentId,
            stateId: payload?.address?.stateId,
            cityId: payload?.address?.cityId,
            streetId: payload?.address?.streetId,
            zip: payload.address.zip,
          })
          user.related('address').save(address)
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
        const image = await ImageService.store(payload.image, '/admin-users/', user.firstName)
        await user.load('avatar')
        if (user.avatar) {
          await ImageService.destroy(user.avatar.id)
          await user.related('avatar').save(image)
        } else {
          await user.related('avatar').save(image)
        }
      }
    }

    await user?.save()

    return response.json(user)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await AdminUserService.show(+params.id)
    await user?.load('avatar')

    if (user?.avatar) {
      await ImageService.destroy(user.avatar.id)
    }

    await AdminUserService.destroy(+params.id)

    return response.json({ message: 'User Deleted' })
  }

  public async banUser({ params, response }: HttpContextContract) {
    const user = await AdminUser.find(+params.id)
    if (user) {
      user.isActive = false
      await user.save()
      return response.json({ message: 'User Baned Successfully' })
    } else {
      return response.badRequest({ message: 'User not Fund' })
    }
  }

  public async changeRole({ params, response, request }: HttpContextContract) {
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
}
