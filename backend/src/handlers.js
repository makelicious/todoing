const knex = require('knex');
const knexConfig = require('../knexfile');
const connection = knex(knexConfig);
const { raw } = connection;


function postIdea(request, h) {
  const { text, type } = request.payload;
  const { what, when, why, how, done } = type;
  const postgresParams = {
    text,
    done,
    what,
    when,
    why,
    how,
  };

  raw(`INSERT INTO ideas (created_at, updated_at, text, done, what, "when", why, how)
      VALUES (now(), NULL, :text, :done, :what, :when, :why, :how)`, postgresParams)
    .catch(() => h.response('Server error').code(503));

  return h.response('coolio').code(201);
}

async function getIdeas(request, h) {
  const ideas = await raw(`SELECT * FROM ideas`);

  return h.response(ideas.rows.map(formatIdea));
}


function formatIdea(idea) {
  return {
    id: idea.id,
    created_at: idea.created_at,
    text: idea.text,
    type: {
      done: idea.done,
      when: idea.when,
      what: idea.what,
      why: idea.why,
      how: idea.how,
    },
  };
}

module.exports = {
  postIdea,
  getIdeas,
};