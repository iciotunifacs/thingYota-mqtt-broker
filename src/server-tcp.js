/**
 * Module dependencies.
 */
let pathUrl = "";
switch (process.env.NODE_ENV) {
  case "development":
    pathUrl = "dev.env"
    break;
  case "development-docker":
    pathUrl = "dev-docker.env"
    break;
  default:
    pathUrl = "prod.env"
    break;
}
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, "../env",pathUrl)
});

const env = require('../env/');

const broker = require('./broker');
const server = require('net').createServer(broker.handle);
const port = process.env.TCP_PORT;

server.listen(port, () => {
  console.log("tcp", port)
})