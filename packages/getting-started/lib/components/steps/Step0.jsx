import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

const text = [`
This interactive tutorial will teach you the basics of using Vulcan. 
In fact, the tutorial itself is the Vulcan app that we'll be working on! So meta!

On your left, you'll find this tutorial's **steps**. Right now they're greyed out, but as you unlock them by completing tasks you'll be able to progress forward. 

On your right is your **work area**. As we build up our app starting on Step 10, its components will appear there. 

During this tutorial, you'll have to edit a number of files. These are all located inside the **Getting Started** example package, which you can find at \`/your-vulcan-directory/packages/getting-started\`. From now on, file paths will be referenced using that directory as root. 

While we're on this topic, let's take a quick look at that package's file architecture:
`,`
~~~sh
lib
  |- client           # client-only code
  |
  |- components       # React components
  |  |- movies
  |  |- other
  |  +- steps
  |
  |- hocs             # higher-order components
  |
  |- modules          # other JavaScript modules
  |
  |- server           # server-only code
  |
  |- stylesheets      # stylesheets
  |
  +- package.js       # package manifest
~~~
`,`
Everything starts with the \`package.js\` file, which defines the contents of the package. From there, two entry points in \`client/main.js\` and \`server/main.js\` tell Meteor which files to load in each environment. 

By convention, every file *outside* of \`client\` and \`server\` will be loaded in *both* environments. 
This includes React components, higher-order components (special component wrapper functions), and all the other files in \`modules\`. 

Throughout this tutorial, we'll be modifying files in both \`components\` and \`modules\`. But of course, feel free to take a look at the other parts of the package as well!

If you get stuck at any point, drop by the [Vulcan Slack group](http://slack.vulcanjs.org)'s \`#getting-started\` channel to get help. We'd also love to know what you think of the tutorial once you're through!
`,
{
  text: `Oh, and thanks for taking time out of your week-end to try out Vulcan. You won't regret it!`,
  check: () => {
    const date = new Date();
    const day = date.getDay();
    return day === 6 || day === 0;
  }
},
];

const Step0 = () => <Components.Step step={0} text={text} firstStep={true}/>;

registerComponent({ name: 'Step0', component: Step0 });
