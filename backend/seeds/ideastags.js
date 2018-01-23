const knex = require('knex');
const knexConfig = require('../knexfile');
const connection = knex(knexConfig);

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return connection('ideas_tags').del()
    .then(function () {
      // Inserts seed entries
      return connection('ideas_tags').insert([
        {
          idea_id: 22,
          tag_id: 1,
        },
        {
          idea_id: 22,
          tag_id: 2,
        }, {
          idea_id: 11,
          tag_id: 1,
        }, {
          idea_id: 23125,
          tag_id: 4,
        }, {
          idea_id: 333,
          tag_id: 3,
        }, {
          idea_id: 2235,
          tag_id: 1,
        }, {
          idea_id: 2235,
          tag_id: 4,
        }, {
          idea_id: 23121299,
          tag_id: 5,
        },
      ]);
    });
};
