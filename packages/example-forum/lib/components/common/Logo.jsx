import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = ({ logoUrl, siteTitle }) => {
  if (logoUrl) {
    return (
      <h1 className="logo-image ">
        <IndexLink to={{ pathname: '/' }}>
          <img src={logoUrl} alt={siteTitle} />
        </IndexLink>
      </h1>
    );
  } else {
    return (
      <h1 className="logo-text">
        <NavLink exact to={{ pathname: '/' }}>
          {siteTitle}
        </NavLink>
      </h1>
    );
  }
};

Logo.displayName = 'Logo';

registerComponent({ name: 'Logo', component: Logo });
