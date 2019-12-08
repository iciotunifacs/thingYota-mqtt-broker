const redis = require('redis');
// cliente redis
const client = redis.createClient();

module.exports = client;