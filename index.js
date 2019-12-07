const mosca = require('mosca'); // Importa o modulo Mosca
const settings =require('./settings'); // configurações
const Logger = require('./log'); // Estrutura de log para trabalhar com as callbacks
const Log = Logger.construct;
const showLog = Logger.print;
// const redis = require('./redis'); //Usando o redis como cache

// Pode ser integrado a banco de dados como: Redis e MongoDB
const broker = new mosca.Server(settings); // Cria um Broker MQTT com base nas configurações

// Evento: ocorre quando um novo cliente se conecta ao Broker
broker.on('clientConnected', (client, error) => { 
    // Exibe uma mensagem com o ID do cliente conectado
    const log = Log({client: client.id.toString()});

    // tratamento de error
    if (error) {
        log.code = 200;
        log.status = "Error";
        log.message = "Não foi possivel fazer subscribe";
        log.Type = "Connect";
    } else {
        log.message = "Cadastro realizado com sucesso";
    }
    console.log(showLog(log));
});

//  Evento: ocorre quando uma mensagem é Puplicada
broker.on('published', function (packet, client,message) { 
    // Exibe uma mensagem com o tópico da mensagem recebida
    const log = Log({ packet: packet.payload.toString(), Type: "Publish"});
    // TODO: configurar mensagen
    // mostra message se tiver alguma
    message || message !== undefined ? log.message = message : log.message = "void";
    console.log(showLog(log));
});

broker.on('clientDisconnected', function (client,error) {
        // Exibe uma mensagem com o ID do cliente conectado
        const log = Log({client: client.id, topic: client.topic});
        // tratamento de error
        if (error) {
            log.code = 200;
            log.status = "Error";
            log.error = error;
            log.message = "Não foi possivel fazer unsubscribe";
            // console.log(`\nType: Subscribe Status: ${log.status} Code: ${log.code} Message: ${log.message} Error: ${log.error}`);
        } else {
            log.message = "Desconexão realizado com sucesso";
        }
        console.log(showLog(log));
});

// Inicio do Broker
broker.on('ready', setup); 
function setup() {
    const log = Log({status: true, mensage: "Server run", port: settings.port});
    console.log(showLog(log));
}