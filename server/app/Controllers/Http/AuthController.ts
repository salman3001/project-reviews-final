import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import AdminUser from 'App/Models/adminUser/AdminUser'

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
}
