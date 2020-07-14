import React from 'react';
import { registerComponent, withCurrentUser, getSetting, Routes } from 'meteor/vulcan:core';
import { NavLink } from 'react-router-dom';

import checks from '../../modules/checks.js';
import withQueryResolvers from '../../hocs/withQueryResolvers.js';
import withMutationResolvers from '../../hocs/withMutationResolvers.js';

const Nav = (props) => {
  let allChecksPassed = true;
  return (
    <div className="nav">
      <ul>
        {_.range(0, 20).map((i) => {
          const route = Routes[`step${i}`];
          if (!route) {
            return null;
          }
          const title = route.component.title;
          // const passCheck = getSetting('passAllChecks') || checks[`step${i}`](props);
          const passCheck = false;
          if (!passCheck) {
            allChecksPassed = false;
          }
          return allChecksPassed ? (
            <li className="nav-item" key={i}>
              <NavLink activeClassName="active" to={`/step/${i}`}>
                {i}. {title}
              </NavLink>
            </li>
          ) : (
            <li className="nav-item" key={i}>
              {i}. {title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

registerComponent({
  name: 'Nav',
  component: Nav,
  hocs: [withQueryResolvers, withCurrentUser, withMutationResolvers],
});

export default Nav;
