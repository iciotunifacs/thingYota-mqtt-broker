const mosca = require('mosca'); // Importa o modulo Mosca
const settings =require('./settings'); // configurações
// Pode ser integrado a banco de dados como: Redis e MongoDB
const server = new mosca.Server(settings); // Cria um Broker MQTT com base nas configurações

server.on('clientConnected', function (cliente) { // Evento: ocorre quando um novo cliente se conecta ao Broker
    console.log('Cliente Conectado', cliente.id); // Exibe uma mensagem com o ID do cliente conectado
});

server.on('published', function (packet, client) { //  Evento: ocorre quando uma mensagem é Puplicada
    console.log( "Tópico: ", packet.topic, "|Mensagen :",packet.payload.toString(), " | ", new Date().toISOString()); // Exibe uma mensagem com o tópico da mensagem recebida
    try {
        const data =JSON.parse(packet.payload.toString());
        console.log(data);
    } catch(e) {
        const log = {
            status: false,
            code: 500,
            mensage: "Não foi possivel ler a mensagen",
            // err: e
        }
    }
});

server.on('clientDisconnected', function (cliente) {
    console.log('Cliente Desconectado: ', cliente.id);
});

server.on('ready', setup); // Inicio do Broker
function setup() {
    const log = {
        status: true,
        mensage: "Server run",
        port: settings.port
    };
    console.log(log);
}