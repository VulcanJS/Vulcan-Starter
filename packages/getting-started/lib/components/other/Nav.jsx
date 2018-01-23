import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import { Link } from 'react-router';

import checks from '../../modules/checks.js';

const Nav = ({}) => (
  <div className="nav">
    <ul>
    <li className="nav-item"><Link activeClassName="active" to="/" onlyActiveOnIndex={true}>Welcome</Link></li>
    <li className="nav-item"><Link activeClassName="active" to="/step/1">Step 1</Link></li>
      {_.range(1,18).map(i => 
        checks[`step${i}`]({}) ? 
        <li className="nav-item" key={i}><Link activeClassName="active" to={`/step/${i+1}`}>Step {i+1}</Link></li> :
        <li className="nav-item" key={i}>Step {i+1}</li> 
      )}
    </ul>
  </div>
);

registerComponent('Nav', Nav);
