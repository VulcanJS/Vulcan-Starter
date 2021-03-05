Package.describe({
  name: 'example-forum',
  summary: 'Vulcan forum package',
  version: '1.16.1',
  git: 'https://github.com/VulcanJS/Vulcan.git',
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.5.2');

  api.use([
    'promise',
    'fourseven:scss@4.12.0',

    // vulcan core
    'vulcan:core@1.16.1',

    // vulcan packages
    'vulcan:ui-bootstrap@1.16.1',
    'vulcan:voting@1.16.1',
    'vulcan:accounts@1.16.1',
    'vulcan:email@1.16.1',
    'vulcan:forms@1.16.1',
    'vulcan:events@1.16.1',
    'vulcan:embed@1.16.1',
    'vulcan:admin@1.16.1',
  ]);

  api.addAssets(['lib/assets/images/stackoverflow.png', 'lib/assets/images/telescope.png'], ['client']);

  api.addAssets(
    [
      'lib/assets/content/read_this_first.md',
      'lib/assets/content/deploying.md',
      'lib/assets/content/customizing.md',
      'lib/assets/content/getting_help.md',
      'lib/assets/content/removing_getting_started_posts.md',

      'lib/server/emails/templates/common/test.handlebars',
      'lib/server/emails/templates/common/wrapper.handlebars',
      'lib/server/emails/templates/comments/newComment.handlebars',
      'lib/server/emails/templates/comments/newReply.handlebars',
      'lib/server/emails/templates/posts/newPendingPost.handlebars',
      'lib/server/emails/templates/posts/newPost.handlebars',
      'lib/server/emails/templates/posts/postApproved.handlebars',
      'lib/server/emails/templates/users/accountApproved.handlebars',
      'lib/server/emails/templates/users/newUser.handlebars',
    ],
    ['server']
  );

  api.addFiles(
    [
      // 'lib/stylesheets/bootstrap.css',
      'lib/stylesheets/main.scss',
    ],
    ['client']
  );

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
