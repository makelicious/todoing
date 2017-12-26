const knex = require('knex');
const knexConfig = require('../knexfile');
const connection = knex(knexConfig);
const { raw, transaction } = connection;
const uuidv4 = require('uuid/v4');


async function postIdea(request, h) {
  const { text, type, tags } = request.payload;
  const ideaId = uuidv4();

  return await transaction(async (trx) => {
    try {
      const insertedIdea = await trx.raw(`INSERT INTO ideas (id, created_at, updated_at, text, done, what, "when", why, how)
      VALUES (:ideaId, now(), NULL, :text, :done, :what, :when, :why, :how) RETURNING *`, { ...type, text, ideaId })

      if (tags.length > 0) {
        const queries = tags.reduce((queries, tag, i) => ({
          tagQuery: queries.tagQuery.concat(` ('${uuidv4()}', now(), NULL, '${tag}') ${i === tags.length - 1 ? '' : ','}`),
          ideasTagQuery: queries.ideasTagQuery.concat(` ('${ideaId}', '${tag}') ${i === tags.length - 1 ? '' : ','}`),
        }), {
            tagQuery: 'INSERT INTO tags (id, created_at, updated_at, name) VALUES',
            ideasTagQuery: 'INSERT INTO ideas_tags (idea_id, tag_name) VALUES',
          });

        await trx.raw(queries.tagQuery);
        await trx.raw(queries.ideasTagQuery);
      }

      return h.response(formatIdea(insertedIdea.rows[0])).code(201);
    } catch (err) {
      console.log(err);
      return h.response('Error happened while inserting').code(503);
    }
  });
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
    createdAt: idea.created_at,
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