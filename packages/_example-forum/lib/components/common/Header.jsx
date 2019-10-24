import React from 'react';
import PropTypes from 'prop-types';
import { getSetting, Components, registerComponent } from 'meteor/vulcan:core';
import { Posts } from '../../modules/posts/index.js';

const Header = () => {
  const logoUrl = getSetting('logoUrl');
  const siteTitle = getSetting('title', 'My App');
  const tagline = getSetting('tagline');

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
            <Components.ShowIf check={Posts.options.mutations.new.check}>
              <Components.PostsNewButton />
            </Components.ShowIf>
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

registerComponent({ name: 'Header', component: Header });
