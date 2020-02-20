Package.describe({
  name: 'example-forms',
});

Package.onUse(function (api) {

  api.use([
    // vulcan core
    'vulcan:core@=1.14.1',

    // vulcan packages
    'vulcan:forms@=1.14.1',
    'vulcan:accounts@=1.14.1',
    'vulcan:forms-upload@=1.14.1',
    'vulcan:ui-bootstrap@=1.14.1',

    // third-party packages
    'fourseven:scss@4.12.0',
  ]);


  api.addFiles('lib/stylesheets/react-select.css');
  api.addFiles('lib/stylesheets/bootstrap.min.css');
  api.addFiles('lib/stylesheets/style.scss');

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
