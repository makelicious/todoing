const knex = require('knex');
const knexConfig = require('../knexfile');
const connection = knex(knexConfig);
const { raw, transaction } = connection;
const uuidv4 = require('uuid/v4');
const _ = require('lodash');


async function saveIdea(payload) {
  const { text, type, tags } = payload;

  return await transaction(async (trx) => {
    const ideaId = uuidv4();

    const savedIdea = await trx.raw(`INSERT INTO ideas (id, created_at, updated_at, text, what, "when", why, how)
      VALUES (:ideaId, now(), NULL, :text, :what, :when, :why, :how) RETURNING *`, { ...type, text, ideaId });

    if (tags.length > 0) {
      const distinctTags = await filterDuplicateTags(tags);

      if (distinctTags.length > 0) {
        const insertQueries = distinctTags.reduce((queries, tag, i) => {
          const tagId = uuidv4();
          return {
            tags: queries.tags.concat(` ('${tagId}', now(), NULL, '${tag}') ${i === distinctTags.length - 1 ? '' : ','}`),
            ideasTags: queries.ideasTags.concat(` ('${ideaId}', '${tagId}') ${i === distinctTags.length - 1 ? '' : ','}`),
          };
        }, {
            tags: 'INSERT INTO tags (id, created_at, updated_at, name) VALUES',
            ideasTags: 'INSERT INTO ideas_tags (idea_id, tag_id) VALUES',
          });

        await trx.raw(insertQueries.tags);
        await trx.raw(insertQueries.ideasTags);
      }
    }
    const [saved] = savedIdea.rows;

    return {
      ...formatIdea(saved),
      tags,
    };
  });
}

async function getAllIdeas() {
  const ideas = await raw(`
    SELECT i.id, i.text, i.created_at, i.what, i.how, i.why, i.when, t.name AS tags
    FROM ideas i
    LEFT JOIN ideas_tags it ON i.id = it.idea_id
    LEFT JOIN tags t ON t.id = it.tag_id;
  `);
  const uniqueIdeas = filterDuplicateIdeas(ideas.rows);

  return uniqueIdeas.map(formatIdea);
}


async function getAllTags() {
  const tags = await raw(`SELECT * FROM tags`);

  return tags.rows.map(formatTag);
}

async function deleteIdeaById(id) {
  const idea = await raw(`DELETE FROM ideas
    WHERE id = '${id}' RETURNING *;`);

  return idea.rows[0];
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

function filterDuplicateIdeas(allIdeas) {
  const uniqueIdeasById = _.uniqBy(allIdeas, 'id')

  return uniqueIdeasById.map((uniqueIdea) => {
    const listOfTagsMatchingThisUniqueId =
      allIdeas.filter((idea) => idea.id === uniqueIdea.id).map(({ tags }) => tags)

    return { ...uniqueIdea, tags: listOfTagsMatchingThisUniqueId }
  });
}


function formatIdea(idea) {
  return {
    id: idea.id,
    createdAt: idea.created_at,
    text: idea.text,
    type: {
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
  saveIdea,
  getAllIdeas,
  getAllTags,
  deleteIdeaById,
};

