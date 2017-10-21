import '../modules/index.js';
import './seed.js';

import { Meteor } from 'meteor/meteor';
const LG = console.log;

Meteor.methods({
  'system.getSiteName': function () {
    return Meteor.settings.public.title;
  },
  'system.removeTestData': function ( test_ids ) {
    let user = test_ids.testUserName;
    LG(`Purging user record of : ${user}`);
    Meteor.users.remove({ username: user });
  }

});
