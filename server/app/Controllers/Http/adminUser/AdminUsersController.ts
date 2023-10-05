import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import AdminUser from 'App/Models/adminUser/AdminUser'
import Image from 'App/Models/Image'
import AdminUserValidator from 'App/Validators/adminUser/AdminUserValidator'
import AdminUserUpdateValidator from 'App/Validators/adminUser/AdminUserUpdateValidator'
import Address from 'App/Models/address/Address'
import Social from 'App/Models/Social'
import Role from 'App/Models/adminUser/Role'
import Country from 'App/Models/address/Country'

export default class AdminUsersController {
  public async index({ response, request }: HttpContextContract) {
    const { orderBy, roleId, search, isActive, page } = request.qs()

    const query = AdminUser.query()

    if (search) {
      query.whereLike('firstName', '%' + search + '%').orWhereLike('lastName', '%' + search + '%')
    }

    if (roleId) {
      query.whereHas('role', (q) => {
        q.where('id', roleId)
      })
    }

    if (isActive) {
      query.where('is_active', +isActive)
    }

    await query.preload('avatar').preload('role')
    const users = await query.orderBy(orderBy || 'first_name').paginate(page || 1, 10)
    users.baseUrl('/admin/admin-users')
    const roles = await Role.all()

    return response.json({ users, roles })
  }

  public async create({ response }: HttpContextContract) {
    const roles = await Role.all()
    const countries = await Country.all()

    return response.json({ roles, countries })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(AdminUserValidator)

    const user = await AdminUser.create({ ...payload.user })

    if (payload.address) {
      user.related('address').create({
        ...payload.address,
      })
    }

    if (payload.social) {
      user.related('social').create({
        ...payload.social,
      })
    }

    if (payload.role) {
      const role = await Role.find(payload.role.id)
      if (role) await user.related('role').associate(role)
    }

    if (payload.image) {
      await payload.image.moveToDisk('./admin_users/', {
        name: user.firstName + Date.now() + '.' + payload.image.extname,
      })
      const imageName = payload.image?.fileName
      const image = await Image.create({ url: '/admin_users/' + imageName })
      await user.related('avatar').save(image)
    }

    return response.json({ user })
  }

  public async show({}: HttpContextContract) {}

  public async edit({ response, params }: HttpContextContract) {
    const user = await AdminUser.find(+params.id)
    await user?.load((loader) => {
      loader.load('address').load('avatar').load('social')
    })

    const roles = await Role.all()

    return response.json({ user, roles })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const id = Number(params.id)
    const payload = await request.validate(AdminUserUpdateValidator)
    let user = await AdminUser.query().where('id', id).preload('address').first()

    if (user) {
      user.merge({ ...payload.user })
      if (payload.address) {
        if (user.address) {
          user.address.merge(payload.address)
        } else {
          const address = await Address.create(payload.address)
          user.related('address').save(address)
        }
      }
      if (payload.social) {
        await user.load('social')
        if (user.social) {
          user.social.merge({ ...payload.social })
        } else {
          const social = await Social.create(payload.social)
          user.related('social').save(social)
        }
      }
      if (payload.role?.id) {
        user.roleId = +payload.role.id
      }

      if (payload.image) {
        console.log('ran')

        await payload.image.moveToDisk('./admin_users/', {
          name: user.firstName + Date.now() + '.' + payload.image.extname,
        })
        const imageName = payload.image?.fileName

        await user.load('avatar')
        if (user.avatar) {
          await Drive.delete(user.avatar.url)
          user.avatar.url = '/admin_users/' + imageName
        } else {
          user.related('avatar').create({ url: '/admin_users/' + imageName })
        }
      }
    }

    await user?.save()
    await user?.address?.save()
    await user?.social?.save()
    await user?.avatar?.save()

    return response.json({ user })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await AdminUser.find(+params.id)
    await user?.load('avatar')

    if (user?.avatar) {
      await Drive.delete(user.avatar.url)
      await user.avatar.delete()
    }

    await user?.delete()

    return response.json({ user })
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
    const user = await AdminUser.find(+params.id)
    await user?.related('role').dissociate()
    if (role) await user?.related('role').associate(role)
    return response.json({ message: 'Role Updates' })
  }
}
