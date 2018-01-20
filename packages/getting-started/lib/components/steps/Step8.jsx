import React from 'react';
import { Components, registerComponent, Collections } from 'meteor/vulcan:core';

import withMoviesCount from '../../hocs/withMoviesCount.js';

const text = `
## Seeding Data

We're well on our way to sending data from the server to the client, but there's just one problem: we don't *have* any data. Let's fix this by inserting a few documents into our \`Movies\` collection. 

We actually already have a \`seedMovies\` function ready, we just need to call it. We can do so using the [Meteor shell](https://docs.meteor.com/commandline.html#meteorshell), a convenient way to access your live Meteor development server.

In your Vulcan application directory, type:

~~~
meteor shell
~~~

And then:

~~~
import { seedMovies } from 'meteor/example-getting-started'
~~~

And finally:

~~~
seedMovies()
~~~
`;

const after = `
Well done! Our secret informant on the server (a.k.a. the \`withMoviesCount\` HoC) has confirmed that there are now 8 movies in our database. 

By the way, a useful companion to the Meteor Shell is Meteor's [database access](https://docs.meteor.com/commandline.html#meteormongo):

~~~
meteor mongo
~~~

For example, here's how you would display all movies in your database:

~~~
db.movies.find()
~~~

And here's how you would remove them all:

~~~
db.movies.remove({})
~~~
`;

const Step8 = ({ data }) => (
  <Components.Step step={8} text={text} after={after} data={data}>
    <div className="movies-count">Current movies count: {data.MoviesCount}</div>
  </Components.Step>
);

registerComponent('Step8', Step8, withMoviesCount);
