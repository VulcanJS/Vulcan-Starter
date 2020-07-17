import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <div className="logo">
    <Link to="/">
      <img src="/vulcan-logo-negative.svg" />
    </Link>
  </div>
);

export default Logo;
