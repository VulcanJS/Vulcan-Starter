import React from 'react';
import { registerComponent, Loading, Components } from 'meteor/vulcan:core';

const GraphQLSchema = ({ data }) => (
  <div className="graphql-schema">
    {data && (data.loading ? 
      <Components.Loading /> : 
      <pre>
        <code>{data.SchemaContents}</code>
      </pre>
    )}
  </div>
);

registerComponent('GraphQLSchema', GraphQLSchema);
