const mosca = require('mosca'); // Importa o modulo Mosca
const settings =require('./settings'); // configurações
const Log = require('./log'); // Estrutura de log para trabalhar com as callbacks
// Pode ser integrado a banco de dados como: Redis e MongoDB
const broker = new mosca.Server(settings); // Cria um Broker MQTT com base nas configurações

// Evento: ocorre quando um novo cliente se conecta ao Broker
broker.on('clientConnected', (client, error) => { 
    // Exibe uma mensagem com o ID do cliente conectado
    const log = Log({client: client.id, topic: client.topic});
    // tratamento de error
    if (error) {
        log.code = 200;
        log.status = "Error";
        log.error = error;
        log.message = "Não foi possivel fazer subscribe";
        console.log(`\nType: Subscribe Status: ${log.status} Code: ${log.code} Message: ${log.message} Error: ${log.error}`);
    } else {
        log.message = "Cadastro realizado com sucesso";
    }
    console.log(`\nType: Subscribe Status: ${log.status} Code: ${log.code} Message: ${log.message}`);
});

//  Evento: ocorre quando uma mensagem é Puplicada
broker.on('published', function (packet, client,message) { 
    // Exibe uma mensagem com o tópico da mensagem recebida
    const log = Log({
        packet: packet.payload.toString(),
        mensage: message
    });
    console.log(`\nType: Pulish Status: ${log.status} Code: ${log.code} Payload: ${log.packet}`);
});

broker.on('clientDisconnected', function (client,error) {
        // Exibe uma mensagem com o ID do cliente conectado
        const log = Log({client: client.id, topic: client.topic});
        // tratamento de error
        if (error) {
            log.code = 200;
            log.status = "Error";
            log.error = error;
            log.message = "Não foi possivel fazer subscribe";
            console.log(`\nType: Subscribe Status: ${log.status} Code: ${log.code} Message: ${log.message} Error: ${log.error}`);
        } else {
            log.message = "Cadastro realizado com sucesso";
        }
        console.log(`\nType: Subscribe Status: ${log.status} Code: ${log.code} Message: ${log.message}`);
    // console.log('Cliente Desconectado: ', cliente.id);
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