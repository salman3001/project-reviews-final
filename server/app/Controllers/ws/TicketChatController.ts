import { permissions } from 'App/Helpers/enums'
import { hasPermission } from 'App/Helpers/permissionHelpers'
import { isAdmin } from 'App/Helpers/permissionHelpers'
import SupportTicket from 'App/Models/helpcenter/SupportTicket'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export default class TicketChatController {
  constructor(private socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {}
  private ticket: null | SupportTicket = null
  private room: string | null = null

  public async execute() {
    this.socket.on('join-chat', async (ticketId: number, cb: any) => {
      console.log(ticketId)
      console.log(cb)
      cb({
        status: 'ok',
      })
      if (await this.isAllowed(this.socket.handshake.auth?.user)) {
        this.room = await this.createChatRoom(ticketId)

        this.room && this.socket.join(this.room!) && cb(`Joined toom ${this.room}`)
      }
    })

    this.socket.on('chat-message', (message: string) => {
      this.room && this.socket.to(this.room).emit(message)
      console.log(message)
    })
  }

  private async createChatRoom(ticketId: number): Promise<string | null> {
    const ticket = await SupportTicket.findBy('id', ticketId)

    if (ticket) {
      this.ticket = ticket
      return `ticket-room-${ticket.id}`
    } else {
      return null
    }
  }

  private async isAllowed(user: any): Promise<boolean> {
    if (this.ticket && this.ticket.userId === user.id) {
      return true
    }

    if (isAdmin(user) && (await hasPermission(user, permissions.MANAGE_TICKETS))) {
      return true
    }

    return false
  }
}
