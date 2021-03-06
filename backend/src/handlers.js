const knex = require('knex');
const knexConfig = require('../knexfile');
const connection = knex(knexConfig);
const { raw, transaction } = connection;
const uuidv4 = require('uuid/v4');
const {
  saveIdea,
  getAllIdeas,
  getAllTags,
  deleteIdeaById,
} = require('./services');


async function postIdea(request, h) {
  const { text, type, tags } = request.payload;

  try {
    const { payload } = request;
    const savedIdea = await saveIdea(payload);

    return h.response(savedIdea).code(201);
  } catch (err) {
    console.log(err);
    return h.response('Error happened while inserting').code(503);
  }
}

async function fetchIdeas(request, h) {
  try {
    const ideas = await getAllIdeas();

    return h.response(ideas);
  } catch (err) {
    console.log(err);
    return h.response('Cant get ideas').code(503);
  }
}

async function fetchTags(request, h) {
  try {
    const tags = await getAllTags();

    return h.response(tags);
  } catch (err) {
    return h.response('Cant get tags').code(503);
  }
}

async function deleteIdea(request, h) {
  try {
    const { payload } = request;
    const deletedId = await deleteIdeaById(payload);

    return h.response(deletedId).code(201);
  } catch (err) {
    console.log(err);
    return h.response('foo').code(500);
  }
}


module.exports = {
  postIdea,
  fetchIdeas,
  fetchTags,
  deleteIdea,
};