import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';
import Step from './Step.jsx';

// Next Steps

const text = `
Congrats! You've made it all the way to the end of this tutorial. Let's review all the things we learned:

- How to [create routes](http://docs.vulcanjs.org/routing.html#Adding-Routes).
- How to [register](http://docs.vulcanjs.org/theming.html#Registering-Components) and [use](http://docs.vulcanjs.org/theming.html#Using-Components) components.
- How to use [core components](http://docs.vulcanjs.org/theming.html#Core-Components).
- How to write a [schema](http://docs.vulcanjs.org/schemas.html).
- How to create a [collection](http://docs.vulcanjs.org/schemas.html#Creating-Collections).
- The role of the [GraphQL schema](http://docs.vulcanjs.org/graphql-schema.html).
- The role of [resolvers](http://docs.vulcanjs.org/resolvers.html).
- How to load data on the client using [higher-order components](http://docs.vulcanjs.org/resolvers.html#Higher-Order-Components).
- How to use [fragments](http://docs.vulcanjs.org/fragments.html).
- How to add [relations](http://docs.vulcanjs.org/relations.html).
- How to use [user accounts](http://docs.vulcanjs.org/users.html).
- How to add [mutations](http://docs.vulcanjs.org/mutations.html).
- How to automatically generate [forms](http://docs.vulcanjs.org/forms.html).
- How to add [permissions](http://docs.vulcanjs.org/groups-permissions.html).
- How to [sort and filter data](http://docs.vulcanjs.org/filtering.html).
- How to [translate and internationalize strings](http://docs.vulcanjs.org/internationalization.html).

Whew! So where do you go from now? 

First, we suggest trying the [Simple Example tutorial video](http://docs.vulcanjs.org/example-simple.html). It's a good chance to review the material you already learned here in a more in-depth way. 

You shoud also always keep an eye on the [Vulcan documentation](http://docs.vulcanjs.org/). It has everything you need to know, and even a few things you probably don't!

Finally, if you run into any issue there's always the [Vulcan Slack channel](http://slack.vulcanjs.org/). See you very soon, and thanks for checking out Vulcan!
`;

const Step20 = () => (
  <Step step={20} text={text} lastStep={true} />
);

export default Step20;