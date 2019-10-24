import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import get from 'lodash/get';

const UsersAccount = ({ match, currentUser }) => {
  if (!currentUser) {
    return <FormattedMessage id="app.noPermission"/>;
  }
  const slug = get(match, 'params.query.slug');
  // if no slug is provided, default to currentUser._id
  const terms = slug ? { slug } : { documentId: currentUser._id };
  return <Components.UsersEditForm terms={terms} />;
};

UsersAccount.propTypes = {
  currentUser: PropTypes.object,
};

UsersAccount.displayName = 'UsersAccount';

registerComponent({ name: 'UsersAccount', component: UsersAccount, hocs: [withCurrentUser] });
