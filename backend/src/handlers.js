const knex = require('knex');
const knexConfig = require('../knexfile');
const connection = knex(knexConfig);
const { raw } = connection;


function postIdea(request, h) {
  const { text, tags, done, type } = request.payload;
  const { what, when, why, how } = type;
  const postgresParams = {
    text,
    done,
    what,
    when,
    why,
    how,
  };

  raw(`INSERT INTO ideas (created_at, updated_at, idea, done, what, "when", why, how)
      VALUES (now(), NULL, :text, :done, :what, :when, :why, :how)`, postgresParams)
    .catch(err => h.response('Server error').code(503));

  return h.response('coolio').code(201);
}


module.exports = {
  postIdea,
};