import React from 'react';
import { registerComponent, Loading } from 'meteor/vulcan:core';
import checks from '../modules/checks';
import { Link } from 'react-router';

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
