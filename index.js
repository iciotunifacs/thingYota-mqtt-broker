const mosca = require("mosca");
// configurações do broken
const settings = {
    port: 3030
}

// criação do servidor
const server = new mosca.Server(settings);

// mensagen exibida ao iniciar o server
server.on('ready', () => console.log('server on'));

