Package.describe({
  name: 'getting-started',
});

Package.onUse(function (api) {

  api.use([

    // SASS/SCSS support
    'fourseven:scss@4.5.0',

    // vulcan core
    'vulcan:core@1.12.9',

    // vulcan packages
    'vulcan:forms@1.12.9',
    'vulcan:accounts@1.12.9',
    'vulcan:ui-bootstrap@1.12.9',
    
  ]);

  api.addFiles('lib/stylesheets/style.scss');
  
  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
