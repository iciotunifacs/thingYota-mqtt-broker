const mosca = require('mosca'); // Importa o modulo Mosca
const settings =require('./settings'); // configurações

// Pode ser integrado a banco de dados como: Redis e MongoDB
const broker = new mosca.Server(settings); // Cria um Broker MQTT com base nas configurações

// Evento: ocorre quando um novo cliente se conecta ao Broker
broker.on('clientConnected', function (cliente) { 
    // Exibe uma mensagem com o ID do cliente conectado
    console.log('Cliente Conectado', cliente.id); 
});

//  Evento: ocorre quando uma mensagem é Puplicada
broker.on('published', function (packet, client) { 
    // Exibe uma mensagem com o tópico da mensagem recebida
    console.log( "Tópico: ", packet.topic, "|Mensagen :",packet.payload.toString(), " | ", new Date().toISOString()); 
    // tratando para trabalhar em json
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

broker.on('clientDisconnected', function (cliente) {
    console.log('Cliente Desconectado: ', cliente.id);
});

// Inicio do Broker
broker.on('ready', setup); 
function setup() {
    const log = {
        status: true,
        mensage: "Server run",
        port: settings.port
    };
    console.log(log);
}