import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment customerFragment on Customer {
    _id
    stage
    name
    addresses
    product{
      name
    }
  }
`);