const config = require('./config.js');

module.exports = {
  client: 'postgres',
  connection: config.DATABASE_URL,
};
