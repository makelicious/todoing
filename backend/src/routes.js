const { postIdea, getIdeas, getTags } = require('./handlers');

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
  {
    method: 'GET',
    path: '/tags',
    options: {
      cors: true,
    },
    handler: getTags,
  },
];


module.exports = routes;