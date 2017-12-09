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