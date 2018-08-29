import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment customerFragment on Customer {
    _id
    stage
    name
    notes
    meetingDate
    addresses
    categories
    isVIP
    product{
      name
    }
  }
`);