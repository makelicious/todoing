const knex = require('knex');
const knexConfig = require('../knexfile');
const connection = knex(knexConfig);
const { raw } = connection;

const { postIdea } = require('./handlers');

const routes = [
  {
    method: 'POST',
    path: '/ideas',
    options: {
      cors: true,
    },
    handler: postIdea,
  },
];


module.exports = routes;