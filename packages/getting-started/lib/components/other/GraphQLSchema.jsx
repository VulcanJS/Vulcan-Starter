import React from 'react';
import { registerComponent, Loading, Components } from 'meteor/vulcan:core';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { okaidia } from 'react-syntax-highlighter/styles/prism';

const GraphQLSchema = ({ data }) => (
  <div className="graphql-schema">
    {data && (data.loading ? 
      <Components.Loading /> : 
      <SyntaxHighlighter language="graphql" style={okaidia}>{data.SchemaContents}</SyntaxHighlighter>
    )}
  </div>
);

registerComponent({ name: 'GraphQLSchema', component: GraphQLSchema });
