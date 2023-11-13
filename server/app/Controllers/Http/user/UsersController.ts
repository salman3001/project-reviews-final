import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AddressService from 'App/services/address/AddressService'
import ImageService from 'App/services/ImageService'
import SocialService from 'App/services/SocialService'
import UserService from 'App/services/user/UserService'
import UserCreateValidator from 'App/Validators/user/UserCreateValidator'
import UserUpdateeValidator from 'App/Validators/user/UserUpdateValidator copy'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await UserService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(UserCreateValidator)
    const user = await UserService.store(payload.user)

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

    if (payload.image) {
      const image = await ImageService.store(payload.image, '/users/', user.firstName)
      await user.related('avatar').save(image)
    }

    if (payload.favoriteLinks) {
      await user.related('favoriteLinks').createMany(payload.favoriteLinks)
    }

    if (payload.workExperience) {
      await user.related('experiences').createMany(payload.workExperience)
    }

    if (payload.education) {
      await user.related('educations').createMany(payload.education)
    }

    if (payload.languages) {
      await user.related('languages').attach(payload.languages)
    }

    if (payload.skills) {
      await user.related('skills').createMany(payload.skills)
    }

    if (payload.NotificationSettings) {
      await user.related('NotificationSetting').create(payload.NotificationSettings)
    }

    await user.save()

    return response.json(user)
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await UserService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(UserUpdateeValidator)
    const id = params.id
    const user = await UserService.show(id)

    if (payload.user) {
      await UserService.update(id, payload.user)
    }

    if (payload.address) {
      await user?.load('address')
      if (user?.address) {
        await AddressService.update(user?.address?.id, {
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
      } else {
        const address = await AddressService.store(payload.address)
        user && user.related('address').save(address)
      }
    }

    if (payload.social) {
      await user?.load('social')
      if (user?.social) {
        await SocialService.update(user.social.id, payload.social)
      } else {
        const social = await SocialService.store(payload.social)
        user && user.related('social').save(social)
      }
    }

    if (payload.image) {
      await user?.load('avatar')

      if (user?.avatar) {
        await ImageService.update(user.avatar.id, payload.image)
      } else {
        const image = await ImageService.store(payload.image, '/users/', user?.firstName)
        user && (await user.related('avatar').save(image))
      }
    }

    if (payload.languages) {
      await user?.load('languages')
      if (user?.languages) {
        user.related('languages').detach()
        user && (await user.related('languages').attach(payload.languages))
      } else {
        user && (await user.related('languages').attach(payload.languages))
      }
    }

    user && (await user.save())

    return response.json(user)
  }

  public async destroy({ params, response }: HttpContextContract) {
    await UserService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }

  public async uniqueField({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const exist = await UserService.uniqueField(qs)
    if (exist) {
      return response.badRequest({ message: 'Field is not unique' })
    } else {
      return response.ok({ message: 'Field available' })
    }
  }
}
