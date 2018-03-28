/*

Seed the database with some dummy content. 

*/

import Products from '../modules/products/collection.js';
import { newMutation } from 'meteor/vulcan:core';
import { Promise } from 'meteor/promise';

const seedData = [
  {
    name: 'AppPro Deluxe',
  },
  {
    name: 'SuperDisruptor X',
  },
  {
    name: 'Pocket Compiler 2',
  },
  {
    name: 'WhizzBanger Mark VII',
  },
];

export const seedProducts = () => {
  if (Products.find().fetch().length === 0) {
    // eslint-disable-next-line no-console
    console.log('// seeding products…');

    Promise.awaitAll(
      seedData.map(document =>
        newMutation({
          collection: Products,
          document: document,
          validate: false,
        })
      )
    );
  }
};

Meteor.startup(() => {
  seedProducts();
});
