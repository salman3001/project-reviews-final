import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import AdminUser from 'App/Models/adminUser/AdminUser'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/user/User'

export default class AuthController {
  public async adminLogin({ auth, request, response }: HttpContextContract) {
    const payloadSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.normalizeEmail({ allLowercase: true }),
      ]),
      password: schema.string({ trim: true }),
    })

    const payload = await request.validate({ schema: payloadSchema })

    try {
      const token = await auth.use('adminUserApi').attempt(payload.email, payload.password, {
        expiresIn: '1 day',
      })

      const user = await AdminUser.findBy('email', payload.email)
      await user?.load('role', (role) => {
        role.preload('permissions')
      })

      return { token, user }
    } catch (error) {
      return response.unauthorized({
        message: 'Failed to login. Check your credentials!',
      })
    }
  }

  public async adminLogout({ auth, response }: HttpContextContract) {
    await auth.use('adminUserApi').revoke()
    return response.json({ message: 'Logout Success!' })
  }

  public async updateUserPassword({ params, response, request }: HttpContextContract) {
    const validationSchema = schema.create({
      password: schema.string({ trim: true }, [rules.minLength(8)]),
      password_confirmation: schema.string({ trim: true }, [rules.confirmed('password')]),
      old_password: schema.string({ trim: true }),
    })

    const payload = await request.validate({
      schema: validationSchema,
    })

    const user = await User.findOrFail(+params.id)

    if (await Hash.verify(user.password, payload.password)) {
      const newPassword = await Hash.make(payload.password)
      user.password = newPassword
      await user.save()
      return response.json({ message: 'Password Changed' })
    } else {
      return response.forbidden({ message: 'Old Password dont match' })
    }
  }
}
