import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SocialService from 'App/services/SocialService'
import UserService from 'App/services/user/UserService'
import UserCreateValidator from 'App/Validators/user/UserCreateValidator'
import UserUpdateeValidator from 'App/Validators/user/UserUpdateValidator'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/user/User'
import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'

export default class UsersController {
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('userPolicy').authorize('viewList')
    const qs = request.qs() as any
    const records = await UserService.index(qs)
    return response.json(records)
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    const payload = await request.validate(UserCreateValidator)
    const user = new User()
    await bouncer.with('userPolicy').authorize('create')

    user.merge(payload.user)
    await user.save()

    if (payload.address) {
      user.related('address').create(payload.address)
    }

    if (payload.social) {
      await user.related('social').create(payload.social)
    }

    if (payload.image) {
      user.avatar = await ResponsiveAttachment.fromFile(payload.image)
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

  public async show({ params, response, request, bouncer }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await UserService.show(+params.id, qs)
    await bouncer.with('userPolicy').authorize('view', record as User)
    response.json(record)
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    const payload = await request.validate(UserUpdateeValidator)
    const id = params.id
    const user = await User.findOrFail(id)
    await bouncer.with('userPolicy').authorize('update', user)

    if (payload.user) {
      user.merge(payload.user)
      await user.save()
    }

    if (payload.address) {
      await user?.load('address')

      if (user?.address) {
        await user.address.delete()
        await user.related('address').create(payload.address)
      } else {
        await user.related('address').create(payload.address)
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

    if (payload.favoriteLinks) {
      await user?.load('favoriteLinks')

      if (user?.favoriteLinks) {
        user.favoriteLinks.forEach((l) => {
          l.delete()
        })
      }

      user && (await user.related('favoriteLinks').createMany(payload.favoriteLinks))
    }

    if (payload.workExperience) {
      await user?.load('experiences')

      if (user?.experiences) {
        user.experiences.forEach((l) => {
          l.delete()
        })
      }
      user && (await user.related('experiences').createMany(payload.workExperience))
    }

    if (payload.image) {
      user.avatar = await ResponsiveAttachment.fromFile(payload.image)
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

    if (payload.skills) {
      await user?.load('skills')
      if (user?.skills) {
        await user.related('skills').detach()
        user && (await user.related('skills').createMany(payload.skills))
      } else {
        user && (await user.related('skills').createMany(payload.skills))
      }
    }

    if (payload.NotificationSettings) {
      await user?.load('NotificationSetting')
      if (user?.NotificationSetting) {
        user.NotificationSetting.delete()
        user && (await user.related('NotificationSetting').create(payload.NotificationSettings))
      } else {
        user && (await user.related('NotificationSetting').create(payload.NotificationSettings))
      }
    }

    user && (await user.save())

    return response.json(user)
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('userPolicy').authorize('delete')
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

  public async banUser({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('userPolicy').authorize('delete')

    const user = await UserService.show(+params.id)
    if (user) {
      user.isActive = false
      await user.save()
      return response.json({ message: 'User Baned Successfully' })
    } else {
      return response.badRequest({ message: 'User not Fund' })
    }
  }

  public async updateUserPassword({ params, response, request, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(+params.id)

    await bouncer.with('userPolicy').authorize('update', user)

    const validationSchema = schema.create({
      password: schema.string({ trim: true }, [rules.minLength(8)]),
      password_confirmation: schema.string({ trim: true }, [rules.confirmed('password')]),
    })

    const payload = await request.validate({
      schema: validationSchema,
    })
    user.password = payload.password
    await user.save()
    return response.json({ message: 'Password Changed' })
  }
}
