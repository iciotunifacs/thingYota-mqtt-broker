const aedes = require('aedes')({
  //autenticate
  // authenticate: require('./controller/auth.controller')
})
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
    console.info(Date())
    console.log('message from client', client.id)
    console.log(`[${packet.topic}:${client.id}]`, packet.payload.toString())
  }
})

aedes.on('subscribe', function (subscriptions, client) {
  /**@TODO criar token com o subscribe */
  if (client) {
    console.log('subscribe from client', client.id, subscriptions)
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
  // Private topic for broadcast
  client.subscribe({topic: `client/${client.id}`}, () => console.log('auth ok'))
})

server.listen(port, function () {
  console.log('server started and listening on port ', port)
})
