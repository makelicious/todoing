const knex = require('knex');
const knexConfig = require('../knexfile');
const connection = knex(knexConfig);

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return connection('tags').del()
    .then(function () {
      // Inserts seed entries
      return connection('tags').insert([
        {
          id: 1,
          name: 'foo',
          created_at: '2017-01-22 20:08:03.156932+02',
          updated_at: null,
        },
        {
          id: 2,
          name: 'bar',
          created_at: '2018-01-18 20:28:58.856532+02',
          updated_at: null,
        }, {
          id: 3,
          name: 'baz',
          created_at: '2018-04-20 15:28:13.154932+02',
          updated_at: null,
        }, {
          id: 4,
          name: 'quix',
          created_at: '2018-11-20 11:28:20.156932+02',
          updated_at: null,
        }, {
          id: 5,
          name: 'noice',
          created_at: '2018-11-11 15:28:25.156932+02',
          updated_at: null,
        },
      ]);
    });
};
