const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = process.env.PORT || 4000;

// Handles de erro
aedes.on('clientError', function (client, err) {
  console.log('client error', client.id, err.message, err.stack)
})

aedes.on('connectionError', function (client, err) {
  console.log('client error', client, err.message, err.stack)
})

// recebimento de uma publish
aedes.on('publish', function (packet, client) {
  if (client) {
    console.log('message from client', client.id, packet)
    switch(packet.topic) {
      // usar o payload para subsvribe
      case "auth":
        client.subscribe({topic: `auth/${client.id}`}, () => console.log('auth ok'))
        break;
      // usar o payload para onsubscribe
      case "presence":
        aedes.unsubscribe('presence',() => "out")
        break;
      default:
       console.log('ok')
    }
  }
})

aedes.on('subscribe', function (subscriptions, client) {
  /**@TODO criar token com o subscribe */
  if (client) {
    console.log('subscribe from client', subscriptions, client.id)
    client.on('presence',() => "teste")
    client.eventNames('toServer')
    aedes.publish({
      cmd: "publish",
      topic: 'toServer',
      qos: 2,
      payload: "tetse",
      retain: false
      
    }, "retorno do subriscribe")
  }
})

aedes.on('unsubscribe', function (subscriptions, client) {
  /**@TODO desativar token som unsubscribe */
  if (client) {
    console.log('unsubscribe from client', subscriptions, client.id)
  }
})

aedes.on('client', function (client) {
  console.log('new client', client.id)
})

server.listen(port, function () {
  console.log('server started and listening on port ', port)
})