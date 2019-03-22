/*

Note: the following stylesheets are used for Bootstrap-based apps,
feel free to remove them if that's not what you're using.

*/

import React from 'react'

import 'meteor/vulcan:ui-bootstrap/lib/stylesheets/bootstrap.min.css';
import 'meteor/vulcan:ui-bootstrap/lib/stylesheets/style.scss';
import 'meteor/vulcan:ui-bootstrap/lib/stylesheets/datetime.scss';

// load UI components
import 'meteor/vulcan:ui-bootstrap/lib/modules/components.js';

export default  storyFn => (<div>{storyFn()}</div>)