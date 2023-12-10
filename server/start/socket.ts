import TicketChatController from 'App/Controllers/ws/TicketChatController'
import wsAuth from 'App/Middleware/wsAuth'
import Ws from 'App/services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */

const ticketChat = Ws.io.of('/ticket_chat/')
ticketChat.use(wsAuth)
ticketChat.on('connection', (socket) => {
  const controller = new TicketChatController(socket)
  controller.execute()
})
