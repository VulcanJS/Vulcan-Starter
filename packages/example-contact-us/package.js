
Package.describe({
  name: 'example-contact-us',
  summary: "A basic 'contact us' form package",
  version: '0.1.0',
});

Package.onUse(function (api) {

  api.use([
    // vulcan core
    'vulcan:core@1.8.11',

    // vulcan packages
    'vulcan:i18n-en-us@1.8.11',
    'vulcan:forms@1.8.11',
    'vulcan:email@1.8.11',

  ]);

  // Here is the entry point for client & server:
  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
