const broker = require('aedes')({
  //autenticate
  // authenticate: require('./controller/auth.controller')
})

// Handles de erro
broker.on('clientError', (client, err) => {
  console.log('client error', client.id, err.message, err.stack)
})

broker.on('connectionError', (client, err) => {
  console.log('client error', client, err.message, err.stack)
})

// recebimento de uma publish
broker.on('publish', (packet, client)=> {
  if (client) {
    console.info(Date())
    console.log('message from client', client.id)
    console.log(`[${packet.topic}:${client.id}]`, packet.payload.toString())
  }
})

broker.on('subscribe', (subscriptions, client) => {
  if (client) {
    console.log('subscribe from client', client.id, subscriptions)
  }
})

broker.on('unsubscribe', (subscriptions, client) => {
  if (client) {
    console.log('unsubscribe from client', subscriptions, client.id)
  }
})

broker.on('client', (client) => {
  console.log('new client', client.id)
  // Private topic for broadcast
  client.subscribe({topic: `client/${client.id}`}, () => console.log(`private broadcast client/${client.id}`))
})

module.exports = broker