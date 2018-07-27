import { registerFragment } from "meteor/vulcan:core";

registerFragment(`
  fragment customerFragment on Customer {
    _id
    stage
    name
    meetingDate
    meetingPlace
    addresses
    product{
      name
    }
  }
`);
