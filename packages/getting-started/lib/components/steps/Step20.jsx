import React from 'react';
import StepWrapper from './StepWrapper.jsx';

export const title = 'Next Steps';

const text = `
Congrats! You've made it all the way to the end of this tutorial. Let's review all the things we learned:

- How to [create routes](http://docs.vulcanjs.org/routing.html#Adding-Routes).
- How to use [core components](http://docs.vulcanjs.org/theming.html#Core-Components).
- How to write a [schema](http://docs.vulcanjs.org/schemas.html).
- How to create a [collection](http://docs.vulcanjs.org/schemas.html#Creating-Collections).
- The role of the [GraphQL schema](http://docs.vulcanjs.org/graphql-schema.html).
- The role of [resolvers](http://docs.vulcanjs.org/resolvers.html).
- How to use [fragments](http://docs.vulcanjs.org/fragments.html).
- How to add [relations](http://docs.vulcanjs.org/relations.html).
- How to use [user accounts](http://docs.vulcanjs.org/users.html).
- How to add [mutations](http://docs.vulcanjs.org/mutations.html).
- How to automatically generate [forms](http://docs.vulcanjs.org/forms.html).
- How to add [permissions](http://docs.vulcanjs.org/groups-permissions.html).
- How to [sort and filter data](http://docs.vulcanjs.org/filtering.html).
- How to [translate and internationalize strings](http://docs.vulcanjs.org/internationalization.html).

Whew! So where do you go from now? 

First, we suggest trying the [Simple Example](http://docs.vulcanjs.org/example-simple.html). It's a good chance to review the material you already learned here in a more in-depth way. 

You shoud also always keep an eye on the [Vulcan documentation](http://docs.vulcanjs.org/). It has everything you need to know, and even a few things you probably don't!

Finally, if you run into any issue there's always the [Vulcan Slack channel](http://slack.vulcanjs.org/). See you very soon, and thanks for checking out Vulcan!
`;

const Step = () => <StepWrapper title={Step.title} text={text} lastStep={true} />;

export const checks = [];

export default Step;
