import { addRoute } from 'meteor/vulcan:core';

addRoute({ name: 'customers', path: '/', componentName: 'CustomersPage' });
addRoute({ name: 'meetings', path: '/meetings', componentName: 'MeetingsPage' });
