import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment ContactUsFragment on ContactUsForm {
    _id
    createdAt
    userName
    sendToEmail
    emailContent
  }
`);
