import { registerSetting } from 'meteor/vulcan:core';

registerSetting(
  'forum.postExcerptLength',
  30,
  'Length of posts excerpts in words'
);

registerSetting(
  'forum.commentInterval',
  15,
  'How long users should wait in between comments (in seconds)'
);

registerSetting(
  'forum.postInterval',
  30,
  'How long users should wait between each posts, in seconds'
);

registerSetting(
  'forum.maxPostsPerDay',
  5,
  'Maximum number of posts a user can create in a day'
);

registerSetting('emailNotifications', true, 'Enable email notifications');

registerSetting('forum.numberOfDays', 5, 'Number of days to display in Daily view');


registerSetting(
  'forum.outsideLinksPointTo',
  'link',
  'Whether to point RSS links to the linked URL (“link”) or back to the post page (“page”)'
);
registerSetting(
  'forum.requirePostsApproval',
  false,
  'Require posts to be approved manually'
);
registerSetting(
  'twitterAccount',
  null,
  'Twitter account associated with the app'
);
registerSetting('siteUrl', null, 'Main site URL');

registerSetting('forum.RSSLinksPointTo', 'link', 'Where to point RSS links to');

registerSetting('forum.seedOnStart', true, 'Seed the app with dummy content on startup');
