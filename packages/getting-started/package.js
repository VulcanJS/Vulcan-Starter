Package.describe({
  name: 'getting-started',
});

Package.onUse(function (api) {

  api.use([

    // vulcan core
    'vulcan:core@1.8.5',

    // vulcan packages
    'vulcan:forms@1.8.5',
    'vulcan:accounts@1.8.5',
    
  ]);

  api.addFiles('lib/stylesheets/style.css');
  
  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
