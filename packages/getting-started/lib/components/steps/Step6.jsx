import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import StepWrapper from './StepWrapper.jsx';

export const title = 'Seeding';

const text = [
  `
We're well on our way to sending data from the server to the client, but there's just one problem: we don't *have* any data. Let's fix this by inserting a few documents into our \`Movies\` collection. 

We actually already have a \`seedMovies\` function ready, we just need to call it. We can do so using the [Meteor shell](https://docs.meteor.com/commandline.html#meteorshell), a convenient way to access your live Meteor development server.

Open a new Terminal window in your Vulcan application directory, type:
`,
  `
~~~sh
meteor shell
~~~
`,
  `
And then:
`,
  `
~~~js
import { seedMovies } from 'meteor/getting-started'
~~~
`,
  `
And finally:
`,
  `
~~~js
seedMovies()
~~~
`,
];

const after = [
  `
Well done! A GraphQL request to the \`moviesCount\` query has confirmed that there are now movies seeded into our database. 

By the way, a useful companion to the Meteor Shell is Meteor's [database access](https://docs.meteor.com/commandline.html#meteormongo):
`,
  `
~~~sh
meteor mongo
~~~
`,
  `
For example, here's how you would display all movies in your database:
`,
  `
~~~js
db.movies.find()
~~~
`,
  `
And here's how you would remove them all:
`,
  `
~~~js
db.movies.remove({})
~~~
`,
  {
    text: `By the way, I know you must be getting hungry so feel free to take a lunch break soon!`,
    check: () => {
      const date = new Date();
      const hours = date.getHours();
      return hours === 1 || hours === 12;
    },
  },
];

const query = gql`
  query moviesCount {
    moviesCount
  }
`;

const Step = () => {
  const items = {};
  const { data } = useQuery(query);
  items.moviesCount = data && data.moviesCount;
  return (
    <StepWrapper title={Step.title} text={text} after={after}>
      <div className="movies-count">Current movies count: {items.moviesCount}</div>
    </StepWrapper>
  );
};

export const checks = [{ specialCheck: 'seedCheck' }];

export default Step;
