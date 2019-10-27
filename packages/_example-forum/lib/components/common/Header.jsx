import React from 'react';
import PropTypes from 'prop-types';
import { withCurrentUser, getSetting, Components, registerComponent } from 'meteor/vulcan:core';
import { Posts } from '../../modules/posts/index.js';

const logoUrl = getSetting('logoUrl');
const siteTitle = getSetting('title', 'My App');
const tagline = getSetting('tagline');

const Header = ({ currentUser }) => {
  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="logo">
          <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
          {tagline ? <h2 className="tagline">{tagline}</h2> : ''}
        </div>

        <div className="nav">
          <div className="nav-user">
            <Components.UsersMenu />
          </div>

          <div className="nav-new-post">
            {Users.canCreate({ collection: Posts, user: currentUser }) && <Components.PostsNewButton />}
          </div>
        </div>
      </header>
    </div>
  );
};

Header.displayName = 'Header';

Header.propTypes = {
  currentUser: PropTypes.object,
};

registerComponent({ name: 'Header', component: Header, hocs: [withCurrentUser] });
