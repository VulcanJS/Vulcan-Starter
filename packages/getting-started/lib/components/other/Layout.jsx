import React from 'react';
import { replaceComponent, registerComponent } from 'meteor/vulcan:core';
import Nav from '../other/Nav.jsx';
import MoviesApp from '../movies/MoviesApp.jsx';

const Layout = ({ children }) => (
  <div className="layout">
    <div className="sidebar"><Nav/></div>
    <div className="main-content">{children}</div>
    <MoviesApp/>
  </div>
);

replaceComponent('Layout', Layout);
