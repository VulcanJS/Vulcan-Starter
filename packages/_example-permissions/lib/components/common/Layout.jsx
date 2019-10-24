/* 

The Layout component. 

In other words, the template used to display every page in the app. 
Specific pages will be displayed in place of the "children" property. 

Note: the Helmet library is used to insert meta tags and link tags in the <head>

*/

import React from 'react';
import Helmet from 'react-helmet';
import { replaceComponent, Components } from 'meteor/vulcan:core';

const Layout = ({children}) =>

  <div className="wrapper" id="wrapper">

    <Helmet>
      <title>Vulcanstagram</title>
      <link name="bootstrap" rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"/>
      <link name="font-awesome" rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
    </Helmet>

    <Components.Header/>
  
    <div className="main">

      {children}

    </div>
  
    <div className="footer">&copy; Vulcanstagram</div>

  </div>

replaceComponent('Layout', Layout);