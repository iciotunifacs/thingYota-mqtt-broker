require("dotenv").config();

const mosca = require('mosca'); // Importa o modulo Mosca
const Logger = require('./log'); // Estrutura de log para trabalhar com as callbacks
const Log = Logger.construct;
const showLog = Logger.print;
const PORT = 3030 || process.env.PORT;

const auth = require('./auth');
// Setup broken
const brokerSettings = {
    port : PORT,
    host : process.env.HOST,
    keepalive: 10000,
    // backend : {
    //     type: 'mongo',		
    //     url: mongodb.url,
    //     pubsubCollection: 'ascoltatori',
    //     mongo: {}
    // },
    // persistence: {
    //     // factory: mosca.persistence.Mongo,
    //     url: process.env.DB,
    // },
}

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
    const log = Log({ data: packet.payload.toString(), Type: "Publish" });
    // mostra message se tiver alguma
    message || message !== undefined ? log.message = message : log.message = "void";
    console.log(showLog(log));
    // Transforma em stringBuff e faz tratamento
    const stringBuf = packet.payload.toString('utf-8')
    try {
        // Transporr para json
        const json = JSON.parse(stringBuf);
        // verificar os tópicos
        switch(packet.topic) {
            case "alunos/registro":
                try {
                    // Dados do brooken
                    const data = json;
                    // Valiudaçãpo de aluno
                    const aulonoId = auth.seachUser(data.aluno);
                    // Validação de aula
                    const aulaId = auth.seachAula(data.aula)
                    if(aulonoId && aulaId) {
                        // Registro
                        auth.registerAula(data.aula,data.aluno);
                        console.log("data has save")
                    }
                } catch (error) {
                    console.log(error);
                }
                break;
        }
    } catch (error) {
        console.log("Invalid" );
    }
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
async function setup() {
    const log = Log({status: true, mensage: "Server run", port: brokerSettings.port});
    console.log(showLog(log));
}