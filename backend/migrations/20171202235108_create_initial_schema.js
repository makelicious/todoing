
exports.up = function (knex) {
  const ideas = knex.schema.createTable('ideas', (t) => {
    t.string('id').primary();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
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
  });

  const ideas_tags = knex.schema.createTable('ideas_tags', (t) => {
    t.string('idea_id').references('ideas.id').unique();
    t.string('tag_name').references('tags.name').unique();
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
