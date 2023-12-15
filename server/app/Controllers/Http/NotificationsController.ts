import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Notification from 'App/Models/Notification'
import AdminUser from 'App/Models/adminUser/AdminUser'
import User from 'App/Models/user/User'
import BaseController, { IndexQs } from './BaseController'
import { filterRecords } from 'App/Helpers/filters'

export default class NotificationsController extends BaseController {
  constructor() {
    super(Notification, {}, {}, 'NotificationPolicy')
  }
  public async index({ request, response, auth }: HttpContextContract) {
    const user = auth.user
    let qs = request.qs() as IndexQs

    if (!user) {
      return response.unauthorized()
    }
    let records: any[] = []

    if (user instanceof AdminUser) {
      const newQs: IndexQs = { ...qs, filter: { admin_user_id: user.id.toString() } }
      records = await filterRecords(Notification, newQs)
    }

    if (user instanceof User) {
      const newQs: IndexQs = { ...qs, filter: { user_id: user.id.toString() } }
      records = await filterRecords(Notification, newQs)
    }

    return response.json(records)
  }

  public async getUnread({ response, auth }: HttpContextContract) {
    const user = auth.user as AdminUser

    let notifcations: any[] = []
    let count: any = 0

    if (user) {
      await user.load('notifications', (b) => {
        b.whereNull('read_At').orderBy('created_at').limit(20)
      })

      if (user instanceof AdminUser) {
        const query = await Database.query()
          .from('notifications')
          .select('id')
          .where('admin_user_id', user.id)
          .count('* as count')
          .first()

        count = query.count
      }

      if (user instanceof User) {
        const query = await Database.query()
          .from('notifications')
          .select('id')
          .where('user_id', user.id)
          .count('* as count')
          .first()

        count = query.count
      }

      notifcations = user.notifications

      console.log(count)
    }

    return response.json({ notifcations, count })
  }

  public async destroyRead({ response, auth }: HttpContextContract) {
    const user = auth.user
    if (user) {
      await (user as AdminUser).load('notifications', (n) => {
        n.whereNotNull('read_At')
      })

      for (const n of user.notifications) {
        await n.delete()
      }
    }

    return response.json({ message: 'record deleted' })
  }

  public async destroyAll({ response, auth }: HttpContextContract) {
    const user = auth.user

    if (user) {
      await (user as AdminUser).load('notifications')

      for (const n of user.notifications) {
        await n.delete()
      }
    }

    return response.json({ message: 'record deleted' })
  }
}
