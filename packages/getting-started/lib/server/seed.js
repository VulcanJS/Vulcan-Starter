/*

Seed the database with some dummy content. 

*/

import Movies from '../modules/collection.js';
import Users from 'meteor/vulcan:users';
import { newMutation } from 'meteor/vulcan:core';

const seedData = [
  {
    name: 'Star Wars',
    year: '1973',
    review: `A classic.`,
    privateComments: `Actually, I don't really like Star Wars…`
  },
  {
    name: 'Die Hard',
    year: '1987',
    review: `A must-see if you like action movies.`,
    privateComments: `I love Bruce Willis so much!`
  },
  {
    name: 'Terminator',
    year: '1983',
    review: `Once again, Schwarzenegger shows why he's the boss.`,
    privateComments: `Terminator is my favorite movie ever. `
  },
  {
    name: 'Jaws',
    year: '1971',
    review: 'The original blockbuster.',
    privateComments: `I'm scared of sharks…`
  },
  {
    name: 'Die Hard II',
    year: '1991',
    review: `Another classic.`
  },
  {
    name: 'Rush Hour',
    year: '1993',
    review: `Jackie Chan at his best.`,
  },
  {
    name: 'Citizen Kane',
    year: '1943',
    review: `A disappointing lack of action sequences.`,
  },
  {
    name: 'Commando',
    year: '1983',
    review: 'A good contender for highest kill count ever.',
  },
];

const createUser = function (username, email) {
  const user = {
    username,
    email,
    isDummy: true
  };
  newMutation({
    collection: Users, 
    document: user,
    validate: false
  });
}

const createDummyUsers = function () {
  console.log('// seeding users…');
  createUser('Bruce', 'dummyuser1@telescopeapp.org');
  createUser('Arnold', 'dummyuser2@telescopeapp.org');
  createUser('Julia', 'dummyuser3@telescopeapp.org');
};

export const seedMovies = () => {
  
  const allUsers = Users.find().fetch();

  if (allUsers.length === 0) {
    createDummyUsers();
  }
  if (Movies.find().fetch().length === 0) {
    console.log('// seeding movies…');
    seedData.forEach(document => {
  
      const currentUser = _.sample(allUsers); // get a random user
      
      newMutation({
        collection: Movies,
        document: document, 
        currentUser: currentUser,
        validate: false
      });
    });
  }
};