import { registerSetting } from 'meteor/vulcan:core';

registerSetting(
  'forum.postExcerptLength',
  30,
  'Length of posts excerpts in words'
);
