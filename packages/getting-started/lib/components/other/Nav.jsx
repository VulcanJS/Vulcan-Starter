import React from 'react';
import { registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { NavLink } from 'react-router-dom';

import checks from '../../modules/checks.js';
import withMoviesCount from '../../hocs/withMoviesCount.js';
import withQueryResolvers from '../../hocs/withQueryResolvers.js';
import withMutationResolvers from '../../hocs/withMutationResolvers.js';
import sections from '../../modules/sections.js';

const Nav = props => {
  let allChecksPassed = true;

  return (
    <div className="nav">
      <ul>
        <li className="nav-item">
          <NavLink exact activeClassName="active" to="/">
            {sections[0]}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" to="/step/1">
            1. {sections[1]}
          </NavLink>
        </li>
        {_.range(1, 20).map(i => {
          if (!checks[`step${i}`](props)) {
            allChecksPassed = false;
          }
          return allChecksPassed ? (
            <li className="nav-item" key={i}>
              <NavLink activeClassName="active" to={`/step/${i + 1}`}>
                {i + 1}. {sections[i + 1]}
              </NavLink>
            </li>
          ) : (
            <li className="nav-item" key={i}>
              {i + 1}. {sections[i + 1]}
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
  hocs: [
    withMoviesCount,
    withQueryResolvers,
    withCurrentUser,
    withMutationResolvers
  ]
});
