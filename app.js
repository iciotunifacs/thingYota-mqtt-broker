const path = require('path');
require('dotenv').config({
  path: process.env.NODE_ENV == 'development' ? path.resolve(__dirname,'.env.development') : path.resolve(__dirname, '.env')
})

const broker = require('./config/broker')
const server = require('./config/server').createServer(broker.handle)

// Handles de erro
broker.on('clientError', function (client, err) {
  console.log('client error', client.id, err.message, err.stack)
})

broker.on('connectionError', function (client, err) {
  console.log('client error', client, err.message, err.stack)
})

// recebimento de uma publish
broker.on('publish', function (packet, client) {
  if (client) {
    console.info(Date())
    console.log('message from client', client.id)
    console.log(`[${packet.topic}:${client.id}]`, packet.payload.toString())
  }
})

broker.on('subscribe', function (subscriptions, client) {
  /**@TODO criar token com o subscribe */
  if (client) {
    console.log('subscribe from client', client.id, subscriptions)
  }
})

broker.on('unsubscribe', function (subscriptions, client) {
  /**@TODO desativar token som unsubscribe */
  if (client) {
    console.log('unsubscribe from client', subscriptions, client.id)
  }
})

broker.on('client', function (client) {
  console.log('new client', client.id)
  // Private topic for broadcast
  client.subscribe({topic: `client/${client.id}`}, () => console.log('auth ok'))
})

server.listen(process.env.PORT,  ()=> {
  console.log(`server started and listening on port ${process.env.PORT}`)
})
