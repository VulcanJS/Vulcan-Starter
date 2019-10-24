import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { STATES } from 'meteor/vulcan:accounts';

const UsersMenu = ({ currentUser, currentUserLoading, client, state }) => {
  return (
    <div className="users-menu">
      {currentUserLoading ? (
        <Components.Loading />
      ) : currentUser ? (
        <UserLoggedInMenu currentUser={currentUser} client={client} />
      ) : (
        <UserLoggedOutMenu state={state} />
      )}
    </div>
  );
};

const UserLoggedInMenu = ({ currentUser, client }) => {
  const menuItems = [
    {
      to: `/users/${currentUser.slug}`,
      labelId: 'users.profile',
    },
    {
      to: `/account`,
      labelId: 'users.edit_account',
    },
  ];

  if (Users.isAdmin(currentUser)) {
    menuItems.push({
      to: `/admin/users`,
      labelId: 'admin.users',
    });
    menuItems.push({
      to: `/admin/categories`,
      labelId: 'admin.categories',
    });
  }

  menuItems.push({
    labelId: 'users.log_out',
    itemProps: {
      onClick: () => Meteor.logout(() => client.resetStore()),
    },
  });

  return (
    <Components.Dropdown
      buttonProps={{ variant: 'secondary' }}
      id="user-dropdown"
      trigger={
        <div className="dropdown-toggle-inner">
          <Components.Avatar size="small" user={currentUser} addLink={false} />
          <div className="users-menu-name">{Users.getDisplayName(currentUser)}</div>
        </div>
      }
      menuItems={menuItems}
    />
  );
};

const UserLoggedOutMenu = ({ state }) => (
  <Components.Dropdown
    buttonProps={{ variant: ' btn-secondary' }}
    id="accounts-dropdown"
    className="users-account-menu"
    trigger={
      <div className="dropdown-toggle-inner">
        <Components.Icon name="user" />
        <FormattedMessage id="users.sign_up_log_in" />
      </div>
    }
    menuContents={<Components.AccountsLoginForm formState={state ? STATES[state] : STATES.SIGN_UP} />}
  />
);

UsersMenu.propsTypes = {
  currentUser: PropTypes.object,
  client: PropTypes.object,
};

registerComponent({ name: 'UsersMenu', component: UsersMenu, hocs: [withCurrentUser, withApollo] });
