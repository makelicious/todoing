const knex = require('knex');
const knexConfig = require('../knexfile');
const connection = knex(knexConfig);
const { raw } = connection;


async function postIdea(request, h) {
  const { text, type } = request.payload;

  try {
    const insertedIdea = await raw(`INSERT INTO ideas (created_at, updated_at, text, done, what, "when", why, how)
        VALUES (now(), NULL, :text, :done, :what, :when, :why, :how) RETURNING created_at, id`, { ...type, text })

    return h.response(insertedIdea.rows).code(201);
  } catch (err) {
    return h.response('Error happened while inserting').code(503);
  }
}

async function getIdeas(request, h) {
  try {
    const ideas = await raw(`SELECT * FROM ideas`);
    return h.response(ideas.rows.map(formatIdea));
  }
  catch (err) {
    return h.response('Cant get ideas').code(500);
  }
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