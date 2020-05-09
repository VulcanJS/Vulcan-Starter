Package.describe({
  name: "example-membership",
});

Package.onUse(function (api) {
  api.use([
    "promise",

    // vulcan core
    "vulcan:core@=1.15.0",

    // vulcan packages
    "vulcan:forms@=1.15.0",
    "vulcan:accounts@=1.15.0",
    "vulcan:forms-upload@=1.15.0",
    "vulcan:payments@=1.15.0",
    "vulcan:ui-bootstrap@=1.15.0",

    // third-party packages
    "fourseven:scss@4.12.0",
  ]);

  api.addFiles("lib/stylesheets/style.scss");

  api.addAssets(["lib/static/vulcanstagram.png"], ["client"]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
