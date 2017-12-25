
exports.up = function (knex) {
  const ideas = knex.schema.createTable('ideas', (t) => {
    t.string('id').primary();
    t.timestamps();
    t.string('text');
    t.boolean('done');
    t.boolean('when');
    t.boolean('what');
    t.boolean('why');
    t.boolean('how');
  });

  const tags = knex.schema.createTable('tags', (t) => {
    t.string('id').primary();
    t.string('name').unique();
    t.timestamps();
  });

  const ideas_tags = knex.schema.createTable('ideas_tags', (t) => {
    t.string('idea_id').references('ideas.id')
    t.string('tag_name').references('tags.name')
    t.primary(['idea_id', 'tag_name']);

  });

  return ideas
    .then(() => tags)
    .then(() => ideas_tags);
};

exports.down = function (knex) {
  const ideas = knex.schema.dropTable('ideas');
  const tags = knex.schema.dropTable('tags');
  const ideas_tags = knex.schema.dropTable('ideas_tags');

  return ideas
    .then(() => tags)
    .then(() => ideas_tags);
};
