/**
 * Setup the database and seed it with demo/base data
 */
import Users from 'meteor/vulcan:users';
import { newMutation } from 'meteor/vulcan:core';
import { Accounts } from 'meteor/accounts-base';

const createUser = function (user) {
    const userWithEmails = {
        ...user,
        emails: [{ address: user.email }]
    }
    return newMutation({
        collection: Users,
        document: userWithEmails,
        validate: false
    });
}
const setPassword = function (user, password) {
    Accounts.setPassword(user.email, password)
}

const adminUsers = [{
    username: 'admin',
    email: 'demo@demo;demo',
    isAdmin: true,
}]

const createUsers = () => {
    Promise.all(adminUsers.map(createUser))
        .then(() => {
            console.log('Created admin and demo users')
            // Set passwords for demo users
            // IMPORTANT NOTE : in production, use a password stored as an environment variable
            // instead 
            console.warn('Setting passwords to "demodemo"')
            console.warn('Please use an environment variable to define the admin password before switching to production')
            adminUsers.forEach(admin => setPassword("demodemo"))
        })
}


Meteor.startup(function () {
    // seed the users if necessary
    if (!Users.find().count()) {
        createUsers();
    }
});