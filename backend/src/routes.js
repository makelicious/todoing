const { postIdea, fetchIdeas, fetchTags, deleteIdea } = require('./handlers');

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
  {
    method: 'DELETE',
    path: '/ideas/{id}',
    options: {
      cors: true,
    },
    handler: deleteIdea,
  },
];


module.exports = routes;