const knex = require('knex');
const knexConfig = require('../knexfile');
const connection = knex(knexConfig);

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return connection('ideas').del()
    .then(function () {
      // Inserts seed entries
      return connection('ideas').insert([
        {
          id: 11,
          text: '#foo kun hajottaa',
          when: false,
          what: false,
          why: false,
          how: false,
          created_at: '2017-01-22 20:08:03.156932+02',
          updated_at: null,
        },
        {
          id: 22,
          text: '#bar #foo vitsi laiffi on nastaa',
          when: false,
          what: false,
          why: false,
          how: false,
          created_at: '2018-01-18 20:28:58.856532+02',
          updated_at: null,
        }, {
          id: 333,
          text: 'foo #baz kun käy kuumas',
          when: false,
          what: false,
          why: false,
          how: false,
          created_at: '2018-04-20 15:28:13.154932+02',
          updated_at: null,
        }, {
          id: 44234,
          text: 'foo',
          when: false,
          what: false,
          why: false,
          how: false,
          created_at: '2018-11-20 11:28:20.156932+02',
          updated_at: null,
        }, {
          id: 231235,
          text: 'foo',
          when: true,
          what: false,
          why: false,
          how: false,
          created_at: '2018-11-11 15:28:25.156932+02',
          updated_at: null,
        },
        {
          id: 23128095,
          text: 'jeesus pelastaa',
          when: true,
          what: true,
          why: true,
          how: true,
          created_at: '2017-11-21 15:28:25.156932+02',
          updated_at: null,
        },
        {
          id: 2235,
          text: 'kaiken maailman juttuja #foo #quix',
          when: true,
          what: true,
          why: true,
          how: true,
          created_at: '2018-11-11 15:28:25.156932+02',
          updated_at: null,
        }, {
          id: 23125,
          text: '#quix rimmaa kanssa mix',
          when: true,
          what: false,
          why: false,
          how: false,
          created_at: '2018-11-20 11:28:20.156932+02',
          updated_at: '2018-11-21 11:28:20.156932+02',
        },
        {
          id: 2311321235,
          text: 'foo',
          when: true,
          what: false,
          why: false,
          how: false,
          created_at: '2018-11-11 15:28:25.156932+02',
          updated_at: null,
        }, {
          id: 2312123599,
          text: 'foo dora gora bofara',
          when: true,
          what: false,
          why: false,
          how: false,
          created_at: '2016-01-11 15:28:25.156932+02',
          updated_at: null,
        }, {
          id: 23121299,
          text: 'mnoissi #noice',
          when: true,
          what: false,
          why: false,
          how: true,
          created_at: '2016-01-11 15:28:25.156932+02',
          updated_at: null,
        },
      ]);
    });
};
