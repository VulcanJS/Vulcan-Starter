import React from 'react';
import { Components, registerComponent, withList } from 'meteor/vulcan:core';

import Movies from '../../modules/collection.js';

const text = `
## Going Further

Congrats! You've made it all the way to the end of this tutorial. Let's review all the things we learned:

- How to [create routes](http://docs.vulcanjs.org/routing.html#Adding-Routes).
- How to [register](/theming.html#Registering-Components) and [use](/theming.html#Using-Components) components.
- How to use [core components](/theming.html#Core-Components).
- How to write a [schema](/schemas.html).
- How to create a [collection](/schemas.html#Creating-Collections).
- The role of the [GraphQL schema](/graphql-schema.html).
- The role of [resolvers](/resolvers.html).
- How to load data on the client using [higher-order components](/resolvers.html#Higher-Order-Components).
- How to use [fragments](/fragments.html).
- How to add [field resolvers](/field-resolvers.html).
- How to use [user accounts](/users.html).
- How to add [mutations](/mutations.html).
- How to automatically generate [forms](/forms.html).

Whew! So where do you go from now? Here are a couple options:

1. First, we suggest trying the [Simple Example tutorial video](http://docs.vulcanjs.org/example-simple.html). It's a good chance to review the material you already learned here in a more in-deoth way. 
2. If you'd like to follow along with a written tutorial instead, check out the [Movies Example tutorial](http://docs.vulcanjs.org/example-movies.html). It covers the same things, as well as how to write your own resolvers and mutations. 

You shoud also always keep an eye on the [Vulcan documentation](http://docs.vulcanjs.org/). It has everything you need to know, and even a few things you probably don't!

And Vulcan also has a pretty active [YouTube channel](https://www.youtube.com/channel/UCGIvQQ6zw7ov2cHgD70HFlA) with lots of videos and tutorials. 

Finally, if you run into any issue there's always the [Vulcan Slack channel](http://slack.vulcanjs.org/). See you very soon, and thanks for checking out Vulcan!
`;


const Step17 = () => (
  <Components.Step step={17} text={text} lastStep={true} />
);

registerComponent('Step17', Step17);