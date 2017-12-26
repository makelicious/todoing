const { postIdea, fetchIdeas, fetchTags } = require('./handlers');

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
    handler: fetchIdeas,
  },
  {
    method: 'GET',
    path: '/tags',
    options: {
      cors: true,
    },
    handler: fetchTags,
  },
];


module.exports = routes;