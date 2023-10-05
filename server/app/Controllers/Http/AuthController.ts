import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminUser from 'App/Models/adminUser/AdminUser'

export default class AuthController {
  public async adminLogin({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('adminUserApi').attempt(email, password, {
        expiresIn: '1 day',
      })

      const user = await AdminUser.findBy('email', email)
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
