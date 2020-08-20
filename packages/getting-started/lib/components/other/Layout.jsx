import React from 'react';
import { replaceComponent, registerComponent } from 'meteor/vulcan:core';
import Nav from '../other/Nav.jsx';
import Logo from '../other/Logo.jsx';
import MoviesApp from '../movies/MoviesApp.jsx';
import MoviesApp2 from '../movies/MoviesApp2.jsx';

// replace MoviesApp with MoviesApp2 on #Step15
const Layout = ({ children }) => (
  <div className="layout">
    <div className="sidebar">
      <Logo />
      <Nav />
    </div>
    <div className="main-content">{children}</div>
    <MoviesApp />
  </div>
);

replaceComponent('Layout', Layout);

export default Layout;
