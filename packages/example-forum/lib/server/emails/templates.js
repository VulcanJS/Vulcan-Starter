import VulcanEmail from 'meteor/vulcan:email';

VulcanEmail.addTemplates({
  test:                     Assets.getText("lib/server/emails/templates/common/test.handlebars"),
  wrapper:                  Assets.getText("lib/server/emails/templates/common/wrapper.handlebars"),
  newPost:                  Assets.getText("lib/server/emails/templates/posts/newPost.handlebars"),
  newPendingPost:           Assets.getText("lib/server/emails/templates/posts/newPendingPost.handlebars"),
  postApproved:             Assets.getText("lib/server/emails/templates/posts/postApproved.handlebars"),
  newComment:               Assets.getText("lib/server/emails/templates/comments/newComment.handlebars"),
  newReply:                 Assets.getText("lib/server/emails/templates/comments/newReply.handlebars"),
  accountApproved:          Assets.getText("lib/server/emails/templates/users/accountApproved.handlebars"),
  newUser:                  Assets.getText("lib/server/emails/templates/users/newUser.handlebars"),
});