import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminUser from 'App/Models/adminUser/AdminUser'
import AdminUserNotifications from 'App/Models/adminUser/AdminUserNotifications'

export default class NotificationsController {
  public async index({ request, response, auth }: HttpContextContract) {
    const { type } = request.qs()
    const user = auth.user

    let notifcations: any[] = []
    let count = { total: 0, unread: 0 }

    if (user) {
      await (user as AdminUser).load('notifications')
      const unread = await user.notifications
      count.total = user?.notifications?.length
      count.unread = unread.length

      if (type == 'all' || !type) {
        notifcations = user.notifications
      }

      if (type === 'unread') {
        notifcations = unread
      }
    }

    return response.json({ notifcations, count })
  }

  public async getUnread({ response, auth }: HttpContextContract) {
    const user = auth.user as AdminUser

    let notifcations: any[] = []
    let count = 0

    if (user) {
      await user.load('notifications', (b) => {
        b.whereNull('read_At').orderBy('created_at').limit(2)
      })

      notifcations = user.notifications

      const c = await AdminUserNotifications.query()
        .where('notifiableId', user.id)
        .count('* as total')

      console.log(c[0].$extras.total)
    }

    return response.json({ notifcations, count })
  }

  // public async store({ request, response }: HttpContextContract) {
  //   return response.json({ message: 'record created', data: record })
  // }

  // public async show({ params, response, request }: HttpContextContract) {
  // }

  // public async update({ request, response, params }: HttpContextContract) {
  // }

  public async destroy({ params, response, auth }: HttpContextContract) {
    const user = auth.user
    if (user) {
      await (user as AdminUser).load('notifications', (q) => {
        q.where('id', params.id)
      })

      for (const n of user.notifications) {
        await n.delete()
      }
    }

    return response.json({ message: 'record deleted' })
  }

  public async destroyRead({ response, auth }: HttpContextContract) {
    const user = auth.user
    if (user) {
      const notifcations = await user.readNotifications()

      for (const n of notifcations) {
        await n.delete()
      }
    }

    return response.json({ message: 'record deleted' })
  }

  public async destroyAll({ response, auth }: HttpContextContract) {
    const user = auth.user
    console.log(user)

    if (user) {
      await (user as AdminUser).load('notifications')
      console.log(user.notifications)

      for (const n of user.notifications) {
        await n.delete()
      }
    }

    return response.json({ message: 'record deleted' })
  }
}
