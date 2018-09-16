import React from 'react';
import { Components, registerComponent, Collections } from 'meteor/vulcan:core';

import withMoviesCount from '../../hocs/withMoviesCount.js';

// Seeding

const text = [`
We're well on our way to sending data from the server to the client, but there's just one problem: we don't *have* any data. Let's fix this by inserting a few documents into our \`Movies\` collection. 

We actually already have a \`seedMovies\` function ready, we just need to call it. We can do so using the [Meteor shell](https://docs.meteor.com/commandline.html#meteorshell), a convenient way to access your live Meteor development server.

In your Vulcan application directory, type:
`,`
~~~sh
meteor shell
~~~
`,`
And then:
`,`
~~~js
import { seedMovies } from 'meteor/getting-started'
~~~
`,`
And finally:
`,`
~~~js
seedMovies()
~~~
`];

const after = [`
Well done! Our secret informant on the server (a.k.a. the \`withMoviesCount\` HoC) has confirmed that there are now 8 movies in our database. 

By the way, a useful companion to the Meteor Shell is Meteor's [database access](https://docs.meteor.com/commandline.html#meteormongo):
`,`
~~~sh
meteor mongo
~~~
`,`
For example, here's how you would display all movies in your database:
`,`
~~~js
db.movies.find()
~~~
`,`
And here's how you would remove them all:
`,`
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
  }
}
];

const Step8 = ({ loading, moviesCount }) => (
  <Components.Step step={8} text={text} after={after} moviesCount={moviesCount}>
    <div className="movies-count">Current movies count: {moviesCount}</div>
  </Components.Step>
);

registerComponent({ name: 'Step8', component: Step8, hocs: [withMoviesCount] });
