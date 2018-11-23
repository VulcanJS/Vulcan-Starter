Package.describe({
  name: 'example-interfaces',
});

Package.onUse(function (api) {

  api.use([

    'promise',

    // vulcan core
    'vulcan:core@1.12.9',

    // vulcan packages
    'vulcan:forms@1.12.9',
    'vulcan:accounts@1.12.9',
    'vulcan:ui-bootstrap@1.12.9',
    
  ]);

  api.addFiles('lib/stylesheets/bootstrap.min.css');
  api.addFiles('lib/stylesheets/custom.css');

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
