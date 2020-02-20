import {
  Components,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";
import React from "react";

const UsersAccount = ({ currentUser }) =>
  currentUser ? (
    <Components.UsersEditForm
      input={{ filter: { _id: { _eq: currentUser._id } } }}
    />
  ) : null;

registerComponent({
  name: "UsersAccount",
  component: UsersAccount,
  hocs: [withCurrentUser]
});
