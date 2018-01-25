import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';

const intro = `
This interactive tutorial will teach you the basics of using Vulcan. 
In fact, the tutorial itself is the Vulcan app that we'll be working on! So meta!

On your left, you'll find this tutorial's steps. Right now they're greyed out, but as you unlock them by completing tasks you'll be able to progress forward. 

On your right is your work area. As we build up our app in future steps, its components will appear there. 

During this tutorial, you'll have to edit a number of files. These are all located inside the **Getting Started** example package, which you can find at \`/your-vulcan-directory/packages/example-getting-started\`. From now on, file paths will be referenced using that directory as root. 
`

const Step0 = () => 
  <div><ReactMarkdown source={intro} /> <Link to="/step/1">Start</Link></div>
  
registerComponent('Step0', Step0);