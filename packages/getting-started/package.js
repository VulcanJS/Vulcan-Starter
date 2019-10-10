Package.describe({
  name: 'getting-started',
});

Package.onUse(function (api) {

  api.use([

    // SASS/SCSS support
    'fourseven:scss@4.5.0',

    // vulcan core
    'vulcan:core@1.13.3',

    // vulcan packages
    'vulcan:forms@1.13.3',
    'vulcan:accounts@1.13.3',
    'vulcan:ui-bootstrap@1.13.3',
    
  ]);

  api.addFiles('lib/stylesheets/style.scss');
  
  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
