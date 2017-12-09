/*eslint no-console: "off"*/

const Hapi = require('hapi');
const routes = require('./routes');
const config = require('../config');

async function startServer() {
  const server = Hapi.server({
    host: config.HOST,
    port: parseInt(config.PORT),
  });

  server.route(routes);

  try {
    await server.start();
  }
  catch (err) {
    console.log(err);
  }

  console.log('Server running smoothly');
}

startServer();
