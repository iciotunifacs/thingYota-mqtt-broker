const mosca = require('mosca'); // Importa o modulo Mosca
const brokerSettings = require('./broker-settings'); // configurações
const Logger = require('./log'); // Estrutura de log para trabalhar com as callbacks
const Log = Logger.construct;
const showLog = Logger.print;
const mongodb = require('./mongodb');
// const redis = require('./redis'); //Usando o redis como cache


// Pode ser integrado a banco de dados como: Redis e MongoDB
const broker = new mosca.Server(brokerSettings); // Cria um Broker MQTT com base nas configurações

// Evento: ocorre quando um novo cliente se conecta ao Broker
broker.on('clientConnected', (client, error) => {
    // Exibe uma mensagem com o ID do cliente conectado
    const log = Log({ client: client.id.toString() });

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
broker.on('published', function (packet, client, message) {
    console.log(packet.topic);
    console.log(packet.payload);
    // Exibe uma mensagem com o tópico da mensagem recebida
    // const log = Log({ data: packet.payload.toString(), Type: "Publish" });
    // TODO: configurar mensagen
    // mostra message se tiver alguma
    // message || message !== undefined ? log.message = message : log.message = "void";
    // console.log(showLog(log));
});

broker.on('clientDisconnected', function (client, error) {
    // Exibe uma mensagem com o ID do cliente conectado
    const log = Log({ client: client.id, topic: client.topic });
    // tratamento de error
    if (error) {
        log.code = 200;
        log.status = "Error";
        log.error = error;
        log.message = "Não foi possivel fazer unsubscribe";
    } else {
        log.message = "Desconexão realizado com sucesso";
    }
    // console.log(showLog(log));
});


// Inicio do Broker
broker.on('ready', setup);
function setup() {
    const log = Log({ status: true, mensage: "Server run", port: brokerSettings.port });
    // console.log(showLog(log));
    let nmessage = {
        topic: '/hello/world',
        payload: 'abcde', // or a Buffer
        qos: 0, // 0, 1, or 2
        retain: true // or true
    };

    broker.publish(nmessage, function () {
        console.log('done!');
    });

}