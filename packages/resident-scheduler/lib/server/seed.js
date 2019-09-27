/*

server/seed.js #tutorial-step-5 - 
This is a file to seed the database with some dummy content. 

*/

import { Promise } from 'meteor/promise';
import Users from 'meteor/vulcan:users';
import { newMutation } from 'meteor/vulcan:core';
import Schedules from '../modules/schedules/collection.js';

const seedData = [
  {
    name: 'Star Wars',
    date: Date.now().toString()
  },
  {
    name: 'Die Hard',
    date: Date.now().toString()
  },
  {
    name: 'Terminator',
    date: Date.now().toString()
  },
  {
    name: 'Jaws',
    date: Date.now().toString()
  },
  {
    name: 'Die Hard II',
    date: Date.now().toString()
  },
  {
    name: 'Rush Hour',
    date: Date.now().toString()
  },
  {
    name: 'Citizen Kane',
    date: Date.now().toString()
  },
  {
    name: 'Commando',
    date: Date.now().toString()
  },
];

const createUser = async (username, email) => {
  const user = {
    username,
    email,
    password, 
    isDummy: true,
  };

  return newMutation({
    collection: Users,
    document: user,
    validate: false,
  });
};

const createDummyUsers = async () => {
  // eslint-disable-next-line no-console
  console.log('// inserting dummy users…');
  return Promise.all([
    createUser('Bruce', 'dummyuser1@telescopeapp.org', 'password'),
    createUser('Arnold', 'dummyuser2@telescopeapp.org', 'password'),
    createUser('Julia', 'dummyuser3@telescopeapp.org', 'password'),
  ]);
};

const users = []

const createOneDummyUser = async index => {
  return await createUser(`user${index}`, `user${index}@residents.org`, 'password').resolve('ok')
}

const createDummyUsersNew = async () => {
  return await Promise.all([...Array(150)].map((_, index) => createOneDummyUser(index)))
}

// eslint-disable-next-line no-undef
Vulcan.removeGettingStartedContent = () => {
  Users.remove({ 'profile.isDummy': true });
  // eslint-disable-next-line no-console
  console.log('// Getting started content removed');
};

Meteor.startup(() => {
  if (Users.find().fetch().length === 0) {
    Promise.await(createDummyUsers());
  }
  const currentUser = Users.findOne(); // just get the first user available
  if (Schedules.find().fetch().length === 0) {
    // eslint-disable-next-line no-console
    console.log('// creating dummy schedules');
    Promise.awaitAll(seedData.map(document => newMutation({
      collection: Schedules,
      document,
      currentUser,
      validate: false,
    })));
  }
});
