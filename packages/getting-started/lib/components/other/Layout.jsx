import React from 'react';
import { replaceComponent, registerComponent } from 'meteor/vulcan:core';
import Nav from '../other/Nav.jsx';
import MoviesApp from '../movies/MoviesApp.jsx';
import MoviesApp2 from '../movies/MoviesApp2.jsx';

// replace <MoviesApp/> with <MoviesApp2/> on #Step16
const Layout = ({ children }) => (
  <div className="layout">
    <div className="sidebar">
      <Nav />
    </div>
    <div className="main-content">{children}</div>
    <MoviesApp2 />
  </div>
);

replaceComponent('Layout', Layout);

export default Layout;
