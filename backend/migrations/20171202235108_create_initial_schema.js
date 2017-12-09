
exports.up = function (knex) {
  const ideas = knex.schema.createTable('ideas', (t) => {
    t.increments('id').unsigned().primary();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
    t.string('idea');
    t.boolean('done');
    t.boolean('when');
    t.boolean('what');
    t.boolean('why');
    t.boolean('how');
  });

  const tags = knex.schema.createTable('tags', (t) => {
    t.increments('id').unsigned().primary();
    t.string('name').unique();
    t.integer('idea_id').references('ideas.id');
  });

  const ideas_tags = knex.schema.createTable('ideas_tags', (t) => {
    t.integer('idea_id').references('ideas.id');
    t.string('tag_name').references('tags.name');
  })

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
