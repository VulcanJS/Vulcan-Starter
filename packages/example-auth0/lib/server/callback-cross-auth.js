import express from 'express';
import { webAppConnectHandlersUse, getSetting } from 'meteor/vulcan:core';

const app = express();

const clientId = getSetting('auth0.clientId');
const domain = getSetting('auth0.domain');

const contents = `
<head>
  <script src="https://cdn.auth0.com/js/auth0/9.0.0/auth0.min.js"></script>
  <script type="text/javascript">
    var auth0 = new auth0.WebAuth({
      clientID: ${clientId},
      domain: ${domain},
      redirectUri: 'http://localhost:3000/callback'
    });
    auth0.crossOriginVerification();
  </script>
</head>
`;

app.get('/callback-cross-auth.html', async function(req, res) {
  res.send(contents);
});

webAppConnectHandlersUse(Meteor.bindEnvironment(app), {
  name: 'auth0_callback-cross-auth',
  order: 200,
});
