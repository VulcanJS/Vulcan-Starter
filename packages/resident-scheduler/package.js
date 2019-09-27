// packages.js #tutorial-step-2 - Decribes the contents of the package as well as the dependencies. 

Package.describe({
  name: 'resident-scheduler',
});

Package.onUse(function (api) {

  api.use([
    
    // Here are our dependencies:

    // vulcan core
    'promise',
    'vulcan:core@1.13.1',

    // vulcan packages
    'vulcan:forms@1.13.1',
    'vulcan:accounts@1.13.1',
    'vulcan:ui-bootstrap@1.13.1',

  ]);

  api.addFiles('lib/stylesheets/style.css');
  api.addFiles('lib/components/ServiceBlockScheduler/ServiceBlockScheduler.css')
  api.addFiles('lib/components/ServiceBlockScheduler/ResidentsList/ResidentsList.css')  
  api.addFiles('lib/components/ServiceBlockScheduler/ServiceBlock/ServiceBlock.css')
  api.addFiles('lib/components/ServiceBlockScheduler/ServiceBlock/Table/Table.css')
  api.addFiles('lib/components/ServiceBlockScheduler/ResidentsList/ResidentsListItem/ResidentsListItem.css')
  api.addFiles('lib/components/ServiceBlockScheduler/ResidentsList/ResidentsListItem/ResidentSelector/ResidentSelector.css')

  // Here is the entry point for client & server:
  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
