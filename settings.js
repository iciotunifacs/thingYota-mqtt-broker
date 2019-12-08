// setting broken bakend using mongodb
const pubsubsettings = {
    //using ascoltatore
    type: 'mongo',		
    url: 'mongodb://vraton:teste@my-1st-crud-shard-00-00-hfrqv.azure.mongodb.net:27017,my-1st-crud-shard-00-01-hfrqv.azure.mongodb.net:27017,my-1st-crud-shard-00-02-hfrqv.azure.mongodb.net:27017/test?ssl=true&replicaSet=my-1st-crud-shard-0&authSource=admin&retryWrites=true&w=majority',
    pubsubCollection: 'ascoltatori',
    mongo: {}
};

// setings do broker
module.exports = {
    port : 3030,
    host : "localhost",
    keepalive: 10000,
    backend : pubsubsettings,
}

