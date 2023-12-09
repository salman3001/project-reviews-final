import Ws from '@ioc:Ruby184/Socket.IO/Ws'

Ws.namespace('/')
  .connected('TestController.onConnected')
  .disconnected('TestController.onDisconnected')
