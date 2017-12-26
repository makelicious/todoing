const knex = require('knex');
const knexConfig = require('../knexfile');
const connection = knex(knexConfig);
const { raw, transaction } = connection;
const uuidv4 = require('uuid/v4');
const _ = require('lodash');


async function postIdea(request, h) {
  const { text, type, tags } = request.payload;
  const ideaId = uuidv4();

  return await transaction(async (trx) => {
    try {
      const insertedIdea = await trx.raw(`INSERT INTO ideas (id, created_at, updated_at, text, done, what, "when", why, how)
      VALUES (:ideaId, now(), NULL, :text, :done, :what, :when, :why, :how) RETURNING *`, { ...type, text, ideaId })

      if (tags.length > 0) {
        const distinctTags = await filterDuplicateTags(tags);

        if (distinctTags.length > 0) {
          const insertQueries = distinctTags.reduce((queries, tag, i) => ({
            tags: queries.tags.concat(` ('${uuidv4()}', now(), NULL, '${tag}') ${i === distinctTags.length - 1 ? '' : ','}`),
            ideasTags: queries.ideasTags.concat(` ('${ideaId}', '${tag}') ${i === distinctTags.length - 1 ? '' : ','}`),
          }), {
              tags: 'INSERT INTO tags (id, created_at, updated_at, name) VALUES',
              ideasTags: 'INSERT INTO ideas_tags (idea_id, tag_name) VALUES',
            });

          await trx.raw(insertQueries.tags);
          await trx.raw(insertQueries.ideasTags);
        }
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

async function filterDuplicateTags(tags) {
  const tagSelectQuery = tags.reduce((query, tag, i) =>
    query.concat(` name = '${tag}' ${i === tags.length - 1 ? '' : 'OR'}`)
    , 'SELECT name FROM tags WHERE');

  const duplicateTags = await raw(tagSelectQuery);
  const duplicateTagNames = duplicateTags.rows.map((tag) => tag.name);

  return duplicateTags.rows.length === 0
    ? tags
    : _.reject(tags, (tag) => _.includes(duplicateTagNames, tag));
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