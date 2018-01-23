import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import { Link } from 'react-router';
import checks from '../modules/checks.js';

const Nav = ({}) => (
  <div className="nav">
    <ul>
      <li className="nav-item"><Link to="/">Welcome</Link></li>
      {_.range(1,18).map(i => 
        checks[`step${i}`]({}) ? 
        <li className="nav-item" key={i}><Link to={`/step/${i}`}>Step {i}</Link></li> :
        <li className="nav-item" key={i}>Step {i}</li> 
      )}
    </ul>
  </div>
);

registerComponent('Nav', Nav);
