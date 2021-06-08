Package.describe({
  name: 'example-forms',
});

Package.onUse(function (api) {
  api.use([
    // vulcan core
    'vulcan:core@=1.16.3',

    // vulcan packages
    'vulcan:forms@=1.16.3',
    'vulcan:accounts@=1.16.3',
    'vulcan:forms-upload@=1.16.3',
    'vulcan:ui-bootstrap@=1.16.3',

    // third-party packages
    'fourseven:scss@4.12.0',
  ]);

  api.addFiles('lib/stylesheets/react-select.css');
  api.addFiles('lib/stylesheets/bootstrap.min.css');
  api.addFiles('lib/stylesheets/style.scss');

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
