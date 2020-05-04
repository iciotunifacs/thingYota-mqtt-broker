module.exports = {
  sever: {
    name: process.env.SERVER_NAME,
    port: process.env.PORT
  },
  debug: process.env.DEBUG,
  api: {
    auth: process.env.API_REST
  },
  env: process.env.NODE_ENV
}