import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

// Next Steps

const text = `
Congrats! You've made it all the way to the end of this tutorial. Let's review all the things we learned:

- How to [create routes](http://docs.vulcanjs.org/routing.html#Adding-Routes).
- How to [register](http://docs.vulcanjs.org/theming.html#Registering-Components) and [use](/theming.html#Using-Components) components.
- How to use [core components](http://docs.vulcanjs.org/theming.html#Core-Components).
- How to write a [schema](http://docs.vulcanjs.org/schemas.html).
- How to create a [collection](http://docs.vulcanjs.org/schemas.html#Creating-Collections).
- The role of the [GraphQL schema](http://docs.vulcanjs.org/graphql-schema.html).
- The role of [resolvers](http://docs.vulcanjs.org/resolvers.html).
- How to load data on the client using [higher-order components](http://docs.vulcanjs.org/resolvers.html#Higher-Order-Components).
- How to use [fragments](http://docs.vulcanjs.org/fragments.html).
- How to add [field resolvers](http://docs.vulcanjs.org/field-resolvers.html).
- How to use [user accounts](http://docs.vulcanjs.org/users.html).
- How to add [mutations](http://docs.vulcanjs.org/mutations.html).
- How to automatically generate [forms](http://docs.vulcanjs.org/forms.html).
- How to add [permissions](http://docs.vulcanjs.org/groups-permissions.html).
- How to [sort data](http://docs.vulcanjs.org/terms-parameters.html).
- How to [translate and internationalize strings](http://docs.vulcanjs.org/internationalization.html).

Whew! So where do you go from now? Here are a couple options:

1. First, we suggest trying the [Simple Example tutorial video](http://docs.vulcanjs.org/example-simple.html). It's a good chance to review the material you already learned here in a more in-depth way. 
2. If you'd like to follow along with a written tutorial instead, check out the [Movies Example tutorial](http://docs.vulcanjs.org/example-movies.html). It covers the same things, as well as how to write your own resolvers and mutations. 

You shoud also always keep an eye on the [Vulcan documentation](http://docs.vulcanjs.org/). It has everything you need to know, and even a few things you probably don't!

And Vulcan also has a pretty active [YouTube channel](https://www.youtube.com/channel/UCGIvQQ6zw7ov2cHgD70HFlA) with lots of videos and tutorials. 

Finally, if you run into any issue there's always the [Vulcan Slack channel](http://slack.vulcanjs.org/). See you very soon, and thanks for checking out Vulcan!
`;

const Step20 = () => (
  <Components.Step step={20} text={text} lastStep={true} />
);

registerComponent({ name: 'Step20', component: Step20 });