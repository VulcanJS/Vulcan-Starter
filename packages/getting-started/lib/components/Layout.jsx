import React from 'react';
import { replaceComponent, registerComponent } from 'meteor/vulcan:core';
import { Link } from 'react-router';

const Layout = ({ children }) => (
  <div className="layout">
    <div className="sidebar">sidebar</div>
    <div className="main-content">{children}</div>
  </div>
);

replaceComponent('Layout', Layout);
