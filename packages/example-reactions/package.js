Package.describe({
  name: 'example-reactions'
})

Package.onUse(function(api) {
  api.use([
    'promise',

    // vulcan core
    'vulcan:core@1.12.6',

    // vulcan packages
    'vulcan:voting@1.12.6',
    'vulcan:forms@1.12.6',
    'vulcan:accounts@1.12.6',
    'vulcan:ui-bootstrap@1.12.6'
  ])

  api.addFiles('lib/stylesheets/style.css')

  api.mainModule('lib/server/main.js', 'server')
  api.mainModule('lib/client/main.js', 'client')
})
