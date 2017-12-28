const knex = require('knex');
const knexConfig = require('../knexfile');
const connection = knex(knexConfig);
const { raw, transaction } = connection;
const uuidv4 = require('uuid/v4');
const _ = require('lodash');


async function postIdea(request, h) {
  const { text, type, tags } = request.payload;

  try {
    return await transaction(async (trx) => {
      const ideaId = uuidv4();

      const insertIdea = await trx.raw(`INSERT INTO ideas (id, created_at, updated_at, text, done, what, "when", why, how)
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
      const formattedIdea = formatIdea(insertIdea.rows[0]);

      return h.response({
        ...formattedIdea,
        tags,
      }).code(201);
    });
  } catch (err) {
    console.log(err);
    return h.response('Error happened while inserting').code(503);
  }
}

async function fetchIdeas(request, h) {
  try {
    const ideas = await raw(`
    SELECT i.id, i.text, i.created_at, i.done, i.what, i.how, i.why, i.when, i.done, it.tag_name as tags
    FROM ideas i
    LEFT JOIN ideas_tags it on i.id = it.idea_id;
   `);

    const distinctIdeas = filterDuplicateIdeas(ideas.rows);

    return h.response(distinctIdeas.map(formatIdea));
  } catch (err) {
    return h.response('Cant get ideas').code(503);
  }
}

function filterDuplicateIdeas(allIdeas) {
  return allIdeas.reduce((distinctIdeas, possiblyDistinct) =>
    // defaults to null if no tag
    possiblyDistinct.tags
      ? distinctIdeas.length === 0
        // this is first iteration so we want to pass it in
        // since reduce wont run on empty array
        ? distinctIdeas.concat({ ...possiblyDistinct, tags: [possiblyDistinct.tags] })
        : distinctIdeas.reduce((ideas, distinct, index) =>
          distinct.id === possiblyDistinct.id
            ? ideas.concat({ ...distinct, tags: distinct.tags.concat(possiblyDistinct.tags) })
            // if we are on the last index no matches have been found
            : index === distinctIdeas.length - 1
              ? ideas.concat({ ...possiblyDistinct, tags: [possiblyDistinct.tags] })
              : ideas.concat(distinct)
          , [])
      // value doesnt have a tag so it has to be unique
      : distinctIdeas.concat({ ...possiblyDistinct, tags: [] })
    , [])
}

async function fetchTags(request, h) {
  try {
    const tags = await raw(`SELECT * FROM tags`);

    return h.response(tags.rows.map(formatTag));
  } catch (err) {
    return h.response('Cant get tags').code(503);
  }
}

async function filterDuplicateTags(tags) {
  const tagSelectQuery = tags.reduce((query, tag, i) =>
    query.concat(` name = '${tag}' ${i === tags.length - 1 ? '' : 'OR'}`)
    , 'SELECT name FROM tags WHERE');

  const duplicateTags = await raw(tagSelectQuery);
  const duplicateTagNames = duplicateTags.rows.map((tag) => tag.name);

  return duplicateTagNames.length === 0
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
    tags: idea.tags,
  };
}

const formatTag = (tag) => tag.name;

module.exports = {
  postIdea,
  fetchIdeas,
  fetchTags,
};