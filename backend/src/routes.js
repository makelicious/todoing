const { postIdea, getIdeas } = require('./handlers');

const routes = [
  {
    method: 'POST',
    path: '/ideas',
    options: {
      cors: true,
    },
    handler: postIdea,
  },
  {
    method: 'GET',
    path: '/ideas',
    options: {
      cors: true,
    },
    handler: getIdeas,
  },
];


module.exports = routes;