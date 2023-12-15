// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SupportTicket from 'App/Models/helpcenter/SupportTicket'
import BaseController from '../BaseController'

export default class SupportTicketsController extends BaseController {
  constructor() {
    super(SupportTicket, {}, {}, 'SupportTicketPolicy')
  }
}
