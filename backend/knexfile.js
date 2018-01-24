const config = require('./config.js');

module.exports = {
  client: 'postgres',
  connection: config.DATABASE_URL,
  migrations: {
    directory: `${__dirname}/migrations`,
  },
  seeds: {
    directory: `${__dirname}/seeds/test`,
  }
};
