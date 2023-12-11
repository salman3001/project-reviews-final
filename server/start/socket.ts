import UserSocketController from 'App/Controllers/ws/UserSocketController'
import TicketChatController from 'App/Controllers/ws/TicketChatController'
import wsAuth from 'App/Middleware/wsAuth'
import Ws from 'App/services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */

const userSocketIo = Ws.io.of('/user-socket/').use(wsAuth)
const ticketChatIo = Ws.io.of('/ticket_chat/').use(wsAuth)

ticketChatIo.on('connection', (socket) => {
  const controller = new TicketChatController(socket)
  controller.execute()
})

userSocketIo.on('connection', (socket) => {
  const controller = new UserSocketController(socket, userSocketIo)
  controller.execute()
})
