import React from 'react';
import { Components, replaceComponent, registerComponent } from 'meteor/vulcan:core';

const Layout = ({ children }) => (
  <div className="layout">
    <div className="sidebar"><Components.Nav/></div>
    <div className="main-content">{children}</div>
    <Components.MoviesApp/>
  </div>
);

replaceComponent('Layout', Layout);
