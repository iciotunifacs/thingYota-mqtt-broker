const mongodb = require("./mongodb");
module.exports = {
    port: 3030,
    host: "localhost",
    keepalive: 10000,
    backend: {
        type: 'mongo',
        url: mongodb.url,
        pubsubCollection: 'teste',
        mongo: {}
    },
    persistence: {
        // factory: mosca.persistence.Mongo,
        url: mongodb.url,
    },
}
