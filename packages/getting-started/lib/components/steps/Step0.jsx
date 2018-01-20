import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';

const intro = `
## Welcome to Vulcan!

This interactive tutorial will teach you the basics of using Vulcan. 
In fact, the tutorial itself is the Vulcan app that we'll be working on! So meta!

During this tutorial, you'll have to edit a number of files. These are all located inside the **Getting Started** example package, which you can find at \`/your-vulcan-directory/packages/example-getting-started\`.
`

const Step0 = () => 
  <div><ReactMarkdown source={intro} /> <Link to="/step/1">Start</Link></div>
  
registerComponent('Step0', Step0);