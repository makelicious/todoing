/*eslint no-console: "off"*/

const Hapi = require('hapi');
const routes = require('./routes');
const config = require('../config');
const server = require('../server');


async function startServer() {
  const serverInstance = await server.create();

  try {
    await serverInstance.start();
  }
  catch (err) {
    console.log(err);
  }

  console.log('Server running smoothly');
}

startServer();

