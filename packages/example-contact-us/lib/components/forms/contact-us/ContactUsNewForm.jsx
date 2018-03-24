import React, { PropTypes, Component } from 'react';
import { Components, registerComponent, getFragment } from 'meteor/vulcan:core';
import ContactUsForm from '../../../modules/contact-us/collection.js';

const ContactUs = () => (
  <Components.SmartForm collection={ContactUsForm} mutationFragment={getFragment('ContactUsFragment')} />
);

registerComponent('ContactUsForm', ContactUs);
