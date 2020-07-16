import React from 'react';
import StepWrapper from './StepWrapper.jsx';
import schema from '../../modules/schema.js';

export const title = 'API Schemas';

const text = [
  `We've just seen that we can conjure up "virtual fields" out of thin air and add them to our GraphQL schema to enable relations between collections. 

Let's go one step further and enable custom, tailor-made virtual fields by adding an **API Schema** to our \`Movies\` collection. This schema is similar to the one we already have, with one notable difference: its fields will *only* exist in our API, and not our database. 

For example, let's see how we can fetch the average IMDb score for our movies. First, we'll need an API key for the [OMDB DPI](http://www.omdbapi.com/apikey.aspx). Get your key and paste it in a \`settings.json\` file at the root of your project (find the \`omdb\` block at the end of the file). If you don't have this file yet, you can use the \`sample_settings.json\` file in this repo as a starting point. 

Next, find the \`/lib/server/apischema.js\` file and uncomment the following code block:
`,
`
~~~js
score: {
  typeName: 'Float',
  resolver: async ({ imdbId }) => {
    const response = await fetch(getUrl(imdbId), { method: 'GET' });
    const json = await response.json();
    return json.imdbRating;
  },
},
~~~
`,
`
We can now extend our collection with this new API schema. Find \`/lib/server/collection.js\` and uncomment the following code block:`,
`
~~~js
extendCollection(Movies, {
  apiSchema,
});
~~~
`,
`
Note that since our GraphQL schema will be generated on the server, we only need to add the \`apiSchema\` on the server. The client does not need to be aware of it, as long as it can access the resulting GraphQL field. 

One last thing! We've now added the \`score\` field to our API, but we still need to request it. Go back to \`lib/modules/fragments.js\` and uncomment the \`# score\` line.`
];

const after = `
Nicely done. Let's take a moment to review how this new \`score\` field works. You'll notice that it behaves a bit differently from previous "normal" schema fields we defined. 

First, instead of a JavaScript \`type\` it has a GraphQL \`typeName\`, in this case \`Float\`. 

Then comes the important part: the **resolver** that tells our API how to resolve the field, in this case by making a \`fetch\` \`GET\` request to the OMDb API, parsing the response as JSON, and finally returning the \`imdbRating\` field. 

API-only "virtual" fields are extremely useful. You can use them for relations, for loading external data, or sometimes just to output your own data differently. For an example of this, open up [GraphiQL](http://localhost:3000/graphiql) and check out the \`Movie\` type's \`createdAtFormatted\` field. For every date field in your schema (in this case \`createdAt\`), Vulcan will automatically generate a corresponding \`***Formatted\` field that lets you display that date as a formatted string. 
`;

const Step = () => <StepWrapper title={Step.title} text={text} after={after} />;

export const checks = [
  { file: '/lib/server/apischema.js', string: 'score' },
  { file: '/lib/server/collection.js', string: 'extendCollection'},
  { file: '/lib/modules/fragments.js', string: 'score' },
];

export default Step;
