const Hapi = require('hapi');
const routes = require('./routes');
const config = require('../config');

async function createServer() {
  const server = Hapi.server({
    host: config.HOST,
    port: parseInt(config.PORT),
  });
  server.route(routes);

  return server;
}

exports.create = createServer;