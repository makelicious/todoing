const {
  saveIdea,
  getAllIdeas,
  getAllTags,
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


module.exports = {
  postIdea,
  fetchIdeas,
  fetchTags,
};
