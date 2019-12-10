const mongodb = require("./mongodb");
const mosca = require("mosca");
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
