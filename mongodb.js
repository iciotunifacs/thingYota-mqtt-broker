const pubsubsettings = {
    //using ascoltatore
    type: 'mongo',		
    url: 'mongodb+srv://admin:admin@cluster0-ezr1n.mongodb.net/test?retryWrites=true&w=majority',
    pubsubCollection: 'ascoltatori',
    mongo: {}
};

module.exports= pubsubsettings;