const knex = require('knex');
const knexConfig = require('../knexfile');
const connection = knex(knexConfig);
const { raw, transaction } = connection;

const ideaSeed = require('../seeds/ideas');
const tagSeed = require('../seeds/tags');
const ideasTags = require('../seeds/tags');
const serverInstance = require('../src/server');

async function resetDatabase() {
  await ideaSeed.seed();
  await tagSeed.seed();
  await ideasTags.seed();
}

async function postIdea(payload) {
  const server = await serverInstance.create();
  server.initialize();

  const response = await server.inject({
    method: 'POST',
    url: '/ideas',
    payload,
  });

  return JSON.parse(response.payload);
}

describe('Create idea', () => {
  beforeEach(async () => await resetDatabase());
  it('should create idea', async () => {

    const ideasBefore = await raw(`SELECT COUNT(id) FROM ideas`);
    const beforeCount = ideasBefore.rows[0].count;

    const createdIdea = await postIdea({
      tags: [],
      text: 'foo',
      type: {
        when: false,
        what: false,
        why: false,
        how: false,
      },
    });

    const ideasAfter = await raw(`SELECT COUNT(id) FROM ideas`);
    const afterCount = ideasAfter.rows[0].count;

    expect(parseInt(beforeCount)).toBeLessThan(parseInt(afterCount));
  });
});