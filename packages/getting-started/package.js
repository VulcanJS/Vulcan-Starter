Package.describe({
  name: 'getting-started',
});

Package.onUse(function (api) {
  api.use([
    // SASS/SCSS support
    'fourseven:scss@4.12.0',

    // vulcan core
    'vulcan:core@=1.16.0',

    // vulcan packages
    'vulcan:forms@=1.16.0',
    'vulcan:accounts@=1.16.0',
    'vulcan:ui-bootstrap@=1.16.0',

  ]);

  api.addFiles('lib/stylesheets/style.scss');

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
