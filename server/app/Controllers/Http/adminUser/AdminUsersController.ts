import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminUser from 'App/Models/adminUser/AdminUser'
import AdminUserValidator from 'App/Validators/adminUser/AdminUserValidator'
import AdminUserUpdateValidator from 'App/Validators/adminUser/AdminUserUpdateValidator'
import Role from 'App/Models/adminUser/Role'
import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import BaseController from '../BaseController'
import Address from 'App/Models/address/Address'
import Social from 'App/Models/Social'
import * as XLSX from 'xlsx'
import Application from '@ioc:Adonis/Core/Application'
import { flattenObject } from 'App/Helpers/flattenObject'
import Drive from '@ioc:Adonis/Core/Drive'
import { extname } from 'path'
import { Readable } from 'stream'

export default class AdminUsersController extends BaseController {
  constructor() {
    super(AdminUser, {}, {}, 'AdminUserPolicy')
  }

  // public async index() {
  //   const user = await AdminUser.findBy('id', 1)
  //   await user?.related('notifications').create({
  //     data: { message: 'test notification for you lorem ispsd ksdj skjd  dskdj skd skdj sk ' },
  //   })

  //   await user?.related('notifications').create({
  //     data: {
  //       message: 'test notification for you lorem ispsd ksdj skjd  dskdj skd skdj sk ',
  //     },
  //   })

  //   await user?.related('notifications').create({
  //     data: {
  //       message: 'test notification for you lorem ispsd ksdj skjd  dskdj skd skdj sk ',
  //     },
  //   })

  //   await user?.related('notifications').create({
  //     data: {
  //       message: 'test notification for you lorem ispsd ksdj skjd  dskdj skd skdj sk ',
  //     },
  //   })
  // }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('AdminUserPolicy').authorize('create')
    const payload = await request.validate(AdminUserValidator)
    const user = await AdminUser.create(payload.user)

    if (payload.address) {
      const address = await Address.create({
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
      const social = await Social.create(payload.social)
      user.related('social').save(social)
    }

    if (payload.image) {
      user.avatar = await ResponsiveAttachment.fromFile(payload.image)
    }

    await user.save()

    return response.json(user)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    let user = await AdminUser.findOrFail(+params.id)
    await bouncer.with('AdminUserPolicy').authorize('update', user as AdminUser)
    const payload = await request.validate(AdminUserUpdateValidator)
    user.merge(payload.user)
    await user.save()

    await user.related('notifications').create({
      data: { message: 'behnchod' },
    })

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
        await user.social.delete()
      } else {
        const social = await Social.create(payload.social)
        user.related('social').save(social)
      }
    }
    if (payload.user.roleId) {
      user.roleId = +payload.user.roleId
    }

    if (payload.image) {
      user.avatar = await ResponsiveAttachment.fromFile(payload.image)
    }

    await user?.save()

    return response.json(user)
  }

  public async banUser({ params, response, bouncer }: HttpContextContract) {
    const user = await AdminUser.findOrFail(+params.id)
    await bouncer.with('AdminUserPolicy').authorize('delete')
    if (user) {
      user.isActive = false
      await user.save()
      return response.json({ message: 'User Baned Successfully' })
    } else {
      return response.badRequest({ message: 'User not Fund' })
    }
  }

  public async changeRole({ params, response, request, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('update')
    const roleId = request.input('roleId')
    const role = await Role.find(+roleId)
    console.log(roleId)
    console.log(role)

    const user = await AdminUser.find(+params.id)
    await user?.related('role').dissociate()
    if (role) await user?.related('role').associate(role)

    return response.json({ message: 'Role Updates' })
  }

  public async updateUserPassword({ params, response, request, bouncer }: HttpContextContract) {
    const user = await AdminUser.findOrFail(+params.id)

    await bouncer.with('AdminUserPolicy').authorize('updatePassword', user)

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

  public async export({ response, bouncer }: HttpContextContract) {
    await bouncer.with('AdminUserPolicy').authorize('viewList')

    const users = await AdminUser.query()
      .select(
        'id',
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'desc',
        'is_active',
        'role_id'
      )
      .preload('address', (a) => {
        a.select('address', 'continent_id', 'country_id', 'state_id', 'city_id', 'street_id', 'zip')
      })
      .preload('social', (s) => {
        s.select('vk', 'website', 'facebook', 'twitter', 'instagram', 'linkedin')
      })
      .exec()

    const data = users.map((user) => {
      const {
        social,
        address,
        'social.admin_user_id': SID,
        'address.admin_user_id': AID,
        ...rest
      } = flattenObject(user.serialize())

      return {
        ...rest,
        password: '',
      }
    })

    const workbook = XLSX.utils.book_new()

    const worksheet = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Admin Users')
    XLSX.writeFile(workbook, Application.tmpPath('uploads/admin_users.xlsx'), {
      bookType: 'xlsx',
      type: 'file',
    })

    const url = await Drive.getSignedUrl('admin_users.xlsx', { expiresIn: '30mins' })

    return response.json({ url })
  }

  public async import({ response, bouncer, request }: HttpContextContract) {
    await bouncer.with('AdminUserPolicy').authorize('create')

    const file = request.file('file')
    if (file) {
      const json = XLSX.utils.sheet_to_json(file)
      console.log(json)
    }

    return response.json({ ok: 'k' })
  }
}
