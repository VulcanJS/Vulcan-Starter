import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment customerFragment on Customer {
    _id
    stage
    name
    notes
    meetingDate
    addresses{
      street
      country
      zipCode
    }
    categories
    isVIP
    product{
      name
    }
  }
`);